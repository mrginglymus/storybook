import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { styled, Theme, StyledComponent } from 'storybook/theming';

export const HR: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>, {}> = styled.hr(({ theme }) => ({
  border: '0 none',
  borderTop: `1px solid ${theme.appBorderColor}`,
  height: 4,
  padding: 0,
}));
