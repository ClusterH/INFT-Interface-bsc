# useMetadata

获取 Token Metadata

```jsx
import React from 'react';
import useMetadata from '@/hooks/useMetadata';

export default () => {
  const metadata = useMetadata({
    id: 17,
    contract: '0x52b29289DF14c9Ee2c135378c8c9Cd4eDA867BA8',
  });

  console.log(metadata);

  return (
    <div>
      <p>tokenId: 17</p>
      <p>contract: 0x52b29289DF14c9Ee2c135378c8c9Cd4eDA867BA8</p>

      <pre>{JSON.stringify(metadata, null, 4)}</pre>
    </div>
  );
};
```

<API src="../../src/hooks/useMetadata.tsx"></API>