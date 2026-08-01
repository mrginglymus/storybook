export const nameSpaceClassNames = ({ ...props }: {
    [x: string]: any;
  }, key: string): {
  [x: string]: any;
} => {
  const classes = [props.class, props.className];

  delete props.class;

  props.className = ['sbdocs', `sbdocs-${key}`, ...classes].filter(Boolean).join(' ');

  return props;
};
