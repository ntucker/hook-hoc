import React, { useEffect } from 'react';
import { render } from '@testing-library/react';

import withHooks from '../index';

const Component = () => <h1>Hi</h1>;

describe('withHooks()', () => {
  it('should return a function', () => {
    const withNothing = withHooks(() => ({}));
    expect(typeof withNothing).toBe('function');
  });

  it('should run hook onmount', () => {
    const tracker = jest.fn();
    const withOnMount = withHooks(() => {
      useEffect(() => {
        tracker();
      }, []);
      return {};
    });
    const Wrapped = withOnMount(Component);
    const { rerender } = render(<Wrapped />);
    expect(tracker).toBeCalledTimes(1);
    rerender(<Wrapped />);
    expect(tracker).toBeCalledTimes(1);
  });

  it('should receive injected props', () => {
    const withOnMount = withHooks(() => {
      return { injected: 5 };
    });
    const MyComponent = ({ injected }: { injected: number }) => (
      <div>{injected} is the</div>
    );
    const Wrapped = withOnMount(MyComponent);
    const { getByText } = render(<Wrapped />);
    expect(getByText('5 is the')).toBeDefined();
  });

  it('should work with provided props', () => {
    const withOnMount = withHooks(({ id }: { id: number }) => {
      return { injected: 5 + id };
    });
    const MyComponent = ({
      injected,
    }: {
      injected: number;
      id: number;
      extraprop?: string;
    }) => <div>{injected} is the</div>;
    const Wrapped = withOnMount(MyComponent);
    const { getByText } = render(<Wrapped id={2} />);
    expect(getByText('7 is the')).toBeDefined();
  });
});
