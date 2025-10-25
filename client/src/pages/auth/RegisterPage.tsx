import { SpinnerIcon } from '@phosphor-icons/react';
import { Button, Flex, Row, Col, Input } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toastMessage from '../../lib/toastMessage';
import { useRegisterMutation } from '../../redux/features/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/services/authSlice';
import decodeToken from '../../utils/decodeToken';
import registerBanner from '../../assets/iphone-image.png';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userRegistration, { isLoading }] = useRegisterMutation();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');
  const nameValue = watch('name');
  const emailValue = watch('email');

  const onSubmit = async (data: FieldValues) => {
    try {
      if (data.password !== data.confirmPassword) {
        toastMessage({ icon: 'error', text: 'Password and confirm password must be same!' });
        return;
      }

      const res = await userRegistration(data).unwrap();

      if (res.statusCode === 201) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate('/');
        console.log(res);
        toastMessage({ icon: 'success', text: res.message });
      }
    } catch (error: any) {
      const errMsg =
        error?.data?.errors?.[Object.keys(error?.data?.errors)[0]] || error.data.message;
      toastMessage({ icon: 'error', text: errMsg });
    }
  };

  return (
    <Flex justify='center' align='center' className='auth-page' style={{ padding: 0 }}>
      <Row gutter={[24, 24]} align='middle' justify='center' style={{ width: '100%', minHeight: 'calc(100vh - 80px)' }}>
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
              Register
            </h1>
            <p className='auth-subtext' style={{ marginBottom: '1.5rem' }}>Create an account to manage inventory smarter.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name Field */}
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor='name' className='input-label' style={{ marginBottom: '0.5rem', display: 'block' }}>Name:</label>
                <Input
                  size='large'
                  placeholder='Enter your name here'
                  {...register('name', { required: true })}
                  id='name'
                  value={nameValue}
                  onChange={(e) => {
                    const event = {
                      target: {
                        name: 'name',
                        value: e.target.value,
                      },
                    };
                    register('name').onChange?.(event);
                  }}
                  status={errors['name'] ? 'error' : ''}
                  style={{
                    borderRadius: '9px',
                    borderColor: errors['name'] ? '#ef4444' : '#4F0341',
                  }}
                  className={errors['name'] ? 'input-field-error' : ''}
                />
                {errors['name'] && <span className='field-error'>Name is required</span>}
              </div>

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
              <div style={{ marginBottom: '1.5rem' }}>
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

              {/* Confirm Password Field */}
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor='confirmPassword' className='input-label' style={{ marginBottom: '0.5rem', display: 'block' }}>Confirm Password:</label>
                <Input.Password
                  size='large'
                  placeholder='Enter your confirm password here'
                  {...register('confirmPassword', { required: true })}
                  id='confirmPassword'
                  value={confirmPasswordValue}
                  onChange={(e) => {
                    const event = {
                      target: {
                        name: 'confirmPassword',
                        value: e.target.value,
                      },
                    };
                    register('confirmPassword').onChange?.(event);
                  }}
                  status={errors['confirmPassword'] ? 'error' : ''}
                  style={{
                    borderRadius: '9px',
                    borderColor: errors['confirmPassword'] ? '#ef4444' : '#4F0341',
                  }}
                  className={errors['confirmPassword'] ? 'input-field-error' : ''}
                />
                {errors['confirmPassword'] && (
                  <span className='field-error'>Confirm Password is required</span>
                )}
              </div>

              {/* Login Link */}
              <p className='auth-inline-note' style={{ marginBottom: '1.5rem' }}>
                Already have an account? <Link className='muted-link' to='/login'>Login Here</Link>
              </p>

              {/* Register Button */}
              <Flex justify='center' style={{ marginBottom: '1rem' }}>
                <Button
                  htmlType='submit'
                  type='primary'
                  className='btn-primary-purple'
                  loading={isLoading}
                  disabled={isLoading}
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
                  {isLoading ? 'Registering...' : 'Register'}
                </Button>
              </Flex>
            </form>
          </Flex>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={registerBanner} alt='Register' style={{ width: '100%', maxWidth: 450, height: 'auto', objectFit: 'contain' }} />
        </Col>
      </Row>
    </Flex>
  );
};

export default RegisterPage;
