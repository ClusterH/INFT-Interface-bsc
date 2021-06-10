# SearchGlobal

```jsx
import React from 'react'
import SearchGlobal from '@/components/search-global'

const onSelect = (val) => {
    console.log('onSelect', val)
}

export default () => (<SearchGlobal onSelect={onSelect} />)
```