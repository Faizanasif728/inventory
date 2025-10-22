import { Button, Flex, Modal } from 'antd';
import { useCreateBrandMutation } from '../../redux/features/management/brandApi';
import toastMessage from '../../lib/toastMessage';
import { SpinnerIcon } from '@phosphor-icons/react';
import { useState } from 'react';

interface CreateBrandModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBrandModal = ({ openModal, setOpenModal }: CreateBrandModalProps) => {
  const [createBrand, { isLoading }] = useCreateBrandMutation();
  const [brand, setBrand] = useState('');

  const onSubmit = async () => {
    try {
      const res = await createBrand({ name: brand }).unwrap();
      if (res.statusCode === 201) {
        setBrand('');
        toastMessage({ icon: 'success', text: res.message });
        setOpenModal(false);
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <>
      <Modal
        title={<span style={{color:'#4F0341', fontWeight:900}}>Create New Brand!</span>}
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={[
          <Button key='back' onClick={() => setOpenModal(false)}>
            Close
          </Button>,
        ]}
      >
        <div>
          <label className='label'>Brand Name</label>
          <input
            type='text'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className='input-field'
            placeholder='Brand Name'
          />
          <Flex justify='center' style={{ margin: '1rem' }}>
            <Button key='submit' type='primary' className='btn-primary-purple' onClick={onSubmit} disabled={isLoading}>
              {isLoading && <SpinnerIcon className='spin' weight='bold' />}
              Create Brand
            </Button>
          </Flex>
        </div>
      </Modal>
    </>
  );
};

export default CreateBrandModal;


