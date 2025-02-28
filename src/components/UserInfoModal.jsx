import { Modal, Form, Input, Button } from 'antd';
import { useEffect } from 'react';

const UserInfoModal = ({ visible, onCancel, user, handleSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const onFinish = (values) => {
    handleSave({ ...user, ...values }); // luu thong tin
  };

  return (
    <Modal
      title="Edit User"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item label="User Name" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Full Name" name="fullName">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserInfoModal;
