import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

export default function withHooks<
  T extends Record<string, any>,
  P extends Record<string, any>
>(use: (props: P) => T) {
  return <Props extends T & P>(
    Component: React.JSXElementConstructor<Props> & React.ComponentType<Props>,
  ) => {
    const WrappedComponent = hoistStatics(
      // eslint-disable-next-line react/display-name
      React.forwardRef((props: Omit<Props, keyof T>, ref) => {
        const hookProps = use(props as any);
        return <Component {...(props as any)} {...hookProps} ref={ref} />;
      }),
      Component,
    );
    WrappedComponent.displayName = `withHook(${
      use.name
    })(${Component.displayName || Component.name})`;
    return WrappedComponent;
  };
}
