import { DecoratorFunction, definePreviewAddon, PreviewAddon } from 'storybook/internal/csf';

import { PARAM_KEY } from './constants.ts';
import type { MeasureTypes } from './types.ts';
import { withMeasure } from './withMeasure.ts';

export const decorators: DecoratorFunction[] = globalThis.FEATURES?.measure ? [withMeasure] : [];

export const initialGlobals: {
  measureEnabled: boolean;
} = {
  [PARAM_KEY]: false,
};

export type { MeasureTypes };

export default (): PreviewAddon<MeasureTypes> =>
  definePreviewAddon<MeasureTypes>({
    decorators,
    initialGlobals,
  });
