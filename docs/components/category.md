# Category

## Category.Market
```jsx
import React, { useState } from 'react';
import Category from '@/components/category';

export default () => {
  const [active, setActive] = useState(0)

  const onClick = (id) => {
    setActive(id)
  }

  return <Category.Market active={active} onClick={onClick} />;
};

```