import { getFrameworkName, loadPreviewOrConfigFile } from 'storybook/internal/common';
import type { Options, PreviewAnnotation } from 'storybook/internal/types';

import { genArrayFromRaw, genImport, genSafeVariableName } from 'knitwork';
import { filename } from 'pathe/utils';
import { dedent } from 'ts-dedent';

import { processPreviewAnnotation } from './utils/process-preview-annotation';
import { SB_VIRTUAL_FILES, getResolvedVirtualModuleId } from './virtual-file-names';

export async function generateModernIframeScriptCode(options: Options, projectRoot: string) {
  const { presets, configDir } = options;
  const frameworkName = await getFrameworkName(options);

  const previewOrConfigFile = loadPreviewOrConfigFile({ configDir });
  const previewAnnotations = await presets.apply<PreviewAnnotation[]>(
    'previewAnnotations',
    [],
    options
  );
  return generateModernIframeScriptCodeFromPreviews({
    previewAnnotations: [
      ...previewAnnotations.map((p) => (typeof p === 'string' ? p : p.absolute)),
      previewOrConfigFile,
    ],
    projectRoot,
    frameworkName,
  });
}

export async function generateModernIframeScriptCodeFromPreviews(options: {
  previewAnnotations: (string | undefined)[];
  projectRoot: string;
  frameworkName: string;
}) {
  const { projectRoot, frameworkName } = options;
  const previewAnnotationURLs = options.previewAnnotations
    .filter((path) => path !== undefined)
    .map((path) => processPreviewAnnotation(path as string, projectRoot));

  const variables: string[] = [];
  const imports: string[] = [];
  for (const previewAnnotation of previewAnnotationURLs) {
    const variable =
      genSafeVariableName(filename(previewAnnotation)).replace(/_(45|46|47)/g, '_') +
      '_' +
      hash(previewAnnotation);
    variables.push(variable);
    imports.push(genImport(previewAnnotation, { name: '*', as: variable }));
  }

  // This is pulled out to a variable because it is reused in both the initial page load
  // and the HMR handler.
  // The `hmrPreviewAnnotationModules` parameter is used to pass the updated modules from HMR.
  // However, only the changed modules are provided, the rest are null.
  const getPreviewAnnotationsFunction = dedent`
  const getProjectAnnotations = (hmrPreviewAnnotationModules = []) => {
    const configs = ${genArrayFromRaw(
      variables.map(
        (previewAnnotation, index) =>
          // Prefer the updated module from an HMR update, otherwise the original module
          `hmrPreviewAnnotationModules[${index}] ?? ${previewAnnotation}`
      ),
      '  '
    )}
    return composeConfigs(configs);
  }`;

  const generateHMRHandler = (): string => {
    // Web components are not compatible with HMR, so disable HMR, reload page instead.
    if (frameworkName === '@storybook/web-components-vite') {
      return `
      if (import.meta.hot) {
        import.meta.hot.decline();
      }`.trim();
    }

    return dedent`
    if (import.meta.hot) {
      import.meta.hot.accept('${getResolvedVirtualModuleId(SB_VIRTUAL_FILES.VIRTUAL_STORIES_FILE)}', (newModule) => {
        // importFn has changed so we need to patch the new one in
        window.__STORYBOOK_PREVIEW__.onStoriesChanged({ importFn: newModule.importFn });
      });

      import.meta.hot.accept(${JSON.stringify(previewAnnotationURLs)}, (previewAnnotationModules) => {
        // getProjectAnnotations has changed so we need to patch the new one in
        window.__STORYBOOK_PREVIEW__.onGetProjectAnnotationsChanged({ getProjectAnnotations: () => getProjectAnnotations(previewAnnotationModules) });
      });
    }`.trim();
  };

  /**
   * This code is largely taken from
   * https://github.com/storybookjs/storybook/blob/d1195cbd0c61687f1720fefdb772e2f490a46584/builders/builder-webpack4/src/preview/virtualModuleModernEntry.js.handlebars
   * Some small tweaks were made to `getProjectAnnotations` (since `import()` needs to be resolved
   * asynchronously) and the HMR implementation has been tweaked to work with Vite.
   *
   * @todo Inline variable and remove `noinspection`
   */
  const code = dedent`
  import { setup } from '@storybook/core/preview/runtime';
  import '${SB_VIRTUAL_FILES.VIRTUAL_ADDON_SETUP_FILE}';

  setup();
 
  import { composeConfigs, PreviewWeb, ClientApi } from 'storybook/internal/preview-api';
  import { importFn } from '${SB_VIRTUAL_FILES.VIRTUAL_STORIES_FILE}';
  
  ${imports.join('\n')}
  ${getPreviewAnnotationsFunction}

  window.__STORYBOOK_PREVIEW__ = window.__STORYBOOK_PREVIEW__ || new PreviewWeb(importFn, getProjectAnnotations);
  
  window.__STORYBOOK_STORY_STORE__ = window.__STORYBOOK_STORY_STORE__ || window.__STORYBOOK_PREVIEW__.storyStore;
  
  ${generateHMRHandler()};
  `.trim();
  return code;
}
function hash(value: string) {
  return value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}
