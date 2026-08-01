import type { CSSObject, Theme, StyledComponent } from 'storybook/theming';
import { styled } from 'storybook/theming';

import { headerCommon, withReset } from '../lib/common.tsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export const H2: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}> = styled.h2(({ theme }) => ({
  ...(withReset({ theme }) as CSSObject),
  ...(headerCommon({ theme }) as CSSObject),
  fontSize: `${theme.typography.size.m2}px`,
  paddingBottom: 4,
  borderBottom: `1px solid ${theme.appBorderColor}`,
}));
