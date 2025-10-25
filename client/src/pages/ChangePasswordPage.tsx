import { Button, Flex, Input } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';
import { useChangePasswordMutation } from '../redux/features/authApi';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, LockOutlined } from '@ant-design/icons';

const ChangePasswordPage = () => {
  const [changePassword] = useChangePasswordMutation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must have 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Password and confirm password does not match');
      return;
    }

    const payload = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    try {
      setIsSubmitting(true);
      const toastId = toast.loading('Changing password...');
      const res = await changePassword(payload).unwrap();

      if (res.success) {
        toast.success('Password changed successfully', { id: toastId });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        navigate('/profile');
      }
    } catch (error: any) {
      toast.error(error.data.message || 'Failed to change password', { id: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Flex vertical style={{ gap: '2rem', paddingBottom: '2rem', padding: '0 clamp(0.5rem, 2vw, 1rem)', minHeight: 'calc(100vh - 10rem)', justifyContent: 'center' }}>
        {/* Header */}
        <Flex justify='space-between' align='center'>
          <h1 style={{ 
            color: '#4F0341', 
            fontWeight: 900, 
            fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', 
            letterSpacing: '.04em', 
            textTransform: 'uppercase',
            margin: 0
          }}>
            Change Password
          </h1>
          <Button 
            type='default' 
            onClick={() => navigate('/profile')}
            style={{ borderRadius: '9999px', fontWeight: 800 }}
          >
            <ArrowLeftOutlined /> Go Back
          </Button>
        </Flex>

        {/* Main Card */}
        <Flex justify='center'>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '500px'
          }}>
            
            {/* Header Section */}
            <div style={{
              padding: 'clamp(1.5rem, 5vw, 2rem)',
              textAlign: 'center',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 1rem',
                backgroundColor: 'rgba(79, 3, 65, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <LockOutlined style={{ fontSize: '1.75rem', color: '#4F0341' }} />
              </div>
              <h2 style={{ 
                color: '#4F0341', 
                fontWeight: 900, 
                fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
                margin: '0 0 0.5rem 0'
              }}>
                Secure Your Account
              </h2>
              <p style={{ 
                color: '#666', 
                fontSize: '0.9rem',
                margin: 0,
                fontWeight: 500
              }}>
                Update your password to keep your account safe
              </p>
            </div>

            {/* Form Section */}
            <div style={{ padding: 'clamp(1.5rem, 5vw, 2rem)' }}>
              <Flex vertical gap='1rem'>
                {/* Old Password */}
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: 800,
                    color: '#4F0341',
                    fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                    letterSpacing: '.02em',
                    textTransform: 'capitalize',
                    marginBottom: '0.5rem'
                  }}>
                    Old Password
                  </label>
                  <Input.Password
                    size='large'
                    placeholder='Enter your old password'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    style={{
                      borderRadius: '0.75rem',
                      borderColor: '#4F0341',
                      fontSize: 'clamp(0.85rem, 2vw, 1rem)'
                    }}
                  />
                </div>

                {/* New Password */}
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: 800,
                    color: '#4F0341',
                    fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                    letterSpacing: '.02em',
                    textTransform: 'capitalize',
                    marginBottom: '0.5rem'
                  }}>
                    New Password
                  </label>
                  <Input.Password
                    size='large'
                    placeholder='Enter your new password (min 6 characters)'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{
                      borderRadius: '0.75rem',
                      borderColor: '#4F0341',
                      fontSize: 'clamp(0.85rem, 2vw, 1rem)'
                    }}
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: 800,
                    color: '#4F0341',
                    fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                    letterSpacing: '.02em',
                    textTransform: 'capitalize',
                    marginBottom: '0.5rem'
                  }}>
                    Confirm Password
                  </label>
                  <Input.Password
                    size='large'
                    placeholder='Confirm your new password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      borderRadius: '0.75rem',
                      borderColor: '#4F0341',
                      fontSize: 'clamp(0.85rem, 2vw, 1rem)'
                    }}
                  />
                </div>

                {/* Buttons */}
                <Flex gap='1rem' wrap='wrap' style={{ marginTop: '1.5rem' }}>
                  <Button
                    type='primary'
                    className='btn-primary-purple'
                    onClick={handleSubmit}
                    disabled={isSubmitting || !oldPassword || !newPassword || !confirmPassword}
                    loading={isSubmitting}
                    style={{
                      flex: 1,
                      minWidth: '120px',
                      borderRadius: '9999px',
                      fontWeight: 800,
                      letterSpacing: '.02em',
                      fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                      padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
                      textTransform: 'uppercase'
                    }}
                  >
                    Change Password
                  </Button>
                  <Button
                    onClick={() => navigate('/profile')}
                    style={{
                      flex: 1,
                      minWidth: '120px',
                      borderRadius: '9999px',
                      fontWeight: 800,
                      letterSpacing: '.02em',
                      fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                      padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
                      textTransform: 'uppercase'
                    }}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Flex>
            </div>
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default ChangePasswordPage;
