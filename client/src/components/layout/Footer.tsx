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
        padding: 'clamp(2.5rem, 8vw, 4rem) clamp(1.5rem, 5vw, 2rem)',
      }}
    >
      <div className='footer-inner' style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Flex justify='space-between' align='flex-start' wrap gap={32} style={{ width: '100%' }}>
          {/* Left: Logo + title with description under */}
          <div className='footer-brand' style={{ minWidth: 260, flex: '0 0 auto' }}>
            <Flex align='center' gap='1rem' style={{ marginBottom: '1rem' }}>
              <img src={logo} alt='IMS Logo' style={{ height: 40 }} />
              <div className='footer-brand-title' style={{ color: '#4F0341', fontSize: 'clamp(1.2rem, 3vw, 1.4rem)' }}>IMS</div>
            </Flex>
            <div className='footer-description' style={{ fontSize: 'clamp(0.9rem, 2vw, 0.95rem)', lineHeight: 1.6 }}>
              Streamline inventory with quick insights into products, purchases, and sales.
            </div>
          </div>

          {/* Center: two vertical columns (Quick Links, Company) */}
          <Flex className='footer-links' justify='center' align='flex-start' style={{ flex: 1, minWidth: 420, gap: 'clamp(3rem, 8vw, 4rem)' }} gap={64}>
            <div className='footer-col'>
              <div className='footer-section-title' style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', marginBottom: '1rem' }}>Quick link</div>
              <ul className='footer-links-list' style={{ lineHeight: '2.2' }}>
                <li><a className='footer-link' href='#' style={{ fontSize: 'clamp(0.9rem, 2vw, 0.95rem)' }}>About</a></li>
                <li><a className='footer-link' href='#' style={{ fontSize: 'clamp(0.9rem, 2vw, 0.95rem)' }}>Contact</a></li>
                <li><a className='footer-link' href='#' style={{ fontSize: 'clamp(0.9rem, 2vw, 0.95rem)' }}>Support</a></li>
                <li><a className='footer-link' href='#' style={{ fontSize: 'clamp(0.9rem, 2vw, 0.95rem)' }}>Guideline</a></li>
              </ul>
            </div>
            <div className='footer-col'>
              <div className='footer-section-title' style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', marginBottom: '1rem' }}>Company</div>
              <ul className='footer-links-list' style={{ lineHeight: '2.2' }}>
                <li><NavLink className='footer-link' to='/' style={{ fontSize: 'clamp(0.9rem, 2vw, 0.95rem)' }}>Home</NavLink></li>
                <li><NavLink className='footer-link' to='/products' style={{ fontSize: 'clamp(0.9rem, 2vw, 0.95rem)' }}>Products</NavLink></li>
                <li><NavLink className='footer-link' to='/sales' style={{ fontSize: 'clamp(0.9rem, 2vw, 0.95rem)' }}>Sales</NavLink></li>
                <li><NavLink className='footer-link' to='/purchases' style={{ fontSize: 'clamp(0.9rem, 2vw, 0.95rem)' }}>Purchases</NavLink></li>
              </ul>
            </div>
          </Flex>

          {/* Right: Social icons */}
          <Flex className='footer-social' vertical align='flex-end' style={{ minWidth: 220 }}>
            <div className='footer-section-title' style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', marginBottom: '1rem' }}>Follow Me</div>
            <div className='footer-social-icons' style={{ display: 'flex', gap: '1rem' }}>
              <a href='#' aria-label='WhatsApp' className='footer-social-link' style={{ transition: 'all 200ms ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15) translateY(-2px)'; e.currentTarget.style.color = '#25D366'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.color = '#4F0341'; }}>
                <WhatsappLogo size={32} weight='fill' />
              </a>
              <a href='#' aria-label='TikTok' className='footer-social-link' style={{ transition: 'all 200ms ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15) translateY(-2px)'; e.currentTarget.style.color = '#000'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.color = '#4F0341'; }}>
                <TiktokLogo size={32} weight='fill' />
              </a>
              <a href='#' aria-label='Instagram' className='footer-social-link' style={{ transition: 'all 200ms ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15) translateY(-2px)'; e.currentTarget.style.color = '#E1306C'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.color = '#4F0341'; }}>
                <InstagramLogo size={32} weight='fill' />
              </a>
            </div>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default AppFooter;


