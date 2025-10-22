import { Button, Col, Row, Typography, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/iphone-image.png';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: '-1rem' }}>
      <Row
        gutter={[24, 24]}
        align='middle'
        style={{ minHeight: 'calc(100vh - 80px - 2rem)' }}
      >
        {/* Left column: welcome, subtext, CTA */}
        <Col xs={{ span: 24 }} md={{ span: 15 }}>
          <Flex vertical justify='center' align='flex-start' className='hero-wrap' style={{ height: '100%' }}>
            <Title level={1} className='hero-title' style={{ color: '#4F0341', marginTop: 16 }}>
              <span className='hero-welcome'>Welcome To</span>
              <br />
              <span className='hero-shop'>IBRAHIM MOBILE SHOP</span>
            </Title>
            <Paragraph className='hero-monologue'>
              Manage products, purchases, and sales with ease. Navigate using the sidebar or jump
              straight into your dashboard.
            </Paragraph>
            <Button
              type='primary'
              className='btn-primary-purple btn-hero'
              style={{ width: 'fit-content', marginTop: '0.5rem' }}
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


