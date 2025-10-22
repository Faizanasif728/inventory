import {useState} from 'react';
import {Outlet, useNavigate, NavLink} from 'react-router-dom';
import {Button, Drawer, Layout, Menu} from 'antd';
import {LogoutOutlined, MenuOutlined, CloseOutlined} from '@ant-design/icons';
import {sidebarItems} from '../../constant/sidebarItems';
import logo from '../../assets/inventory-logo.png';
import AppFooter from './Footer';
import {useAppDispatch} from '../../redux/hooks';
import {logoutUser} from '../../redux/services/authSlice';

const {Header, Content} = Layout;

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
    <Layout style={{minHeight: '100vh', background: '#ffffff'}}>
      <Header className='app-header'
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: '#F8F5FA',
          position: 'relative',
          height: '80px',
          borderBottom: '1px solid rgba(79, 3, 65, 0.15)'
        }}
      >
        <Button
          type='text'
          aria-label='Open menu'
          onClick={() => setIsDrawerOpen(true)}
          icon={<MenuOutlined style={{color: '#4F0341', fontSize: 28}} />}
        />
        <img src={logo} alt='IMS Logo' style={{height: 40}} />
        <div className='top-nav-links' style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <NavLink to='/' style={{ color: '#4F0341', fontWeight: 800, fontSize: 18 }}>Home</NavLink>
          <NavLink to='/products' style={{ color: '#4F0341', fontWeight: 800, fontSize: 18 }}>Products</NavLink>
          <NavLink to='/sales' style={{ color: '#4F0341', fontWeight: 800, fontSize: 18 }}>Sales</NavLink>
          <NavLink to='/purchases' style={{ color: '#4F0341', fontWeight: 800, fontSize: 18 }}>Purchases</NavLink>
        </div>
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
        bodyStyle={{padding: 0, background: '#ffffff'}}
        headerStyle={{background: '#ffffff'}}
        maskClosable
        closable={false}
        mask={false}
      >
        <Menu
          theme='light'
          mode='inline'
          className='app-sidebar-menu'
          style={{backgroundColor: '#ffffff', fontWeight: 700, borderRight: 0}}
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

      <Layout style={{background: '#ffffff'}}>
        <Content style={{padding: '1rem', background: '#ffffff'}}>
          <div
            style={{
              padding: '1rem',
              minHeight: 'calc(100vh - 80px - 2rem)',
              background: 'transparent',
              borderRadius: '0',
              overflow: 'auto',
            }}
          >
            <Outlet />
          </div>
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default Sidebar;
