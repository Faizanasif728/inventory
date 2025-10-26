import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Guideline = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ padding: '0 clamp(0.5rem, 2vw, 1rem)', marginBottom: '.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#4F0341', fontWeight: 900, fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', letterSpacing: '.04em', textTransform: 'uppercase', margin: 0 }}>Guideline</h1>
        <Button type='default' onClick={() => navigate(-1)} className='btn-go-back' style={{ borderRadius: '9999px', fontWeight: 800 }}>
          <ArrowLeftOutlined /> Go Back
        </Button>
      </div>
      <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.9, textAlign: 'justify' }}>
        <li>Start by creating brands, categories, and sellers</li>
        <li>Add products with clear names, SKUs, and pricing</li>
        <li>Record purchases to update stock; verify quantities</li>
        <li>Use sales module to sell and track order history</li>
        <li>Review dashboard charts for trends and decisions</li>
      </ul>
    </div>
  );
};

export default Guideline;


