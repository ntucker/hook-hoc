import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

type Diff<T, U> = T extends U ? never : T;

export default function withHooks<T extends object, P extends object>(use: (props: P) => T) {
  return <Props extends T & P>(Component: React.ComponentClass<Props>) => {
    const WrappedComponent = hoistStatics((props: Diff<Props, T>) => {
      const hookProps = use(props);
      return <Component {...props} {...hookProps} />
    }, Component);
    return WrappedComponent;
  }
}
