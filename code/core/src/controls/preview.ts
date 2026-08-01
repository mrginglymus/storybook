import type { PreviewAddon } from 'storybook/internal/csf';
import { definePreviewAddon } from 'storybook/internal/csf';

import type { ControlsTypes } from './types.ts';

export type { ControlsTypes };

const controlsPreview: PreviewAddon<ControlsTypes> = definePreviewAddon<ControlsTypes>({
  // Controls addon doesn't need any preview-side configuration
  // It operates entirely through the manager UI
});

export default controlsPreview;
