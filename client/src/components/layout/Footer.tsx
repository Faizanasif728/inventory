import { Flex } from 'antd';
import { InstagramLogo, TiktokLogo, WhatsappLogo } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/inventory-logo.png';

const AppFooter = () => {
  return (
    <div
      className='app-footer'
      style={{
        background: '#F8F5FA',
        borderTop: '1px solid rgba(79, 3, 65, 0.15)',
        padding: '1.75rem 2rem',
      }}
    >
      <div className='footer-inner' style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Flex justify='space-between' align='flex-start' wrap gap={24} style={{ width: '100%' }}>
          {/* Left: Logo + title with description under */}
          <div className='footer-brand' style={{ minWidth: 260 }}>
            <Flex align='center' gap='0.75rem'>
              <img src={logo} alt='IMS Logo' style={{ height: 32 }} />
              <div className='footer-brand-title' style={{ color: '#4F0341' }}>IMS</div>
            </Flex>
            <div className='footer-description'>
              Streamline inventory with quick insights into products, purchases, and sales.
            </div>
          </div>

          {/* Center: two vertical columns (Quick Links, Company) */}
          <Flex className='footer-links' justify='center' align='flex-start' style={{ flex: 1, minWidth: 420 }} gap={64}>
            <div className='footer-col'>
              <div className='footer-section-title'>Quick link</div>
              <ul className='footer-links-list'>
                <li><a className='footer-link' href='#'>About</a></li>
                <li><a className='footer-link' href='#'>Contact</a></li>
                <li><a className='footer-link' href='#'>Support</a></li>
                <li><a className='footer-link' href='#'>Guideline</a></li>
              </ul>
            </div>
            <div className='footer-col'>
              <div className='footer-section-title'>Company</div>
              <ul className='footer-links-list'>
                <li><NavLink className='footer-link' to='/'>Home</NavLink></li>
                <li><NavLink className='footer-link' to='/products'>Products</NavLink></li>
                <li><NavLink className='footer-link' to='/sales'>Sales</NavLink></li>
                <li><NavLink className='footer-link' to='/purchases'>Purchases</NavLink></li>
              </ul>
            </div>
          </Flex>

          {/* Right: Social icons */}
          <Flex className='footer-social' vertical align='flex-end' style={{ minWidth: 220 }}>
            <div className='footer-section-title'>Follow Me</div>
            <div className='footer-social-icons' style={{ display: 'flex', gap: '0.75rem' }}>
              <a href='#' aria-label='WhatsApp' className='footer-social-link'>
                <WhatsappLogo size={28} weight='fill' />
              </a>
              <a href='#' aria-label='TikTok' className='footer-social-link'>
                <TiktokLogo size={28} weight='fill' />
              </a>
              <a href='#' aria-label='Instagram' className='footer-social-link'>
                <InstagramLogo size={28} weight='fill' />
              </a>
            </div>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default AppFooter;


