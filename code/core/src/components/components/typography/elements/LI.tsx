import type { CSSObject, Theme, StyledComponent } from 'storybook/theming';
import { styled } from 'storybook/theming';

import { codeCommon, withReset } from '../lib/common.tsx';
import { DetailedHTMLProps, LiHTMLAttributes } from 'react';

export const LI: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, {}> = styled.li(({ theme }) => ({
  ...(withReset({ theme }) as CSSObject),
  fontSize: theme.typography.size.s2,
  color: theme.color.defaultText,
  lineHeight: '24px',
  '& + li': {
    marginTop: '.25em',
  },
  '& ul, & ol': {
    marginTop: '.25em',
    marginBottom: 0,
  },
  '& code': codeCommon({ theme }) as CSSObject,
}));
