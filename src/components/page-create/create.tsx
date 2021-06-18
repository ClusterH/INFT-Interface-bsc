import { useState } from 'react';
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
  const { form, formRef, setForm, customRequest, removeImage, onCreate } =
    props;
  const { file } = form;

  return (
    <div className={styles.create}>
      <BannerCreateNFT />

      <div className={styles.content}>
        <div className={styles.wrapForm}>
          <div className={styles.formItem}>
            <div className={styles.label}>Quantily</div>
            <div className={styles.box}>
              <Radio defaultChecked disabled>
                Single
              </Radio>
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.label}>Upload file</div>
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
                        Document only support JPG, PNG, GIF, and maximum for 4MB
                      </span>
                    </>
                  ) : (
                    <>
                      <img src={iconSuccess} alt="success" />
                      <span className={styles.textSuccess}>
                        Upload successfully!
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
          <div className={styles.formItem}>
            <div className={styles.label}>Name</div>
            <div className={styles.box}>
              <Input
                value={form.name}
                placeholder="Item name"
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
            <div className={styles.label}>Description</div>
            <div className={styles.box}>
              <TextArea
                value={form.description}
                rows={4}
                placeholder="Detailed description of your item."
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
            <div className={styles.label}>Properties</div>
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
                            <Input placeholder="Input property name" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'value']}
                            fieldKey={[fieldKey, 'value']}
                          >
                            <Input placeholder="Input property value" />
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
                          Add field
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form>
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.label}>Royalties</div>
            <div className={styles.box}>
              <Input value="10%" disabled />
            </div>
          </div>

          <Button type="primary" block size="large" onClick={onCreate}>
            Create NFT
          </Button>
        </div>
        <div className={styles.wrapPreview}>
          <div className={styles.label}>Preview</div>
          <div className={styles.wrapImage}>
            <div className={styles.imageBox}>
              <img
                src={file ? URL.createObjectURL(file) : previewPlacehold}
                alt="previews"
                className={styles.preImage}
              />
            </div>
            <div className={styles.previewText}>Preview of your NFT</div>
          </div>
        </div>
      </div>
    </div>
  );
};
