import { useState } from 'react';
import { Form } from 'antd';
import Create from '@/components/page-create';

export default () => {
  const [form, setForm] = useState<any>({
    quanty: 1,
    file: null,
    name: '',
    description: '',
    properties: [],
    royalties: 0.1,
  });
  const [formRef] = Form.useForm();

  const customRequest = (e: any) => {
    console.log('customRequest', e);
    const { file } = e;

    setForm({
      ...form,
      file,
    });

    const formData = new FormData();
    formData.append('file', file, file.name);
  };

  const removeImage = (e: any) => {
    e.stopPropagation();

    setForm({
      ...form,
      file: null,
    });
  };

  const onCreate = () => {
    console.log('onCreate ========');
    console.log('form: ', form);
    console.log('properties: ', formRef.getFieldValue('properties'));
  };

  return (
    <Create
      form={form}
      setForm={setForm}
      formRef={formRef}
      customRequest={customRequest}
      removeImage={removeImage}
      onCreate={onCreate}
    />
  );
};
