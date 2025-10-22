import { SpinnerIcon, Eye, EyeSlash } from '@phosphor-icons/react';
import { Button, Flex, Row, Col } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toastMessage from '../../lib/toastMessage';
import { useLoginMutation } from '../../redux/features/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/services/authSlice';
import decodeToken from '../../utils/decodeToken';
import loginBanner from '../../assets/iphone-image.png';
import { useState } from 'react';

const LoginPage = () => {
  const [userLogin, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await userLogin(data).unwrap();

      if (res.statusCode === 200) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate('/');
        toastMessage({ icon: 'success', text: 'Successfully Login!' });
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

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
              width: '420px',
              padding: '2.5rem',
            }}
          >
            <h1 className='auth-title'>
              Login
            </h1>
            <p className='auth-subtext'>Enter your email and password to continue.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='label-row'>
                <label htmlFor='email' className='input-label'>Email:</label>
              </div>
              <input
                type='text'
                {...register('email', { required: true })}
                placeholder='Enter your email here'
                id='email'
                className={`input-field ${errors['email'] ? 'input-field-error' : ''}`}
              />
              {errors['email'] && <span className='field-error'>Email is required</span>}
              <div className='label-row'>
                <label htmlFor='password' className='input-label'>Password:</label>
              </div>
              <div className='input-with-icon'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password here'
                  className={`input-field ${errors['password'] ? 'input-field-error' : ''}`}
                  id='password'
                  {...register('password', { required: true })}
                />
                <button
                  type='button'
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className='icon-btn'
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <EyeSlash size={20} weight='bold' /> : <Eye size={20} weight='bold' />}
                </button>
              </div>
              {errors['password'] && <span className='field-error'>Password is required</span>}
              <p className='auth-inline-note'>
                Don't have an account? <Link className='muted-link' to='/register'>Register Here</Link>
              </p>
              <Flex justify='center'>
                <Button
                  htmlType='submit'
                  type='primary'
                  disabled={isLoading}
                  className='btn-primary-purple'
                  style={{ textTransform: 'uppercase', fontWeight: 'bold', width: '100%' }}
                >
                  {isLoading && <SpinnerIcon className='spin' weight='bold' />}
                  Login
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
