import { Button, Col, Flex, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import toastMessage from '../lib/toastMessage';
import { useAppDispatch } from '../redux/hooks';
import { addLoan } from '../redux/services/loans.slice';

const AddLoanDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      date: '',
      amount: '',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      dispatch(
        addLoan({
          name: data.name,
          phone: data.phone,
          date: data.date,
          amount: Number(data.amount),
          status: 'PENDING',
        })
      );
      toastMessage({ icon: 'success', text: 'Loan details saved' });
      reset({ name: '', phone: '', date: '', amount: '' });
    } catch (error: any) {
      toastMessage({ icon: 'error', text: 'Failed to save loan details' });
    }
  };

  return (
    <>
      <div style={{ padding: '0 clamp(0.5rem, 2vw, 1rem)', marginBottom: '.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#4F0341', fontWeight: 900, fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', letterSpacing: '.04em', textTransform: 'uppercase', margin: 0 }}>Add Loan Details</h1>
        <Button type='default' onClick={() => navigate(-1)} className='btn-go-back' style={{ borderRadius: '9999px', fontWeight: 800 }}>
          <ArrowLeftOutlined /> Go Back
        </Button>
      </div>

      <Row gutter={30}>
        <Col xs={{ span: 24 }} lg={{ span: 14 }} style={{ display: 'flex' }}>
          <Flex vertical style={{ width: '100%', padding: '1rem 2rem', border: 'none', borderRadius: '1rem', background: 'transparent', boxShadow: 'none' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomInput name='name' errors={errors} label='Name' register={register} required={true} />
              <CustomInput name='phone' errors={errors} label='Phone Number' register={register} required={true} type='tel' />
              <CustomInput name='date' errors={errors} label='Date' register={register} required={true} type='date' />
              <CustomInput name='amount' errors={errors} label='Amount' register={register} required={true} type='number' min={0} />



              <Flex justify='center' style={{ marginTop: '1rem' }}>
                <Button htmlType='submit' type='primary' className='btn-primary-purple' style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                  Save
                </Button>
              </Flex>
            </form>
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default AddLoanDetails;


