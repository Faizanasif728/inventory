import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ padding: '0 clamp(0.5rem, 2vw, 1rem)', marginBottom: '.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#4F0341', fontWeight: 900, fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', letterSpacing: '.04em', textTransform: 'uppercase', margin: 0 }}>Support</h1>
        <Button type='default' onClick={() => navigate(-1)} className='btn-go-back' style={{ borderRadius: '9999px', fontWeight: 800 }}>
          <ArrowLeftOutlined /> Go Back
        </Button>
      </div>
      <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.9, textAlign: 'justify' }}>
        <li>Browse FAQs for product, category, and brand management</li>
        <li>Troubleshoot login, roles, and permission issues</li>
        <li>Check guides for adding purchases and recording sales</li>
        <li>Monitor system status and recent updates</li>
        <li>Contact support if data sync or reports look incorrect</li>
      </ul>
    </div>
  );
};

export default Support;


