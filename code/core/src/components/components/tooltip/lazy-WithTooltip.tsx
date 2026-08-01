import type { ComponentProps } from 'react';
import React, { Suspense, lazy } from 'react';
import { WithTooltipStateProps, WithTooltipPureProps } from './WithTooltip.tsx';

const LazyWithTooltip: React.LazyExoticComponent<({ startOpen, onVisibleChange: onChange, ...rest }: WithTooltipStateProps) => React.JSX.Element> = lazy(() =>
  import('./WithTooltip.tsx').then((mod) => ({ default: mod.WithTooltip }))
);

export const WithTooltip = (props: ComponentProps<typeof LazyWithTooltip>): React.JSX.Element => (
  <Suspense fallback={<div />}>
    <LazyWithTooltip {...props} />
  </Suspense>
);

const LazyWithTooltipPure: React.LazyExoticComponent<React.FC<WithTooltipPureProps>> = lazy(() =>
  import('./WithTooltip.tsx').then((mod) => ({ default: mod.WithTooltipPure }))
);

export const WithTooltipPure = (props: ComponentProps<typeof LazyWithTooltipPure>): React.JSX.Element => (
  <Suspense fallback={<div />}>
    <LazyWithTooltipPure {...props} />
  </Suspense>
);
