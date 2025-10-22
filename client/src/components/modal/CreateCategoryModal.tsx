import { Button, Flex, Modal } from 'antd';
import { useCreateCategoryMutation } from '../../redux/features/management/categoryApi';
import toastMessage from '../../lib/toastMessage';
import { SpinnerIcon } from '@phosphor-icons/react';
import { useState } from 'react';

interface CreateCategoryModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCategoryModal = ({ openModal, setOpenModal }: CreateCategoryModalProps) => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [category, setCategory] = useState('');

  const onSubmit = async () => {
    try {
      const res = await createCategory({ name: category }).unwrap();
      if (res.statusCode === 201) {
        setCategory('');
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
        title={<span style={{color:'#4F0341', fontWeight:900}}>Create New Category!</span>}
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
          <label className='label'>Category Name</label>
          <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='input-field'
            placeholder='Category Name'
          />
          <Flex justify='center' style={{ margin: '1rem' }}>
            <Button key='submit' type='primary' className='btn-primary-purple' onClick={onSubmit} disabled={isLoading}>
              {isLoading && <SpinnerIcon className='spin' weight='bold' />}
              Create Category
            </Button>
          </Flex>
        </div>
      </Modal>
    </>
  );
};

export default CreateCategoryModal;


