import { keyframes } from 'storybook/theming';

export const rotate360: {
  name: string;
  styles: string;
  anim: 1;
  toString: () => string;
} & string = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;
