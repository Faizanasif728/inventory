import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ padding: '0 clamp(0.5rem, 2vw, 1rem)', marginBottom: '.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#4F0341', fontWeight: 900, fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', letterSpacing: '.04em', textTransform: 'uppercase', margin: 0 }}>Contact</h1>
        <Button type='default' onClick={() => navigate(-1)} className='btn-go-back' style={{ borderRadius: '9999px', fontWeight: 800 }}>
          <ArrowLeftOutlined /> Go Back
        </Button>
      </div>
      <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.9, textAlign: 'justify' }}>
        <li>Email: support@ims-app.example (Mon–Fri, 9am–6pm)</li>
        <li>Live chat available from dashboard Help menu</li>
        <li>Report issues with product, purchase, or sales modules</li>
        <li>Billing and account queries handled within 2 business days</li>
        <li>Feedback welcomed to improve IMS usability and features</li>
      </ul>
    </div>
  );
};

export default Contact;


