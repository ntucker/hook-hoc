import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

type Diff<T, U> = T extends U ? never : T;

export default function withHooks<T extends object, P extends object>(use: (props: P) => T) {
  return <Props extends T & P>(Component: React.ComponentClass<Props>) => {
    const WrappedComponent = hoistStatics(React.forwardRef((props: Diff<Props, T>, ref) => {
      const hookProps = use(props);
      return <Component {...props} {...hookProps} ref={ref} />
    }), Component);
    WrappedComponent.displayName = `withHook(${use.name})(${Component.displayName || Component.name})`
    return WrappedComponent;
  }
}
