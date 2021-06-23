import { useHistory, useIntl } from 'umi';
import { useState } from 'react';
import { Form, notification } from 'antd';
import Create from '@/components/page-create';
import { createNft } from '@/servers';
import { inftCreateNftContract } from '@/contracts';
import { useWallet } from '@binance-chain/bsc-use-wallet';

export default () => {
  const intl = useIntl();
  const history: any = useHistory();
  const wallet = useWallet();
  const [form, setForm] = useState<any>({
    quanty: 1,
    file: null,
    name: '',
    description: '',
    properties: [],
    royalties: 0.1,
    submiting: false,
  });
  const [formRef] = Form.useForm();
  const [uri, setUri] = useState(''); // 提交表单获取的uri

  const removeImage = (e: any) => {
    e.stopPropagation();

    setForm({
      ...form,
      file: null,
    });
  };

  const onCreate = async () => {
    if (wallet.status !== 'connected') {
      notification.info({
        message: intl.formatMessage({
          id: 'notify_connectWallet',
          defaultMessage: 'Connect wallet',
        }),
      });
      return;
    }
    setForm({
      ...form,
      submiting: true,
    });

    const { name, description, file } = form;

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('quantily', '0');
    formData.append('name', name);
    formData.append('description', description);
    formData.append(
      'attributes',
      JSON.stringify(formRef.getFieldValue('properties')),
    );
    formData.append('roylaties', '10');
    formData.append('network', 'bsc');

    for (const key of formData.keys()) {
      console.log(key, formData.get(key));
    }
    try {
      const ret = await createNft(formData);
      const { code, message = {} } = ret as any;
      const uri = message.uri || '';
      if (code === 0) {
        setUri(uri);
      }
      // 调用合约铸造
      const gas = await inftCreateNftContract.methods
        .mintToken(wallet.account, uri)
        .estimateGas();

      await inftCreateNftContract.methods
        .mintToken(wallet.account, uri)
        .send({ from: wallet.account, gas });

      history.push({
        pathname: '/create-preview',
        query: {
          imgUrl: URL.createObjectURL(form.file),
        },
      });

      notification.success({
        message: intl.formatMessage({
          id: 'notify_createSuccess',
          defaultMessage: 'Create success',
        }),
      });
    } catch (error) {
      notification.error({
        message: error.message,
      });
    }
    setForm({
      ...form,
      submiting: false,
    });
  };

  return (
    <Create
      form={form}
      setForm={setForm}
      formRef={formRef}
      removeImage={removeImage}
      onCreate={onCreate}
    />
  );
};
