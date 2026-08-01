import { styled, Theme, StyledComponent } from 'storybook/theming';

import { codeCommon } from '../lib/common.tsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export const TT: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>, {}> = styled.title(codeCommon);
