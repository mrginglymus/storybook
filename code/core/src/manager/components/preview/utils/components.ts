import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Link, LinkProps } from 'storybook/internal/router';

import { styled, Theme, StyledComponent } from 'storybook/theming';

export const PreviewContainer: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}> = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

export const FrameWrap: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, {}> = styled.main(({ theme }) => ({
  overflow: 'auto',
  width: '100%',
  zIndex: 3,
  background: theme.background.app,
  flex: 1,
}));
export const CanvasWrap: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
} & {
  show: boolean;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}> = styled.div<{ show: boolean }>(
  {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    overflow: 'auto',
    gridTemplateColumns: '100%',
    gridTemplateRows: '100%',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  ({ show }) => ({ display: show ? 'grid' : 'none' })
);

export const UnstyledLink: StyledComponent<LinkProps & {
  theme?: Theme;
}, {}, {}> = styled(Link)({
  color: 'inherit',
  textDecoration: 'inherit',
  display: 'inline-block',
});

export const DesktopOnly: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}> = styled.span({
  // Hides full screen icon at mobile breakpoint defined in app.js
  '@media (max-width: 599px)': {
    display: 'none',
  },
});

export const IframeWrapper: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}> = styled.div(({ theme }) => ({
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  overflow: 'auto',

  display: 'grid',
  gridTemplateColumns: '100%',
  gridTemplateRows: '100%',

  position: 'relative',
  width: '100%',
  height: '100%',
}));

export const LoaderWrapper: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}> = styled.div(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  background: theme.background.preview,
  zIndex: 1,
}));
