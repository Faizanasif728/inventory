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
              <span style={{color: '#fff'}}>IMS</span>
              <Button
                type='text'
                aria-label='Close menu'
                onClick={closeDrawer}
                icon={<CloseOutlined style={{color: '#fff', fontSize: 16}} />}
              />
            </div>
          }
        placement='left'
        open={isDrawerOpen}
        onClose={closeDrawer}
        width={240}
        bodyStyle={{padding: 0, background: '#164863'}}
        headerStyle={{background: '#164863'}}
        maskClosable
        closable={false}
        getContainer={false}
        mask={false}
      >
        <Menu
          theme='dark'
          mode='inline'
          style={{backgroundColor: '#164863', fontWeight: 700, borderRight: 0}}
          defaultSelectedKeys={['Dashboard']}
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
            type='primary'
            style={{
              width: '100%',
              backgroundColor: 'cyan',
              color: '#000',
              fontWeight: 600,
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
