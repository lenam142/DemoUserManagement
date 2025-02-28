
import { useState, useEffect } from 'react';
import { Table, Button, Space, Input, Select, Radio, Tag, message } from 'antd';
import { EditOutlined, DeleteOutlined, FilterOutlined } from '@ant-design/icons';
import Pagination from '../components/Pagination';
import UserInfoModal from '../components/UserInfoModal';
import DeleteUserModal from '../components/DeleteUserModal';
import generateData from '../utils/generateData';  
import '../pages/UserListPage.css';
import UserPermissions from '../components/userPermissions';

const { Option } = Select;

const UserListPage = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  // const [permissionsVisible, setPermissionsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const [filters, setFilters] = useState({
    username: ['', '', ''],
    fullname: ['', '', ''],
    email: ['', '', ''],
    role: ['', '', ''],
    isApproved: null,
    isLockedOut: null,
  });

  const columnsConfig = [
    { key: 'username', label: 'User Name', type: 'select-input' },
    { key: 'fullName', label: 'Full Name', type: 'select-input' },
    { key: 'email', label: 'Email', type: 'select-input' },
    { key: 'role', label: 'Role', type: 'select-input' },
    { key: 'isApproved', label: 'Is Approved', type: 'radio' },
    { key: 'isLockedOut', label: 'Is Locked Out', type: 'radio' },
  ];

  useEffect(() => {
    setLoading(true);
    const users = generateData;  
    console.log(typeof generateData);

    setFilteredUsers(users);
    setLoading(false);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleApplyFilter = () => {
    let filteredData = [...generateData];  

    columnsConfig.forEach((column) => {
      const filterValue = filters[column.key];
      if (Array.isArray(filterValue)) {
        const [select1, input1, select2, input2] = filterValue;
        filteredData = filteredData.filter((item) => {
          const itemValue = item[column.key]?.toString().toLowerCase();
          return (
            (select1 ? itemValue.includes(select1.toLowerCase()) : true) &&
            (input1 ? itemValue.includes(input1.toLowerCase()) : true) &&
            (select2 ? itemValue.includes(select2.toLowerCase()) : true) &&
            (input2 ? itemValue.includes(input2.toLowerCase()) : true)
          );
        });
      }else if (column.type === 'radio') {
        filteredData = filteredData.filter((item) => {
          return item[column.key] === Boolean(filterValue);
        });
      }
    });

    setFilteredUsers(filteredData);
    setCurrentPage(1);
  };

  const handleExpandRow = (key) => {
    setExpandedRowKeys((prevKeys) =>
      prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key]
    );
};

  const handleClearFilter = () => {
    setFilters({
      username: ['', '', ''],
      fullName: ['', '', ''],
      email: ['', '', ''],
      role: ['', '', ''],
      isApproved: null,
      isLockedOut: null,
    });
    setFilteredUsers(generateData);
    setCurrentPage(1);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleDelete = (userId) =>{
    const updatedUsers = filteredUsers.filter((user)=>user.key!==userId);
    setFilteredUsers(updatedUsers);
    message.success('User Deleted successfully');
    setDeleteModalVisible(false);
  }



  const handleSave = (updatedUser) => {
    const updatedUsers = filteredUsers.map((user) =>
      user.key === updatedUser.key ? { ...user, ...updatedUser } : user
    );
    setFilteredUsers(updatedUsers);
    setModalVisible(false);
    setSelectedUser(null);
  };

  const expandedRowRender = (record) => {
    return expandedRowKeys.includes(record.key) ? (
      <UserPermissions visible onClose={() => setExpandedRowKeys(expandedRowKeys.filter(k => k !== record.key))} />
    ) : null;
  };

  const columns = columnsConfig.map((column) => ({
    title: column.label,
    dataIndex: column.key,
    key: column.key,
    width: column.key === 'username' ? 200 : column.key === 'email' ? 350 : 350, 
    render: (text, record) => {
      if (column.key === 'isApproved' || column.key === 'isLockedOut') {
        return (
            <Tag>
                {record[column.key] ? 'True' : 'False'}
            </Tag>
        );
      }
      return text;
    },
    filterDropdown: () => (
      <div style={{ padding: 8, width: 150 }}>
        <Button
          type="link"
          onClick={handleClearFilter}
          style={{ marginBottom: 8, padding: 0 }}
        >
          ✗ Xoá giá trị lọc
        </Button>
        <div style={{ marginBottom: 8, fontWeight: 'bold' }}>Bảng dữ liệu</div>
        
        {column.type === 'select-input' ? (
          <>
            <Select
              placeholder="bằng"
              style={{ width: '100%', marginBottom: 8 }}
              value={filters[column.key] && filters[column.key][0]}
              onChange={(value) =>
                setFilters({
                  ...filters,
                  [column.key]: [
                    value,
                    filters[column.key][1],
                    filters[column.key][2],
                    filters[column.key][3],
                  ],
                })
              }
            >
              <Option value="equal">bằng</Option>
              <Option value="noEqual">Không bằng</Option>
              <Option value="start">Bắt đầu với</Option>
              <Option value="contain">Chứa</Option>
              <Option value="end">Kết thúc</Option>
            </Select>
            <Input
              style={{ marginBottom: 8 }}
              value={filters[column.key] && filters[column.key][1]}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  [column.key]: [...filters[column.key].slice(0, 1), e.target.value, ...filters[column.key].slice(2)],
                })
              }
            />
            <div style={{ marginBottom: 8 }}>Và</div>
            <Select
              placeholder="Chọn bảng"
              style={{ width: '100%', marginBottom: 8 }}
              value={filters[column.key] && filters[column.key][2]}
              onChange={(value) =>
                setFilters({
                  ...filters,
                  [column.key]: [
                    filters[column.key][0],
                    filters[column.key][1],
                    value,
                    filters[column.key][3],
                  ],
                })
              }
            >
              <Option value="equal">bằng</Option>
              <Option value="noEqual">Không bằng</Option>
              <Option value="start">Bắt đầu với</Option>
              <Option value="contain">Chứa</Option>
              <Option value="end">Kết thúc</Option>
            </Select>
            <Input
              style={{ marginBottom: 8 }}
              value={filters[column.key] && filters[column.key][3]}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  [column.key]: [
                    filters[column.key][0],
                    filters[column.key][1],
                    filters[column.key][2],
                    e.target.value,
                  ],
                })
              }
            />
          </>
        ) : column.type === 'radio' ? (
          <>
            <Radio.Group
              value={filters[column.key]}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  [column.key]: e.target.value,
                })
              }
            >
              <Radio value={true}>True</Radio>
              <Radio value={false}>False</Radio>
            </Radio.Group>
          </>
        ) : null}
        
        <Button type="primary" onClick={handleApplyFilter} style={{ width: '100%' }}>
          Lọc
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilterDropdownVisibleChange: (visible) => {
      if (!visible) {
        setFilters({ ...filters });
      }
    },
    onFilter: (value, record) => {
      if (column.key === 'isApproved' || column.key === 'isLockedOut') {
        return record[column.key] === value;
      } else {
        return record[column.key]
          ? record[column.key].toString().toLowerCase().includes(value.toLowerCase())
          : false;
      }
    },
  }));

  columns.push({
 //   key: "actions",
    render: (record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        <Button icon={<DeleteOutlined />} onClick={() => {
          setSelectedUser(record);
          setDeleteModalVisible(true);
        }} />
      </Space>
    ),
  });
  const paginatedData = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        total={filteredUsers.length}
      />
      <Table
        columns={columns}
        dataSource={paginatedData}
        rowKey="key"
        loading={loading}
        pagination={false}
        expandedRowKeys={expandedRowKeys}
        onExpand={(expanded, record) => handleExpandRow(record.key)} 
        expandedRowRender={expandedRowRender}
      />
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        total={filteredUsers.length}

      />
      <UserInfoModal 
        visible={modalVisible} 
        onCancel={() => setModalVisible(false)} 
        user={selectedUser} 
        handleSave={handleSave} />

      <DeleteUserModal
        visible={deleteModalVisible}
        onCancel={()=>setDeleteModalVisible(false)}
        onDelete={handleDelete}
        user={selectedUser}
        />
        {/* <UserPermissions
          visible={permissionsVisible} 
          onClose={() => setPermissionsVisible(false)} 
        /> */}
    </div>
  );
};

export default UserListPage;

