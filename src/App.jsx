import './App.css'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import UserListPage from './pages/UserListPage'
import HeaderComponent from './components/Header/Index'

function App() {
//padding: '20px'
  return (
    <Layout>
      <HeaderComponent /> 
        <Content style={{  }}>
          <UserListPage />  
        </Content>
    </Layout>
  )
}

export default App
