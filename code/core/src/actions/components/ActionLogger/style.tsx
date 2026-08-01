import { opacify } from 'polished';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { styled, Theme, StyledComponent } from 'storybook/theming';

export const Action: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}> = styled.div({
  display: 'flex',
  padding: 0,
  borderLeft: '5px solid transparent',
  borderBottom: '1px solid transparent',
  transition: 'all 0.1s',
  alignItems: 'flex-start',
  whiteSpace: 'pre',
});

export const Counter: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}> = styled.div(({ theme }) => ({
  backgroundColor: opacify(0.5, theme.appBorderColor),
  color: theme.color.inverseText,
  fontSize: theme.typography.size.s1,
  fontWeight: theme.typography.weight.bold,
  lineHeight: 1,
  padding: '1px 5px',
  borderRadius: 20,
  margin: '2px 0px',
}));

export const InspectorContainer: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}> = styled.div({
  flex: 1,
  padding: '0 0 0 5px',
});
