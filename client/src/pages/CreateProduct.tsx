import { Button, Col, Flex, Row, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import CustomInput from '../components/CustomInput';
import toastMessage from '../lib/toastMessage';
import { useGetAllBrandsQuery } from '../redux/features/management/brandApi';
import { useGetAllCategoriesQuery } from '../redux/features/management/categoryApi';
import { useCreateNewProductMutation } from '../redux/features/management/productApi';
import { useGetAllSellerQuery } from '../redux/features/management/sellerApi';
import { ICategory } from '../types/product.types';
import CreateSeller from '../components/product/CreateSeller';
import CreateCategoryModal from '../components/modal/CreateCategoryModal';
import CreateBrandModal from '../components/modal/CreateBrandModal';
import { SpinnerIcon } from '@phosphor-icons/react';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isCreateBrandOpen, setIsCreateBrandOpen] = useState(false);
  const [createNewProduct, { isLoading: isCreatingProduct }] = useCreateNewProductMutation();
  const { data: categories } = useGetAllCategoriesQuery(undefined);
  const { data: sellers } = useGetAllSellerQuery(undefined);
  const { data: brands } = useGetAllBrandsQuery(undefined);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const payload = { ...data };
    payload.price = Number(data.price);
    payload.stock = Number(data.stock);

    if (payload.size === '') {
      delete payload.size;
    }

    try {
      const res = await createNewProduct(payload).unwrap();
      if (res.statusCode === 201) {
        toastMessage({ icon: 'success', text: res.message });
        reset();
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <>
      <div style={{ padding: '0 clamp(0.5rem, 2vw, 1rem)', marginBottom: '.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#4F0341', fontWeight: 900, fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', letterSpacing: '.04em', textTransform: 'uppercase', margin: 0 }}>Add Product</h1>
        <Button type='default' onClick={() => navigate(-1)} className='btn-go-back' style={{ borderRadius: '9999px', fontWeight: 800 }}>
          <ArrowLeftOutlined /> Go Back
        </Button>
      </div>
      <Row gutter={30}>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 14 }}
          style={{
            display: 'flex',
          }}
        >
          <Flex
            vertical
            style={{
              width: '100%',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '1rem',
              background: 'transparent',
              boxShadow: 'none'
            }}
          >
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomInput
                name='name'
                errors={errors}
                label='Name'
                register={register}
                required={true}
              />
              <CustomInput
                errors={errors}
                label='Price'
                type='number'
                name='price'
                register={register}
                min={0}
                required={true}
              />
              <CustomInput
                errors={errors}
                label='Stock'
                type='number'
                name='stock'
                register={register}
                min={0}
                required={true}
              />
              <Row>
                <Col xs={{ span: 23 }} lg={{ span: 6 }}>
                  <label htmlFor='Size' className='label'>
                    Seller
                  </label>
                </Col>
                <Col xs={{ span: 23 }} lg={{ span: 18 }}>
                  <Controller
                    name='seller'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder='Select Seller*'
                        className='filter-select'
                        style={{ width: '100%' }}
                        options={sellers?.data.map((item: ICategory) => ({
                          value: item._id,
                          label: item.name,
                        }))}
                      />
                    )}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs={{ span: 23 }} lg={{ span: 6 }}>
                  <label htmlFor='Size' className='label'>
                    Category
                  </label>
                </Col>
                <Col xs={{ span: 23 }} lg={{ span: 18 }}>
                  <Controller
                    name='category'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder='Select Category*'
                        className='filter-select'
                        style={{ width: '100%' }}
                        options={categories?.data.map((item: ICategory) => ({
                          value: item._id,
                          label: item.name,
                        }))}
                      />
                    )}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs={{ span: 23 }} lg={{ span: 6 }}>
                  <label htmlFor='Size' className='label'>
                    Brand
                  </label>
                </Col>
                <Col xs={{ span: 23 }} lg={{ span: 18 }}>
                  <Controller
                    name='brand'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder='Select brand'
                        className='filter-select'
                        style={{ width: '100%' }}
                        allowClear
                        options={brands?.data.map((item: ICategory) => ({
                          value: item._id,
                          label: item.name,
                        }))}
                      />
                    )}
                  />
                </Col>
              </Row>

              <CustomInput label='Description' name='description' register={register} />

              <Row>
                <Col xs={{ span: 23 }} lg={{ span: 6 }}>
                  <label htmlFor='Size' className='label'>
                    Size
                  </label>
                </Col>
                <Col xs={{ span: 23 }} lg={{ span: 18 }}>
                  <Controller
                    name='size'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder='Select Product Size'
                        className='filter-select'
                        style={{ width: '100%' }}
                        allowClear
                        options={[
                          { value: 'SMALL', label: 'Small' },
                          { value: 'MEDIUM', label: 'Medium' },
                          { value: 'LARGE', label: 'Large' },
                        ]}
                      />
                    )}
                  />
                </Col>
              </Row>
              <Flex justify='center'>
                <Button
                  htmlType='submit'
                  type='primary'
                  disabled={isCreatingProduct}
                  className='btn-primary-purple'
                  style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                >
                  {isCreatingProduct && <SpinnerIcon className='spin' weight='bold' />}
                  Add Product
                </Button>
              </Flex>
            </form>
          </Flex>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 10 }}>
          <Flex
            vertical
            style={{
              width: '100%',
              height: '100%',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '1rem',
              background: 'transparent',
              boxShadow: 'none',
              justifyContent: 'space-around',
            }}
          >
            <CreateSeller />
            <Flex
              vertical
              style={{
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '1rem',
                background: 'transparent',
                boxShadow: 'none',
                marginBottom: '1rem',
              }}
            >
              <h3
                style={{
                  textAlign: 'center',
                  marginBottom: '.6rem',
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  color: '#4F0341',
                }}
              >
                Create New Category
              </h3>
              <Button
                htmlType='button'
                type='primary'
                className='btn-primary-purple'
                style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                onClick={() => setIsCreateCategoryOpen(true)}
              >
                Create Category
              </Button>
            </Flex>
            <CreateCategoryModal
              openModal={isCreateCategoryOpen}
              setOpenModal={setIsCreateCategoryOpen}
            />
            <Flex
              vertical
              style={{
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '1rem',
                background: 'transparent',
                boxShadow: 'none',
              }}
            >
              <h3
                style={{
                  textAlign: 'center',
                  marginBottom: '.6rem',
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  color: '#4F0341',
                }}
              >
                Create New Brand
              </h3>
              <Button
                htmlType='button'
                type='primary'
                className='btn-primary-purple'
                style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                onClick={() => setIsCreateBrandOpen(true)}
              >
                Create Brand
              </Button>
            </Flex>
            <CreateBrandModal openModal={isCreateBrandOpen} setOpenModal={setIsCreateBrandOpen} />
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default CreateProduct;
