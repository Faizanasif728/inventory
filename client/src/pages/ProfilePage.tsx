import { EditFilled, EditOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row } from 'antd';
import userProPic from '../assets/User.png';
import Loader from '../components/Loader';
import { useGetSelfProfileQuery } from '../redux/features/authApi';
import { Link } from 'react-router-dom';

// Field grouping configuration
const fieldGroups = {
  personal: {
    title: 'Personal Information',
    fields: ['name', 'email', 'phone', 'status']
  },
  location: {
    title: 'Location',
    fields: ['address', 'city', 'country']
  },
  professional: {
    title: 'Professional',
    fields: ['title', 'description']
  },
  social: {
    title: 'Social Media',
    fields: ['facebook', 'twitter', 'linkedin', 'instagram']
  }
};

const ProfilePage = () => {
  const { data, isLoading } = useGetSelfProfileQuery(undefined);

  if (isLoading) return <Loader />;

  const userData = data?.data;

  return (
    <>
      <Flex vertical style={{ gap: '2rem', paddingBottom: '2rem', padding: '0 clamp(0.5rem, 2vw, 1rem)' }}>
        {/* Main Card Container */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '1.25rem',
          overflow: 'hidden'
        }}>
          
          {/* Header Section with Avatar */}
          <div style={{
            background: '#fff',
            padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1rem, 5vw, 2rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <Flex
              justify='center'
              style={{
                width: 'clamp(120px, 30vw, 150px)',
                height: 'clamp(120px, 30vw, 150px)',
                border: '3px solid #4F0341',
                padding: '0',
                borderRadius: '50%',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
              }}
            >
              <img
                src={userData?.avatar || userProPic}
                alt='user'
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            </Flex>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ 
                color: '#4F0341', 
                fontWeight: 900, 
                fontSize: 'clamp(1.25rem, 5vw, 1.75rem)', 
                letterSpacing: '.02em', 
                margin: 0, 
                textTransform: 'uppercase',
                wordBreak: 'break-word'
              }}>
                {userData?.name || 'User Profile'}
              </h1>
              <p style={{ 
                color: '#666', 
                fontSize: 'clamp(0.8rem, 3vw, 0.95rem)', 
                margin: '0.5rem 0 0 0', 
                fontWeight: 500,
                wordBreak: 'break-all'
              }}>
                {userData?.email || '-'}
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div style={{ 
            padding: 'clamp(1rem, 5vw, 2rem)'
          }}>
            {/* Personal Information */}
            <ProfileSection 
              title={fieldGroups.personal.title}
              fields={fieldGroups.personal.fields}
              userData={userData}
            />

            {/* Location */}
            <ProfileSection 
              title={fieldGroups.location.title}
              fields={fieldGroups.location.fields}
              userData={userData}
            />

            {/* Professional */}
            <ProfileSection 
              title={fieldGroups.professional.title}
              fields={fieldGroups.professional.fields}
              userData={userData}
            />

            {/* Social Media */}
            <ProfileSection 
              title={fieldGroups.social.title}
              fields={fieldGroups.social.fields}
              userData={userData}
              isLast={true}
            />
          </div>

          {/* Action Buttons Section */}
          <div style={{ 
            padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 5vw, 2rem)',
            borderTop: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            flexWrap: 'wrap'
          }}>
            <Link to='/edit-profile'>
              <Button type='primary' className='btn-primary-purple' style={{ fontWeight: 800, letterSpacing: '.02em', borderRadius: '9999px', fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}>
                <EditOutlined />
                Edit Profile
              </Button>
            </Link>
            <Link to='/change-password'>
              <Button type='primary' className='btn-primary-purple' style={{ fontWeight: 800, letterSpacing: '.02em', borderRadius: '9999px', fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}>
                <EditFilled />
                Change Password
              </Button>
            </Link>
          </div>
        </div>
      </Flex>
    </>
  );
};

export default ProfilePage;

// Component for Profile Sections
const ProfileSection = ({ title, fields, userData, isLast = false }: { title: string; fields: string[]; userData: any; isLast?: boolean }) => {
  return (
    <div style={{ marginBottom: isLast ? 0 : '2rem' }}>
      <h3 style={{
        color: '#4F0341',
        fontWeight: 900,
        fontSize: 'clamp(0.9rem, 3vw, 1rem)',
        letterSpacing: '.04em',
        textTransform: 'uppercase',
        marginBottom: '1.5rem',
        marginTop: 0,
        paddingBottom: '0.75rem',
        borderBottom: '2px solid #4F0341'
      }}>
        {title}
      </h3>
      
      <Row gutter={[24, 16]}>
        {fields.map((field) => (
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} key={field}>
            <ProfileField fieldName={field} value={userData?.[field]} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

// Component for Individual Profile Fields
const ProfileField = ({ fieldName, value }: { fieldName: string; value: string }) => {
  const formatFieldName = (name: string) => {
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  return (
    <div
      style={{
        padding: 'clamp(0.75rem, 2vw, 1rem)',
        borderRadius: '0.75rem',
        backgroundColor: 'rgba(79, 3, 65, 0.03)',
        transition: 'all 200ms ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(79, 3, 65, 0.08)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(79, 3, 65, 0.03)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <label style={{
        display: 'block',
        fontWeight: 800,
        color: '#4F0341',
        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
        letterSpacing: '.02em',
        textTransform: 'capitalize',
        marginBottom: '0.5rem'
      }}>
        {formatFieldName(fieldName)}
      </label>
      <p style={{
        fontWeight: 500,
        color: '#333',
        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
        margin: 0,
        wordBreak: 'break-word'
      }}>
        {value || '-'}
      </p>
    </div>
  );
};
