import { join } from 'pathe';

import { resolvePackageDir } from '../../shared/utils/module.ts';

export const DEBOUNCE = 100;

export const defaultStaticDirs: {
  from: string;
  to: string;
}[] = [
  {
    from: join(resolvePackageDir('storybook'), 'assets/browser'),
    to: '/sb-common-assets',
  },
];

export const defaultFavicon: string = join(resolvePackageDir('storybook'), 'assets/browser/favicon.svg');
