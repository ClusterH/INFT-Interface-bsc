import { useState } from 'react';
import Create from '@/components/page-create';

export default () => {
  const [form, setForm] = useState({
    quanty: 1,
    file: null,
    name: '',
    description: '',
    properties: [],
    royalties: 0.1,
  });

  const onCreate = () => {
    console.log('onCreate', form);
  };

  return <Create form={form} setForm={setForm} onCreate={onCreate} />;
};
