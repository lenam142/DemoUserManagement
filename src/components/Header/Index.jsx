import { Layout, Menu, Input, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.css';  

const { Header } = Layout;

const HeaderComponent = () =>{
    return (
        <Header className='site-layout-background' 
            style={{
                position: 'sticky',
                top: 1,
                zIndex: 1000,
                padding:'0 20px',
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center' }}>
                <div style={{ display:'flex',alignItems:'center' }}>
                    <img src="./hbclogo-2.png" alt="Logo" 
                    style={{ width:'40px',marginRight:'10px' }} />
                    <Menu mode="horizontal" theme="light" style={{flex:1, minWidth:'500px',justifyContent:'center',overflow:'visible'}}>
                        <Menu.Item key="1">Quản lý tài liệu</Menu.Item>
                        <Menu.Item key="2">Danh mục</Menu.Item>
                        <Menu.Item key="3">Người dùng</Menu.Item>
                        <Menu.Item key="4">Phân quyền</Menu.Item>
                    </Menu>
                </div>
                <div>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Tìm kiếm"
                    style={{ width: 200 , right: 30}}/>
                     <Avatar>

                    </Avatar>
                </div>
               
        </Header>
    )
}
export default HeaderComponent;
