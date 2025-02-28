// import { useState } from "react";
// import { Table, Checkbox, Collapse, Button, Select } from "antd";
// import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
// import "antd/dist/reset.css";

// const { Panel } = Collapse;
// const { Option } = Select;

// const data = [
//   {
//     key: "3",
//     group: "Tài liệu",
//     permissions: [
//       { category: "Tài liệu", name: "Trang tìm kiếm", key: "3-1" },
//       { category: "Tài liệu", name: "Trang quản lý", key: "3-2" },
//       { category: "Tài liệu", name: "Thêm mới", key: "3-3" },
//       { category: "Tài liệu", name: "Sao chép", key: "3-4" },
//       { category: "Tài liệu", name: "Cập nhật", key: "3-5" },
//       { category: "Tài liệu", name: "Xem danh sách tệp tin", key: "3-6" },
//       { category: "Tài liệu", name: "Thêm tệp tin", key: "3-7" },
//       { category: "Tài liệu", name: "Cập nhật tệp tin", key: "3-8" },
//       { category: "Tài liệu", name: "Xóa tệp tin", key: "3-9" },
//       { category: "Tài liệu", name: "Tải về", key: "3-10" },
//       { category: "Tài liệu", name: "Xóa", key: "3-11" },
//     ],
//   },
//   {
//     key: "2",
//     group: "Người dùng",
//     permissions: [
//       { category: "Người dùng", name: "Xem danh sách", key: "2-1" },
//       { category: "Người dùng", name: "Cập nhật", key: "2-2" },
//       { category: "Người dùng", name: "Danh sách vai trò", key: "2-3" },
//       { category: "Người dùng", name: "Phân quyền cho vai trò", key: "2-4" },
//     ],
//   },
//   {
//     key: "1",
//     group: "Danh mục",
//     permissions: [
//       { category: "Danh mục", name: "Xem", key: "1-1" },
//       { category: "Danh mục", name: "Thêm mới", key: "1-2" },
//       { category: "Danh mục", name: "Cập nhật", key: "1-3" },
//     ],
//   }
// ];

// const UserPermissions = ({ visible, onClose }) => {
//   const [selectedPermissions, setSelectedPermissions] = useState({});

//   const handleCheckboxChange = (key) => {
//     setSelectedPermissions((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   if (!visible) return null;

//   return (
//     <div style={{ padding: 20, border: "1px solid #ddd", borderRadius: 5 }}>
//       <h2>Danh sách quyền</h2>
//       {/* <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
//         <Button type="primary" icon={<SaveOutlined />}>Lưu thay đổi</Button>
//         <Button type="danger" icon={<CloseOutlined />} onClick={onClose}>Đóng</Button>
//       </div> */}
//       <Collapse defaultActiveKey={data.map((item) => item.key)}>
//         {data.map((group) => (
//           <Panel header={`Nhóm quyền: ${group.group}`} key={group.key}>
//             <Table
//               dataSource={group.permissions}
//               columns={[
//                 { title: "Nhóm quyền", dataIndex: "category", key: "category" },
//                 { title: "Tên quyền", dataIndex: "name", key: "name" },
//                 {
//                   title: "Chọn",
//                   key: "select",
//                   render: (text, record) => (
//                     <Checkbox
//                       checked={selectedPermissions[record.key] || false}
//                       onChange={() => handleCheckboxChange(record.key)}
//                     />
//                   ),
//                 },
//               ]}
//               pagination={false}
//             />
//           </Panel>
//         ))}
//       </Collapse>
//       <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
//         <Select defaultValue={20} style={{ width: 120 }}>
//           <Option value={10}>10</Option>
//           <Option value={20}>20</Option>
//           <Option value={50}>50</Option>
//         </Select>
//         <span>Trang 1 của 1</span>
//       </div>
//     </div>
//   );
// };

// export default UserPermissions;
import { useState } from "react";
import { Table, Checkbox, Collapse, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Panel } = Collapse;
const { Option } = Select;

const data = [
  { key: "3", group: "Tài liệu", permissions: [
      { category: "Tài liệu", name: "Trang tìm kiếm", key: "3-1" },
      { category: "Tài liệu", name: "Trang quản lý", key: "3-2" },
      { category: "Tài liệu", name: "Thêm mới", key: "3-3" },
      { category: "Tài liệu", name: "Sao chép", key: "3-4" },
      { category: "Tài liệu", name: "Cập nhật", key: "3-5" },
      { category: "Tài liệu", name: "Xem danh sách tệp tin", key: "3-6" },
      { category: "Tài liệu", name: "Thêm tệp tin", key: "3-7" },
      { category: "Tài liệu", name: "Cập nhật tệp tin", key: "3-8" },
      { category: "Tài liệu", name: "Xóa tệp tin", key: "3-9" },
      { category: "Tài liệu", name: "Tải về", key: "3-10" },
      { category: "Tài liệu", name: "Xóa", key: "3-11" },
  ]},
  { key: "2", group: "Người dùng", permissions: [
      { category: "Người dùng", name: "Xem danh sách", key: "2-1" },
      { category: "Người dùng", name: "Cập nhật", key: "2-2" },
      { category: "Người dùng", name: "Danh sách vai trò", key: "2-3" },
      { category: "Người dùng", name: "Phân quyền cho vai trò", key: "2-4" },
  ]},
  { key: "1", group: "Danh mục", permissions: [
      { category: "Danh mục", name: "Xem", key: "1-1" },
      { category: "Danh mục", name: "Thêm mới", key: "1-2" },
      { category: "Danh mục", name: "Cập nhật", key: "1-3" },
  ]}
];

const UserPermissions = ({ visible }) => {
  const [selectedPermissions, setSelectedPermissions] = useState({});

  const handleCheckboxChange = (key) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!visible) return null;

  return (
    <div style={{ padding: "10px", borderRadius: "5px", background: "#f9f9f9" }}>
      <Collapse defaultActiveKey={data.map(item => item.key)} expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}>
        {data.map((group) => (
          <Panel header={group.group} key={group.key}>
            <Table
              dataSource={group.permissions}
              columns={[
                { title: "Tên quyền", dataIndex: "name", key: "name", width: "70%" },
                { 
                  title: "Chọn", key: "select", align: "center",
                  render: (_, record) => (
                    <Checkbox
                      checked={selectedPermissions[record.key] || false}
                      onChange={() => handleCheckboxChange(record.key)}
                    />
                  ),
                },
              ]}
              pagination={false}
              size="small"
            />
          </Panel>
        ))}
      </Collapse>
      <div style={{ marginTop: 10, textAlign: "right" }}>
        <Select defaultValue={20} style={{ width: 100 }}>
          <Option value={10}>10</Option>
          <Option value={20}>20</Option>
          <Option value={50}>50</Option>
        </Select>
      </div>
    </div>
  );
};

export default UserPermissions;
