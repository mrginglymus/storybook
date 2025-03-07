import { logger } from 'storybook/internal/node-logger';
import type { Options } from 'storybook/internal/types';

import { dedent } from 'ts-dedent';
import type { InlineConfig } from 'vite';

import { sanitizeEnvVars } from './envs';
import type { WebpackStatsPlugin } from './plugins';
import { hasVitePlugins } from './utils/has-vite-plugins';
import { withoutVitePlugins } from './utils/without-vite-plugins';
import { commonConfig } from './vite-config';

function findPlugin(config: InlineConfig, name: string) {
  return config.plugins?.find((p) => p && 'name' in p && p.name === name);
}

export async function build(options: Options) {
  const { build: viteBuild, mergeConfig } = await import('vite');
  const { presets } = options;

  const config = await commonConfig(options, 'build');
  config.build = mergeConfig(config, {
    build: {
      outDir: options.outputDir,
      emptyOutDir: false, // do not clean before running Vite build - Storybook has already added assets in there!
      rollupOptions: {
        external: [/\.\/sb-common-assets\/.*\.woff2/],
      },
      ...(options.test
        ? {
            reportCompressedSize: false,
            sourcemap: !options.build?.test?.disableSourcemaps,
            target: 'esnext',
            treeshake: !options.build?.test?.disableTreeShaking,
          }
        : {}),
    },
  } as InlineConfig).build;

  const finalConfig = (await presets.apply('viteFinal', config, options)) as InlineConfig;

  if (options.features?.developmentModeForBuild) {
    finalConfig.plugins?.push({
      name: 'storybook:define-env',
      config: () => {
        return {
          define: {
            'process.env.NODE_ENV': JSON.stringify('development'),
          },
        };
      },
    });
  }

  const turbosnapPluginName = 'rollup-plugin-turbosnap';
  const hasTurbosnapPlugin =
    finalConfig.plugins && (await hasVitePlugins(finalConfig.plugins, [turbosnapPluginName]));
  if (hasTurbosnapPlugin) {
    logger.warn(dedent`Found '${turbosnapPluginName}' which is now included by default in Storybook 8.
      Removing from your plugins list. Ensure you pass \`--stats-json\` to generate stats.

      For more information, see https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#turbosnap-vite-plugin-is-no-longer-needed`);

    finalConfig.plugins = await withoutVitePlugins(finalConfig.plugins, [turbosnapPluginName]);
  }

  await viteBuild(await sanitizeEnvVars(options, finalConfig));

  const statsPlugin = findPlugin(
    finalConfig,
    'storybook:rollup-plugin-webpack-stats'
  ) as WebpackStatsPlugin;
  return statsPlugin?.storybookGetStats();
}
