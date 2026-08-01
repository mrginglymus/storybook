import { DecoratorFunction, definePreviewAddon, PreviewAddon } from 'storybook/internal/csf';

import { PARAM_KEY } from './constants.ts';
import type { OutlineTypes } from './types.ts';
import { withOutline } from './withOutline.ts';

export const decorators: DecoratorFunction[] = globalThis.FEATURES?.outline ? [withOutline] : [];

export const initialGlobals: {
  outline: boolean;
} = {
  [PARAM_KEY]: false,
};

export type { OutlineTypes };

export default (): PreviewAddon<OutlineTypes> => definePreviewAddon<OutlineTypes>({ decorators, initialGlobals });
