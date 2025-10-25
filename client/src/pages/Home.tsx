import { Button, Col, Row, Typography, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/iphone-image.png';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: '-1rem', padding: '0 clamp(0.5rem, 2vw, 1rem)' }}>
      <Row
        gutter={[24, 24]}
        align='middle'
        style={{ minHeight: 'calc(100vh - 80px - 2rem)' }}
      >
        {/* Left column: welcome, subtext, CTA */}
        <Col xs={{ span: 24 }} md={{ span: 15 }}>
          <Flex vertical justify='center' align='flex-start' className='hero-wrap' style={{ height: '100%', gap: '1.5rem' }}>
            <Title level={1} className='hero-title' style={{ 
              color: '#4F0341', 
              marginTop: 0,
              marginBottom: 0,
              lineHeight: 1.2
            }}>
              <span className='hero-welcome' style={{ display: 'block', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 500, marginBottom: '0.5rem' }}>Welcome To</span>
              <span className='hero-shop' style={{ display: 'block', fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase' }}>IBRAHIM MOBILE SHOP</span>
            </Title>
            <Paragraph className='hero-monologue' style={{ 
              margin: 0,
              maxWidth: '100%',
              fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
              lineHeight: 1.75,
              color: '#555'
            }}>
              Manage products, purchases, and sales with ease. Navigate using the sidebar or jump
              straight into your dashboard.
            </Paragraph>
            <Button
              type='primary'
              className='btn-primary-purple btn-hero'
              style={{ 
                width: 'fit-content', 
                marginTop: '1rem',
                borderRadius: '9999px',
                fontWeight: 800,
                letterSpacing: '.02em',
                padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
                fontSize: 'clamp(0.95rem, 2vw, 1rem)',
                height: 'auto'
              }}
              onClick={() => navigate('/dashboard')}
            >
              Go To Dashboard
            </Button>
          </Flex>
        </Col>

        {/* Right column: banner image starting from navbar bottom border */}
        <Col xs={{ span: 24 }} md={{ span: 9 }}>
          <div className='hero-image' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <img
              src={banner}
              alt='IMS Banner'
              style={{ width: '100%', maxWidth: 400, height: 'auto', objectFit: 'contain' }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;


