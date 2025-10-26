import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row } from 'antd';
import userProPic from '../assets/User.png';
import CustomInput from '../components/CustomInput';
import { useForm } from 'react-hook-form';
import { profileInputFields } from '../constant/profile';
import { useGetSelfProfileQuery, useUpdateProfileMutation } from '../redux/features/authApi';
import Loader from '../components/Loader';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { config } from '../utils/config';

const EditProfilePage = () => {
  const { data, isLoading } = useGetSelfProfileQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const toastId = toast.loading('Uploading Image...');

    const image = e.target.files?.[0] as any;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', config.VITE_CLOUDINARY_UPLOAD_PRESET as string);
    formData.append('cloud_name', config.VITE_CLOUDINARY_CLOUD_NAME as string);
    formData.append('folder', 'inventory');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${config.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const res = await response.json();

      if (res.secure_url) {
        const imgUploadRes = await updateProfile({ avatar: res.secure_url }).unwrap();

        if (imgUploadRes.success) {
          toast.success('Profile updated successfully', { id: toastId });
        }
        toast.success('Image Uploaded Successfully, now save update!', { id: toastId });
      } else {
        toast.error('Failed to Upload Image', { id: toastId });
      }
    } catch (error) {
      toast.error('Failed to Upload Image', { id: toastId });
    }
  };

  return (
    <>
      <Flex vertical style={{ gap: '2rem', paddingBottom: '2rem', padding: '0 clamp(0.5rem, 2vw, 1rem)' }}>
        {/* Header with Back Button */}
        <Flex justify='space-between' align='center'>
          <h1 style={{ 
            color: '#4F0341', 
            fontWeight: 900, 
            fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', 
            letterSpacing: '.04em', 
            textTransform: 'uppercase',
            margin: 0
          }}>
            Edit Profile
          </h1>
          <Button 
            type='default' 
            onClick={() => navigate('/profile')}
          className='btn-go-back'
          style={{ borderRadius: '9999px', fontWeight: 800 }}
          >
            <ArrowLeftOutlined /> Go Back
          </Button>
        </Flex>

        {/* Main Card */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '1.25rem',
          overflow: 'hidden'
        }}>
          
          {/* Avatar Section */}
          <div style={{
            padding: 'clamp(1.5rem, 5vw, 2.5rem)',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <Flex
              justify='center'
              style={{
                width: 'clamp(120px, 30vw, 160px)',
                height: 'clamp(120px, 30vw, 160px)',
                border: '3px solid #4F0341',
                padding: '0',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
              }}
            >
              <img
                src={data?.data?.avatar || userProPic}
                alt='user'
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            </Flex>
            <Flex style={{ flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <h2 style={{ 
                color: '#4F0341', 
                fontWeight: 900, 
                fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
                margin: 0
              }}>
                Change Profile Picture
              </h2>
              <input
                type='file'
                name='avatar'
                id='avatar'
                placeholder='Change Profile Picture'
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept='image/*'
              />
              <label
                htmlFor='avatar'
                style={{
                  background: 'linear-gradient(135deg, #4F0341 0%, #6d1b5b 100%)',
                  color: '#fff',
                  padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center',
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  fontWeight: 800,
                  letterSpacing: '.02em',
                  transition: 'all 200ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 18px rgba(79, 3, 65, 0.22)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <UploadOutlined />
                Upload Image
              </label>
            </Flex>
          </div>

          {/* Form Section */}
          <div style={{ padding: 'clamp(1rem, 5vw, 2rem)' }}>
            <EditProfileForm data={data?.data} />
          </div>
        </div>
      </Flex>
    </>
  );
};

export default EditProfilePage;

const EditProfileForm = ({ data }: { data: any }) => {
  const navigate = useNavigate();
  const [updateProfile] = useUpdateProfileMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: data });

  const onSubmit = async (formData: any) => {
    delete formData._id;
    delete formData.createdAt;
    delete formData.updatedAt;
    delete formData.__v;

    for (const key in formData) {
      if (formData[key] === '' || formData[key] === undefined || formData[key] === null || !formData[key]) {
        delete formData[key];
      }
    }

    const toastId = toast.loading('Updating profile...');
    try {
      const res = await updateProfile(formData).unwrap();

      if (res.success) {
        toast.success('Profile updated successfully', { id: toastId });
        navigate('/profile');
      }
    } catch (error) {
      toast.error('Failed to update profile', { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {profileInputFields.map((input) => (
          <CustomInput
            key={input.id}
            name={input.name}
            errors={errors}
            label={input.label}
            register={register}
            required={false}
          />
        ))}
      </div>

      <Flex justify='center' gap='1rem' wrap='wrap'>
        <Button
          htmlType='submit'
          type='primary'
          className='btn-primary-purple'
          style={{ 
            textTransform: 'uppercase', 
            fontWeight: 'bold',
            letterSpacing: '.02em',
            borderRadius: '9999px',
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)'
          }}
        >
          Update Profile
        </Button>
        <Button
          onClick={() => navigate('/profile')}
          className='btn-cancel'
          style={{ 
            borderRadius: '9999px',
            fontWeight: 800,
            letterSpacing: '.02em',
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)'
          }}
        >
          Cancel
        </Button>
      </Flex>
    </form>
  );
};
