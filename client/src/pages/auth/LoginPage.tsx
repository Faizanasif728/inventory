import { SpinnerIcon } from '@phosphor-icons/react';
import { Button, Flex, Row, Col, Input } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toastMessage from '../../lib/toastMessage';
import { useLoginMutation } from '../../redux/features/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/services/authSlice';
import decodeToken from '../../utils/decodeToken';
import loginBanner from '../../assets/iphone-image.png';

const LoginPage = () => {
  const [userLogin, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const emailValue = watch('email');
  const passwordValue = watch('password');

  const onSubmit = async (data: FieldValues) => {
    try {
      // eslint-disable-next-line no-console
      console.log('[IMS][LOGIN] submitting', { email: data?.email });
      const res = await userLogin(data).unwrap();

      if (res.statusCode === 200) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate('/');
        toastMessage({ icon: 'success', text: 'Successfully Login!' });
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('[IMS][LOGIN] failed', error);
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <Flex justify='center' align='center' className='auth-page' style={{ padding: 0 }}>
      <Row gutter={[24, 24]} align='middle' justify='center' style={{ width: '100%', minHeight: 'calc(100vh - 80px)' }}>
        <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={loginBanner} alt='Login' style={{ width: '100%', maxWidth: 450, height: 'auto', objectFit: 'contain' }} />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Flex
            vertical
            className='auth-card'
            style={{
              width: '100%',
              maxWidth: '420px',
              padding: 'clamp(1.5rem, 5vw, 2.5rem)',
            }}
          >
            <h1 className='auth-title' style={{ marginBottom: '0.5rem' }}>
              Login
            </h1>
            <p className='auth-subtext' style={{ marginBottom: '1.5rem' }}>Enter your email and password to continue.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor='email' className='input-label' style={{ marginBottom: '0.5rem', display: 'block' }}>Email:</label>
                <Input
                  size='large'
                  placeholder='Enter your email here'
                  {...register('email', { required: true })}
                  id='email'
                  value={emailValue}
                  onChange={(e) => {
                    const event = {
                      target: {
                        name: 'email',
                        value: e.target.value,
                      },
                    };
                    register('email').onChange?.(event);
                  }}
                  status={errors['email'] ? 'error' : ''}
                  style={{
                    borderRadius: '9px',
                    borderColor: errors['email'] ? '#ef4444' : '#4F0341',
                  }}
                  className={errors['email'] ? 'input-field-error' : ''}
                />
                {errors['email'] && <span className='field-error'>Email is required</span>}
              </div>

              {/* Password Field */}
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor='password' className='input-label' style={{ marginBottom: '0.5rem', display: 'block' }}>Password:</label>
                <Input.Password
                  size='large'
                  placeholder='Enter your password here'
                  {...register('password', { required: true })}
                  id='password'
                  value={passwordValue}
                  onChange={(e) => {
                    const event = {
                      target: {
                        name: 'password',
                        value: e.target.value,
                      },
                    };
                    register('password').onChange?.(event);
                  }}
                  status={errors['password'] ? 'error' : ''}
                  style={{
                    borderRadius: '9px',
                    borderColor: errors['password'] ? '#ef4444' : '#4F0341',
                  }}
                  className={errors['password'] ? 'input-field-error' : ''}
                />
                {errors['password'] && <span className='field-error'>Password is required</span>}
              </div>

              {/* Register Link */}
              <p className='auth-inline-note' style={{ marginBottom: '1rem' }}>
                Don't have an account? <Link className='muted-link' to='/register'>Register Here</Link>
              </p>

              {/* Login Button */}
              <Flex justify='center'>
                <Button
                  htmlType='submit'
                  type='primary'
                  disabled={isLoading}
                  className='btn-primary-purple'
                  loading={isLoading}
                  style={{ 
                    textTransform: 'uppercase', 
                    fontWeight: 'bold', 
                    width: '100%',
                    borderRadius: '9999px',
                    letterSpacing: '.02em',
                    height: '44px',
                    fontSize: '1rem'
                  }}
                >
                  {isLoading && <SpinnerIcon className='spin' weight='bold' />}
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </Flex>
            </form>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
};

export default LoginPage;
