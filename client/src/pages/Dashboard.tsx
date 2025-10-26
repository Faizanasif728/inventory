import { Button, Col, Row } from 'antd';
import MonthlyChart from '../components/Charts/MonthlyChart';
import Loader from '../components/Loader';
import { useCountProductsQuery } from '../redux/features/management/productApi';
import { useYearlySaleQuery } from '../redux/features/management/saleApi';
import { useYearlyExpenseQuery, useTotalPurchasedQuantityQuery } from '../redux/features/management/purchaseApi';
import DailyChart from '../components/Charts/DailyChart';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { data: products, isLoading } = useCountProductsQuery(undefined);
  const { data: yearlyData, isLoading: isLoading1 } = useYearlySaleQuery(undefined);
  const { data: yearlyExpense } = useYearlyExpenseQuery(undefined);
  const { data: purchasedTotal } = useTotalPurchasedQuantityQuery();

  const navigate = useNavigate();
  if (isLoading && isLoading1) return <Loader />;
  else
    return (
      <>
        <div style={{ padding: '0 clamp(0.5rem, 2vw, 1rem)', marginBottom: '.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ color: '#4F0341', fontWeight: 900, fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', letterSpacing: '.04em', textTransform: 'uppercase', margin: 0 }}>Dashboard</h1>
          <Button type='default' onClick={() => navigate(-1)} className='btn-go-back' style={{ borderRadius: '9999px', fontWeight: 800 }}>
            <ArrowLeftOutlined /> Go Back
          </Button>
        </div>
        <Row style={{ paddingRight: '1rem' }}>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: '.5rem' }}>
            <div className='number-card'>
              <h3>Stock left</h3>
              <h1>{products?.data?.totalQuantity || 0}</h1>
            </div>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: '.5rem' }}>
            <div className='number-card'>
              <h3>Total Item Sell </h3>
              <h1>
                {yearlyData?.data.reduce(
                  (acc: number, cur: { totalQuantity: number }) => (acc += cur.totalQuantity),
                  0
                )}
              </h1>
            </div>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: '.5rem' }}>
            <div className='number-card'>
              <h3>Total Profit</h3>
              <h1>
                Rs.{' '}
                {yearlyData?.data.reduce(
                  (acc: number, cur: { totalProfit?: number }) => (acc += (cur.totalProfit ?? 0)),
                  0
                )}
              </h1>
            </div>
          </Col>
        </Row>
        <Row style={{ paddingRight: '1rem' }}>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: '.5rem' }}>
            <div className='number-card'>
              <h3>Total Bill</h3>
              <h1>
                Rs.{' '}
                {yearlyData?.data.reduce(
                  (acc: number, cur: { totalBill?: number }) => (acc += (cur.totalBill ?? 0)),
                  0
                )}
              </h1>
            </div>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: '.5rem' }}>
            <div className='number-card'>
              <h3>Total Expense</h3>
              <h1>
                Rs.{' '}
                {yearlyExpense?.data?.reduce(
                  (acc: number, cur: { totalExpense?: number }) => (acc += (cur.totalExpense ?? 0)),
                  0
                )}
              </h1>
            </div>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: '.5rem' }}>
            <div className='number-card'>
              <h3>Purchased Stock</h3>
              <h1>{purchasedTotal?.data?.totalQuantity ?? 0}</h1>
            </div>
          </Col>
        </Row>
        <div className='panel-card'>
          <h1 className='panel-title'>Daily Sale and Profit</h1>
          <DailyChart />
        </div>
        <div className='panel-card'>
          <h1 className='panel-title'>Monthly Profit</h1>
          <MonthlyChart />
        </div>
      </>
    );
};

export default Dashboard;
