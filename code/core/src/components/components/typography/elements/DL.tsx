import type { CSSObject, Theme, StyledComponent } from 'storybook/theming';
import { styled } from 'storybook/theming';

import { withMargin, withReset } from '../lib/common.tsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export const DL: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLDListElement>, HTMLDListElement>, {}> = styled.dl(({ theme }) => ({
  ...(withReset({ theme }) as CSSObject),
  ...withMargin,
  padding: 0,
  '& dt': {
    fontSize: '14px',
    fontWeight: 'bold',
    fontStyle: 'italic',
    padding: 0,
    margin: '16px 0 4px',
  },
  '& dt:first-of-type': {
    padding: 0,
  },
  '& dt > :first-of-type': {
    marginTop: 0,
  },

  '& dt > :last-child': {
    marginBottom: 0,
  },

  '& dd': {
    margin: '0 0 16px',
    padding: '0 15px',
  },

  '& dd > :first-of-type': {
    marginTop: 0,
  },

  '& dd > :last-child': {
    marginBottom: 0,
  },
}));
