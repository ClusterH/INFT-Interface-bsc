import { useState } from 'react';
import { useIntl } from 'umi';
import { Button, Radio, Upload, Input, Form, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import previewPlacehold from '@/assets/images/preview.png';
import iconUpload from '@/assets/images/icon-upload.png';
import iconSuccess from '@/assets/images/icon-success.png';
import iconClose from '@/assets/images/icon-close.png';
import BannerCreateNFT from '@/components/banner-create-nft';
import styles from './styles.less';
const { TextArea } = Input;

export default (props: any) => {
  const intl = useIntl();
  const { form, formRef, setForm, customRequest, removeImage, onCreate } =
    props;
  const { file } = form;

  const Preview = () => (
    <>
      <div className={styles.label}>
        {intl.formatMessage({
          id: 'create_preview',
          defaultMessage: 'Preview',
        })}
      </div>
      <div className={styles.wrapImage}>
        <div className={styles.imageBox}>
          <img
            src={file ? URL.createObjectURL(file) : previewPlacehold}
            alt="previews"
            className={styles.preImage}
          />
        </div>
        <div className={styles.previewText}>
          {intl.formatMessage({
            id: 'create_previewText',
            defaultMessage: 'Preview of your NFT',
          })}
        </div>
      </div>
    </>
  );

  return (
    <div className={styles.create}>
      <BannerCreateNFT />

      <div className={styles.content}>
        <div className={styles.wrapForm}>
          <div className={styles.formItem}>
            <div className={styles.label}>
              {intl.formatMessage({
                id: 'create_quantily',
                defaultMessage: 'Quantily',
              })}
            </div>
            <div className={styles.box}>
              <Radio defaultChecked disabled>
                {intl.formatMessage({
                  id: 'create_single',
                  defaultMessage: 'Single',
                })}
              </Radio>
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.label}>
              {intl.formatMessage({
                id: 'create_upload',
                defaultMessage: 'Upload file',
              })}
            </div>
            <div className={[styles.box, styles.uploadBox].join(' ')}>
              <Upload
                name="avatar"
                listType="picture-card"
                className={styles.uploader}
                showUploadList={false}
                customRequest={customRequest}
              >
                <div className={styles.wrapTip}>
                  {!file ? (
                    <>
                      <img src={iconUpload} alt="upload" />
                      <span>
                        {intl.formatMessage({
                          id: 'create_uploadText',
                          defaultMessage:
                            'Document only support JPG, PNG, GIF, and maximum for 4MB',
                        })}
                      </span>
                    </>
                  ) : (
                    <>
                      <img src={iconSuccess} alt="success" />
                      <span className={styles.textSuccess}>
                        {intl.formatMessage({
                          id: 'create_success',
                          defaultMessage: 'Upload successfully!',
                        })}
                      </span>
                    </>
                  )}
                </div>

                {!!file && (
                  <img
                    className={styles.iconClose}
                    src={iconClose}
                    alt="close"
                    onClick={removeImage}
                  />
                )}
              </Upload>
            </div>
          </div>

          <div className={[styles.formItem, styles.formItemPreview].join(' ')}>
            <Preview />
          </div>
          <div className={styles.formItem}>
            <div className={styles.label}>
              {intl.formatMessage({
                id: 'create_formName',
                defaultMessage: 'Name',
              })}
            </div>
            <div className={styles.box}>
              <Input
                value={form.name}
                placeholder={intl.formatMessage({
                  id: 'create_formNamePlaceholder',
                  defaultMessage: 'Item name',
                })}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.label}>
              {intl.formatMessage({
                id: 'create_formDescription',
                defaultMessage: 'Description',
              })}
            </div>
            <div className={styles.box}>
              <TextArea
                value={form.description}
                rows={4}
                placeholder={intl.formatMessage({
                  id: 'create_formDescriptionPlaceholder',
                  defaultMessage: 'Detailed description of your item.',
                })}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.label}>
              {intl.formatMessage({
                id: 'create_formProperties',
                defaultMessage: 'Properties',
              })}
            </div>
            <div className={styles.box}>
              <Form form={formRef} autoComplete="off">
                <Form.List name="properties">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: 'flex', marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, 'attr']}
                            fieldKey={[fieldKey, 'attr']}
                          >
                            <Input
                              placeholder={intl.formatMessage({
                                id: 'create_formPropertieName',
                                defaultMessage: 'Input property name',
                              })}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'value']}
                            fieldKey={[fieldKey, 'value']}
                          >
                            <Input
                              placeholder={intl.formatMessage({
                                id: 'create_formPropertieValue',
                                defaultMessage: 'Input property value',
                              })}
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          {intl.formatMessage({
                            id: 'create_formAddField',
                            defaultMessage: 'Add field',
                          })}
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form>
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.label}>
              {intl.formatMessage({
                id: 'create_formRoyalties',
                defaultMessage: 'Royalties',
              })}
            </div>
            <div className={styles.box}>
              <Input value="10%" disabled />
            </div>
          </div>

          <Button type="primary" block size="large" onClick={onCreate}>
            {intl.formatMessage({
              id: 'create_formCreate',
              defaultMessage: 'Create NFT',
            })}
          </Button>
        </div>
        <div className={styles.wrapPreview}>
          <Preview />
        </div>
      </div>
    </div>
  );
};
