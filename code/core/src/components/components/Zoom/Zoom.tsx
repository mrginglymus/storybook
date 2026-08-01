import { ZoomElement } from './ZoomElement.tsx';
import { ZoomIFrame } from './ZoomIFrame.tsx';

export const Zoom: {
  Element: typeof ZoomElement;
  IFrame: typeof ZoomIFrame;
} = {
  Element: ZoomElement,
  IFrame: ZoomIFrame,
};
