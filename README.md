# Hook HOC

<!-- [![CircleCI](https://circleci.com/gh/ntucker/hook-hoc.svg?style=shield)](https://circleci.com/gh/ntucker/hook-hoc)
[![Coverage Status](https://img.shields.io/coveralls/ntucker/hook-hoc.svg?style=flat-square)](https://coveralls.io/github/ntucker/hook-hoc?branch=master)
-->
[![npm downloads](https://img.shields.io/npm/dm/hook-hoc.svg?style=flat-square)](https://www.npmjs.com/package/hook-hoc)
[![gzip size](https://img.badgesize.io/https://unpkg.com/hook-hoc?compression=gzip&style=flat-square)](https://unpkg.com/hook-hoc)
[![npm version](https://img.shields.io/npm/v/hook-hoc.svg?style=flat-square)](https://www.npmjs.com/package/hook-hoc)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Use React hooks with your class components by Higher Order Component.

> #### Warning:
>
> This is intended to help incrementally transition large existing class
> components to hooks. Please write new components using functions!


## Example

```tsx
import withHook from 'hook-hoc';
import { useResource } from 'rest-hooks';

import UserResource from 'resources/user';

const useProfile = ({ id }: { id: number }) => {
  const user = useResource(UserResource.singleRequest(), { id });
  const friends = useResource(UserResource.listRequest(), { id });
  return { user, friends };
}

class Profile extends React.PureComponent<{ id: number, user: UserResource, friends: UserResource[] }> {
  //...
}

export default withHook(useProfile)(Profile);
```
