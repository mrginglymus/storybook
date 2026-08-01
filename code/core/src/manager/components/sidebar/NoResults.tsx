import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { styled, Theme, StyledComponent } from 'storybook/theming';

export const NoResults: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}> = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  textWrap: 'balance',
  gap: 4,
  padding: '20px 0',
  lineHeight: `18px`,
  fontSize: `${theme.typography.size.s2}px`,
  color: theme.color.defaultText,
  small: {
    color: theme.textMutedColor,
    fontSize: `${theme.typography.size.s1}px`,
  },
  button: {
    marginTop: 8,
    alignSelf: 'center',
  },
}));
