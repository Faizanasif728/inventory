import { Button, Flex, Pagination, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteLoan, LoanEntry, updateLoanStatus } from '../redux/services/loans.slice';
import { DeleteFilled } from '@ant-design/icons';

const LoanManagementPage = () => {
  const dispatch = useAppDispatch();
  const loans = useAppSelector((state) => state.loans.items);

  const columns: TableColumnsType<LoanEntry & { key: string }> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', align: 'right' },
    {
      title: 'Return Status',
      dataIndex: 'status',
      key: 'status',
      render: (_: LoanEntry['status'], record: LoanEntry & { key: string }) => (
        <div>
          <Select
            value={record.status}
            className='filter-select'
            style={{ width: 160 }}
            options={[
              { value: 'PENDING', label: 'Pending' },
              { value: 'RECEIVED', label: 'Received' },
            ]}
            onChange={(value) => dispatch(updateLoanStatus({ id: record.id, status: value }))}
          />
          <div style={{ marginTop: '.2rem', fontWeight: 900, color: record.status === 'RECEIVED' ? '#16a34a' : '#ef4444' }}>
            {record.status === 'RECEIVED' ? 'Received' : 'Pending'}
          </div>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_: any, record: LoanEntry & { key: string }) => (
        <Button
          onClick={() => dispatch(deleteLoan(record.id))}
          type='primary'
          className='table-btn-small action-btn-small btn-delete'
        >
          <DeleteFilled />
        </Button>
      ),
    },
  ];

  const dataSource = loans.map((l) => ({ key: l.id, ...l }));

  return (
    <>
      <h1 className='page-title'>Manage Loans</h1>
      <Flex vertical style={{ width: '100%', padding: '1rem 2rem', background: 'transparent', borderRadius: '1rem' }}>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
        <Flex justify='center' style={{ marginTop: '1rem' }}>
          <Pagination className='purple-pagination' current={1} total={dataSource.length} pageSize={10} />
        </Flex>
      </Flex>
    </>
  );
};

export default LoanManagementPage;


