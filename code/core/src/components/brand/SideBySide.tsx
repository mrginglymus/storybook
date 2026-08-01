import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { styled, Theme, StyledComponent } from 'storybook/theming';

export const SideBySide: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}> = styled.div({
  display: 'grid',
  gridColumnGap: 30,
  gridTemplateColumns: '1fr 1fr',

  position: 'absolute',
  width: '100vw',
  height: '100vh',
  overflow: 'auto',
  top: 0,
  left: 0,

  '& > *': {
    padding: 20,
  },
});
