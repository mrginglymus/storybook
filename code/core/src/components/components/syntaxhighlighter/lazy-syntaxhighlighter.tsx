import React, { Suspense, lazy } from 'react';
import type { ComponentProps } from 'react';

import type ReactSyntaxHighlighter from './syntaxhighlighter.tsx';
import { SyntaxHighlighterProps, SyntaxHighlighterBaseProps, SyntaxHighlighterCustomProps } from './syntaxhighlighter-types.ts';

let languages: Parameters<typeof ReactSyntaxHighlighter.registerLanguage>[] = [];
let Comp: typeof ReactSyntaxHighlighter | null = null;

const LazySyntaxHighlighter: React.LazyExoticComponent<(props: ComponentProps<{
  ({ children, language, copyable, bordered, padded, format, formatter, className, showLineNumbers, ...rest }: SyntaxHighlighterProps): React.JSX.Element | null;
  registerLanguage(name: string, func: any): void;
}>) => React.JSX.Element> = lazy(async () => {
  const { SyntaxHighlighter } = await import('./syntaxhighlighter.tsx');

  if (languages.length > 0) {
    languages.forEach((args) => {
      SyntaxHighlighter.registerLanguage(...args);
    });
    languages = [];
  }

  if (Comp === null) {
    Comp = SyntaxHighlighter;
  }

  return {
    default: (props: SyntaxHighlighterBaseProps & SyntaxHighlighterCustomProps): React.JSX.Element => <SyntaxHighlighter {...props} />,
  };
});

const LazySyntaxHighlighterWithFormatter: React.LazyExoticComponent<(props: ComponentProps<{
  ({ children, language, copyable, bordered, padded, format, formatter, className, showLineNumbers, ...rest }: SyntaxHighlighterProps): React.JSX.Element | null;
  registerLanguage(name: string, func: any): void;
}>) => React.JSX.Element> = lazy(async () => {
  const [{ SyntaxHighlighter }, { formatter }] = await Promise.all([
    import('./syntaxhighlighter.tsx'),
    import('./formatter.ts'),
  ]);

  if (languages.length > 0) {
    languages.forEach((args) => {
      SyntaxHighlighter.registerLanguage(...args);
    });
    languages = [];
  }

  if (Comp === null) {
    Comp = SyntaxHighlighter;
  }

  return {
    default: (props: SyntaxHighlighterBaseProps & SyntaxHighlighterCustomProps): React.JSX.Element => (
      <SyntaxHighlighter {...props} formatter={formatter} />
    ),
  };
});

export const SyntaxHighlighter: {
  (props: ComponentProps<typeof LazySyntaxHighlighter> |
    ComponentProps<typeof LazySyntaxHighlighterWithFormatter>): React.JSX.Element; registerLanguage(name: string, func: any): void;
} = (
  props:
    | ComponentProps<typeof LazySyntaxHighlighter>
    | ComponentProps<typeof LazySyntaxHighlighterWithFormatter>
): React.JSX.Element => (
  <Suspense fallback={<div />}>
    {props.format !== false ? (
      <LazySyntaxHighlighterWithFormatter {...props} />
    ) : (
      <LazySyntaxHighlighter {...props} />
    )}
  </Suspense>
);

SyntaxHighlighter.registerLanguage = (
  ...args: Parameters<typeof ReactSyntaxHighlighter.registerLanguage>
): void => {
  if (Comp !== null) {
    Comp.registerLanguage(...args);
    return;
  }
  languages.push(args);
};
