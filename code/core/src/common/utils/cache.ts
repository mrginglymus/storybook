import { createFileSystemCache, FileSystemCache } from './file-cache.ts';
import { resolvePathInStorybookCache } from './resolve-path-in-sb-cache.ts';

export const cache: FileSystemCache = createFileSystemCache({
  basePath: resolvePathInStorybookCache('dev-server'),
  ns: 'storybook', // Optional. A grouping namespace for items.
});
