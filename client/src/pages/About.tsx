import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ padding: '0 clamp(0.5rem, 2vw, 1rem)', marginBottom: '.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#4F0341', fontWeight: 900, fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', letterSpacing: '.04em', textTransform: 'uppercase', margin: 0 }}>About</h1>
        <Button type='default' onClick={() => navigate(-1)} className='btn-go-back' style={{ borderRadius: '9999px', fontWeight: 800 }}>
          <ArrowLeftOutlined /> Go Back
        </Button>
      </div>
      <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.9, textAlign: 'justify' }}>
        <li>Inventory Management System to track products, sales, and purchases.</li>
        <li>Provides dashboards and reports for quick business insights.</li>
        <li>Role-based access and secure authentication for team members.</li>
        <li>Streamlined workflows for product, brand, and category management.</li>
        <li>Built with React, Ant Design, and a Node/Express backend.</li>
      </ul>
    </div>
  );
};

export default About;


