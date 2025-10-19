import {useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {Button, Drawer, Layout, Menu, Typography} from 'antd';
import {LogoutOutlined, MenuOutlined, CloseOutlined} from '@ant-design/icons';
import {sidebarItems} from '../../constant/sidebarItems';
import {useAppDispatch} from '../../redux/hooks';
import {logoutUser} from '../../redux/services/authSlice';

const {Header, Content} = Layout;
const {Title} = Typography;

const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <Layout style={{height: '100vh', background: '#fff'}}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: '#164863',
        }}
      >
        <Button
          type='text'
          aria-label='Open menu'
          onClick={() => setIsDrawerOpen(true)}
          icon={<MenuOutlined style={{color: '#fff', fontSize: 20}} />}
        />
        <Title level={4} style={{color: '#fff', margin: 0}}>
          IMS
        </Title>
      </Header>

      <Drawer
          title={
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <span style={{color: '#000'}}>IMS</span>
              <Button
                type='text'
                aria-label='Close menu'
                onClick={closeDrawer}
                icon={<CloseOutlined style={{color: '#000', fontSize: 16}} />}
              />
            </div>
          }
        placement='left'
        open={isDrawerOpen}
        onClose={closeDrawer}
        width={240}
        bodyStyle={{padding: 0, background: '#fff'}}
        headerStyle={{background: '#fff'}}
        maskClosable
        closable={false}
        mask={false}
      >
        <Menu
          theme='light'
          mode='inline'
          className='app-sidebar-menu'
          style={{backgroundColor: '#fff', fontWeight: 700, borderRight: 0}}
          selectable={false}
          items={sidebarItems}
          onClick={closeDrawer}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: '1rem',
          }}
        >
          <Button
            type='text'
            danger
            className='logout-btn'
            style={{
              width: '100%',
              color: '#ff4d4f',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
            onClick={handleLogout}
          >
            <LogoutOutlined /> Logout
          </Button>
        </div>
      </Drawer>

      <Layout>
        <Content style={{padding: '1rem', background: '#fff'}}>
          <div
            style={{
              padding: '1rem',
              minHeight: 'calc(100vh - 64px - 2rem)',
              background: '#fff',
              borderRadius: '1rem',
              overflow: 'auto',
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
