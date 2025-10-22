import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Flex, Modal, Pagination, Table } from 'antd';
import { useState } from 'react';
import toastMessage from '../../lib/toastMessage';
import SearchInput from '../../components/SearchInput';
import { useDeleteBrandMutation, useGetAllBrandsQuery } from '../../redux/features/management/brandApi';
import CreateBrandModal from '../../components/modal/CreateBrandModal';

type TableBrand = {
  key: string;
  name: string;
};

const BrandManagementPage = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: '',
  });

  const { data, isFetching } = useGetAllBrandsQuery(query);

  const onChange: PaginationProps['onChange'] = (page) => {
    setQuery((prev) => ({ ...prev, page: page }));
  };

  const tableData: TableBrand[] = data?.data?.map((brand: any) => ({
    key: brand._id,
    name: brand.name,
  }));

  const columns: TableColumnsType<TableBrand> = [
    {
      title: 'Brand Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      key: 'x',
      align: 'center',
      render: (item: TableBrand) => {
        return (
          <div style={{ display: 'flex' }}>
            <DeleteModal id={item.key} />
          </div>
        );
      },
      width: '1%',
    },
  ];

  const [isCreateBrandOpen, setIsCreateBrandOpen] = useState(false);

  return (
    <>
      <Flex justify='space-between' align='center' style={{ margin: '5px' }}>
        <Button
          type='primary'
          onClick={() => setIsCreateBrandOpen(true)}
          className='btn-primary-purple'
          style={{ fontWeight: 700 }}
        >
          <PlusOutlined /> Create Brand
        </Button>
        <div style={{minWidth:'320px'}}>
          <SearchInput setQuery={setQuery} placeholder='Search Brand...' />
        </div>
      </Flex>
      <Table
        size='small'
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        style={{background:'transparent'}}
      />
      <Flex justify='center' style={{ marginTop: '1rem' }}>
        <Pagination
          className='purple-pagination'
          current={query.page}
          onChange={onChange}
          defaultPageSize={query.limit}
          total={data?.meta?.total}
        />
      </Flex>
      <CreateBrandModal openModal={isCreateBrandOpen} setOpenModal={setIsCreateBrandOpen} />
    </>
  );
};

const DeleteModal = ({ id }: { id: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteBrand] = useDeleteBrandMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteBrand(id).unwrap();
      if (res.statusCode === 200) {
        toastMessage({ icon: 'success', text: res.message });
        handleCancel();
      }
    } catch (error: any) {
      handleCancel();
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        type='primary'
        className='table-btn-small action-btn-small btn-delete'
      >
        <DeleteFilled />
      </Button>
      <Modal title='Delete Brand' open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Are you sure you want to delete this brand?</h2>
          <h4>You won't be able to revert it.</h4>
          <div
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}
          >
            <Button
              onClick={handleCancel}
              type='primary'
              style={{ backgroundColor: 'lightseagreen' }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(id)}
              type='primary'
              style={{ backgroundColor: 'red' }}
            >
              Yes! Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BrandManagementPage;


