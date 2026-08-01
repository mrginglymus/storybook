import type { CSSObject, Theme, StyledComponent } from 'storybook/theming';
import { styled } from 'storybook/theming';

import { withMargin, withReset } from '../lib/common.tsx';
import { DetailedHTMLProps, OlHTMLAttributes } from 'react';

const listCommon = {
  paddingLeft: 30,
  '& :first-of-type': {
    marginTop: 0,
  },
  '& :last-child': {
    marginBottom: 0,
  },
};

export const OL: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>, {}> = styled.ol(({ theme }) => ({
  ...(withReset({ theme }) as CSSObject),
  ...withMargin,
  ...listCommon,
  listStyle: 'decimal',
}));
