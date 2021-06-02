# SendAddress

```jsx
import React, {useState} from 'react'; 
import {Button} from 'antd'
import SendAddress from '@/components/send-address'

const onChange = address => {
    setAddress(address)
}

const onOk = () => {
    console.log(address)
    setVisible(false)
}
const onCancel = () => {
    setVisible(false)
}


export default () =>  {
    const [visible, setVisible] = useState(false)
    const [address, setAddress] = useState('')

    const onChange = address => {
        setAddress(address)
    }   

    const onOk = () => {
        console.log(address)
        setVisible(false)
    }
    const onCancel = () => {
        setVisible(false)
    }

    return (
      <>
      <Button type="primary" onClick={() => setVisible(true)}>SendAddress</Button>
      <SendAddress
        visible={visible}
        address="0x8a0C542bA7bBBab7cF3551fFcc546CdC5362d2a1"
        onChange={onChange}
        onOk={onOk}
        onCancel={onCancel}
      ></SendAddress>
      </>
    )
}
```