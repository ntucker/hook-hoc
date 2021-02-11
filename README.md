# Hook HOC

[![CircleCI](https://circleci.com/gh/ntucker/hook-hoc.svg?style=shield)](https://circleci.com/gh/ntucker/hook-hoc)
[![Coverage Status](https://img.shields.io/coveralls/ntucker/hook-hoc.svg?style=flat-square)](https://coveralls.io/github/ntucker/hook-hoc?branch=master)
[![npm downloads](https://img.shields.io/npm/dm/hook-hoc.svg?style=flat-square)](https://www.npmjs.com/package/hook-hoc)
[![gzip size](https://img.badgesize.io/https://unpkg.com/hook-hoc?compression=gzip&style=flat-square)](https://unpkg.com/hook-hoc)
[![npm version](https://img.shields.io/npm/v/hook-hoc.svg?style=flat-square)](https://www.npmjs.com/package/hook-hoc)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Use React hooks with your class components by Higher Order Component.

> #### Warning:
>
> This is intended to help incrementally transition large existing class
> components to hooks. Please write new components using functions!

## Data fetching Example

Let's fetch some data using [Rest Hooks](https://resthooks.io). We use the provided id
prop to know what to fetch, then inject `user` and `friends` by returning an object
with those props.

```tsx
import withHook from 'hook-hoc';
import { useResource } from 'rest-hooks';

import UserResource from 'resources/user';

const useProfile = ({ id }: { id: number }) => {
  const user = useResource(UserResource.detail(), { id });
  const friends = useResource(UserResource.list(), { id });
  return { user, friends };
};

class Profile extends React.PureComponent<{
  id: number;
  user: UserResource;
  friends: UserResource[];
}> {
  //...
}

export default withHook(useProfile)(Profile);
```

## Forms Example

Here's an example of using a theoretical forms handling library

```tsx
import React from 'react';
import withHook from 'hook-hoc';
import { useFields, FormValues } from '@cb/forms';

import SignupForm from './SignupForm';

// export this for testing if needed
export function useSignupFields() {
  const fields = useFields(SignupForm);
  const [submit] = useSubmitter(SignupForm);
  return { ...fields, submit };
}

type Props = FormValues<SignupForm> & {
  submit: (options?: object) => Promise<any>;
};

class SignupFields extends React.PureComponent<Props> {
  render() {
    const { submit, username, password } = this.props;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
      >
        <InputField {...username} />
        <InputField {...password} type="password" />
        <button type="submit">SignUp</button>
      </form>
    );
  }
}
export default withHook(useSignupFields)(SignupFields);
```
