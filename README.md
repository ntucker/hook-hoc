# with-hook

Use React hooks with your class components

> #### Warning:
>
> This is intended to help incrementally transition large existing class
> components to hooks. Please write new components using functions!


## Example

```tsx
import withHook from 'with-hook';
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
