# SelectSortType

```jsx
import React from 'react';
import SelectSortType from '@/components/select-sort-type/select-sort-type';

const onChange = (e) => {
  console.log('onChange', e);
};

export default () => <SelectSortType onChange={onChange} />;
```