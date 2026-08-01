import type { CSSObject, Theme, StyledComponent } from 'storybook/theming';
import { styled } from 'storybook/theming';

import { codeCommon, withMargin, withReset } from '../lib/common.tsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export const P: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, {}> = styled.p(({ theme }) => ({
  ...(withReset({ theme }) as CSSObject),
  ...withMargin,
  fontSize: theme.typography.size.s2,
  lineHeight: '24px',
  color: theme.color.defaultText,
  '& code': codeCommon({ theme }) as CSSObject,
}));
