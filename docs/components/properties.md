# Properties

```jsx
import React from 'react';
import Properties from '@/components/properties';

const attrs = [
    {
        trait_type: "rarity",
        value: "Rank1"
    },
    {
        trait_type: "rarity",
        value: "Rank2"
    },
    {
        trait_type: "rarity",
        value: "Rank3"
    },
    {
        trait_type: "rarity",
        value: "Rank4"
    }
]

export default () => <Properties attrs={attrs} />;
```