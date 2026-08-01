import type { CSSObject, Theme, StyledComponent } from 'storybook/theming';
import { styled } from 'storybook/theming';

import { withMargin, withReset } from '../lib/common.tsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export const Pre: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>, {}> = styled.pre(({ theme }) => ({
  ...(withReset({ theme }) as CSSObject),
  ...withMargin,
  // reset
  fontFamily: theme.typography.fonts.mono,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  lineHeight: '18px',
  padding: '11px 1rem',
  whiteSpace: 'pre-wrap',
  color: 'inherit',
  borderRadius: 3,
  margin: '1rem 0',

  '&:not(.prismjs)': {
    background: 'transparent',
    border: 'none',
    borderRadius: 0,
    padding: 0,
    margin: 0,
  },
  '& pre, &.prismjs': {
    padding: 15,
    margin: 0,
    whiteSpace: 'pre-wrap',
    color: 'inherit',
    fontSize: '13px',
    lineHeight: '19px',
    code: {
      color: 'inherit',
      fontSize: 'inherit',
    },
  },
  '& code': {
    whiteSpace: 'pre',
  },
  '& code, & tt': {
    border: 'none',
  },
}));
