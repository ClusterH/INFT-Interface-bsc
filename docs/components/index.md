---
nav:
  title: 组件
---

# 介绍

组件文档基本使用示例

## 使用`dumi`内置组件
<Alert type="info">
  注意，内部暂时只能编写 HTML
</Alert>

`dumi`内置了三个组件：`Alert`、`Badge`、`embed`

## 直接编写代码块
```jsx
import React from 'react';

export default () => <h1>Hello dumi!</h1>;
```

## 使用`antd`等第三方组件
```jsx
import React from 'react';
import { Button } from 'antd';

export default () => <Button type="primary">antd 按钮</Button>
```

## 使用自定义组件
```jsx
import React from 'react'; // react一定要手动引入
import Button from '@/components/button/button.tsx' // 可以在 .umirc.ts配置alias

export default () => <Button>I 按钮</Button>
```
> 如果后期将`components`构建为一个`npm`包，希望通过引入`npm`包的形式使用组件的话，可以在 `.umirc.ts`配置`alias`，如：`inft: '@/components'`
> 然后就可以这样引用：`import Button from 'inft/button/button.tsx'`

