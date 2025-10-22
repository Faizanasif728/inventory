import { SpinnerIcon, Eye, EyeSlash } from '@phosphor-icons/react';
import { Button, Flex, Row, Col } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toastMessage from '../../lib/toastMessage';
import { useRegisterMutation } from '../../redux/features/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/services/authSlice';
import decodeToken from '../../utils/decodeToken';
import registerBanner from '../../assets/iphone-image.png';
import { useState } from 'react';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userRegistration, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await userRegistration(data).unwrap();

      if (data.password !== data.confirmPassword) {
        toastMessage({ icon: 'error', text: 'Password and confirm password must be same!' });
        return;
      }
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
              width: '420px',
              padding: '2.5rem',
            }}
          >
            <h1 className='auth-title'>
              Register
            </h1>
            <p className='auth-subtext'>Create an account to manage inventory smarter.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='label-row'>
                <label htmlFor='name' className='input-label'>Name:</label>
              </div>
              <input
                type='text'
                {...register('name', { required: true })}
                placeholder='Enter your name here'
                id='name'
                className={`input-field ${errors['name'] ? 'input-field-error' : ''}`}
              />
              {errors['name'] && <span className='field-error'>Name is required</span>}
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
                  {...register('password', { required: true })}
                  id='password'
                  className={`input-field ${errors['password'] ? 'input-field-error' : ''}`}
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
              <div className='label-row'>
                <label htmlFor='confirmPassword' className='input-label'>Confirm Password:</label>
              </div>
              <div className='input-with-icon'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Enter your confirm password here'
                  {...register('confirmPassword', { required: true })}
                  id='confirmPassword'
                  className={`input-field ${errors['confirmPassword'] ? 'input-field-error' : ''}`}
                />
                <button
                  type='button'
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  className='icon-btn'
                  onClick={() => setShowConfirmPassword((v) => !v)}
                >
                  {showConfirmPassword ? <EyeSlash size={20} weight='bold' /> : <Eye size={20} weight='bold' />}
                </button>
              </div>
              {errors['confirmPassword'] && (
                <span className='field-error'>Confirm Password is required</span>
              )}
              <p className='auth-inline-note'>
                Already have an account? <Link className='muted-link' to='/login'>Login Here</Link>
              </p>
              <Flex justify='center'>
                <Button
                  htmlType='submit'
                  type='primary'
                  className='btn-primary-purple'
                  style={{ textTransform: 'uppercase', fontWeight: 'bold', width: '100%' }}
                >
                  {isLoading && <SpinnerIcon className='spin' weight='bold' />}
                  Register
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
