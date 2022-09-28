import * as React from 'react';
import warning from '../_util/warning';
import type { BlockProps } from './Base';
import Base from './Base';

export interface LinkProps
  extends BlockProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> {
  ellipsis?: boolean;
}

const Link = React.forwardRef<HTMLElement, LinkProps>(function Link(
  {
    ellipsis,
    rel,
    // @ts-expect-error: https://github.com/ant-design/ant-design/issues/26622
    navigate: _,
    ...restProps
  },
  ref,
) {
  warning(
    typeof ellipsis !== 'object',
    'Typography.Link',
    '`ellipsis` only supports boolean value.',
  );

  const baseRef = React.useRef<any>(null);

  React.useImperativeHandle(ref, () => baseRef.current);

  const mergedProps = {
    ...restProps,
    rel: rel === undefined && restProps.target === '_blank' ? 'noopener noreferrer' : rel,
  };

  return <Base {...mergedProps} ref={baseRef} ellipsis={!!ellipsis} component="a" />;
});

export default Link;
