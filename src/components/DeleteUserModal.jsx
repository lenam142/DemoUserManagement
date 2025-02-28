import { Modal, Button } from 'antd';

const DeleteUserModal = ({ visible, onCancel, onDelete, user }) => {
  return (
    <Modal
      title="Delete User"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
            Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => onDelete(user.key)}>
            Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete user: <strong>{user?.username}</strong>?</p>
    </Modal>
  );
};

export default DeleteUserModal;
