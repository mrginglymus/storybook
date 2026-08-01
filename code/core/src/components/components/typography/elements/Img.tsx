import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { styled, Theme, StyledComponent } from 'storybook/theming';

export const Img: StyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, {}> = styled.img({
  maxWidth: '100%',
});
