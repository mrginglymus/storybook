import { styled, Theme, StyledComponent } from 'storybook/theming';

import { withReset } from '../lib/common.tsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export const Div: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}> = styled.div(withReset);
