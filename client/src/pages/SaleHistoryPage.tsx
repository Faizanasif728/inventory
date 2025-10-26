import { Button, Col, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import HistoryTable from '../components/tables/HistoryTable';
import {
  useDailySaleQuery,
  useMonthlySaleQuery,
  useWeeklySaleQuery,
  useYearlySaleQuery,
} from '../redux/features/management/saleApi';

const SaleHistoryPage = () => {
  const navigate = useNavigate();
  const { data: yearlyData, isFetching: isYearlyDataFetching } = useYearlySaleQuery(undefined);
  const { data: monthlyData, isFetching: isMonthlyDataFetching } = useMonthlySaleQuery(undefined);
  const { data: dailySale, isFetching: isDailySaleFetching } = useDailySaleQuery(undefined);
  const { data: weeklySale, isFetching: isWeeklySaleFetching } = useWeeklySaleQuery(undefined);

  return (
    <>
      <div style={{ padding: '0 clamp(0.5rem, 2vw, 1rem)', marginBottom: '.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#4F0341', fontWeight: 900, fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', letterSpacing: '.04em', textTransform: 'uppercase', margin: 0 }}>Sale History</h1>
        <Button type='default' onClick={() => navigate(-1)} className='btn-go-back' style={{ borderRadius: '9999px', fontWeight: 800 }}>
          <ArrowLeftOutlined /> Go Back
        </Button>
      </div>
      <Row className='sale-history-grid'>
      <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ padding: '.2rem' }}>
        <div className='sales'>
          <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Yearly Sale</h1>
          <HistoryTable data={yearlyData} isFetching={isYearlyDataFetching} />
        </div>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ padding: '.2rem' }}>
        <div className='sales'>
          <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Monthly Sale</h1>
          <HistoryTable data={monthlyData} isFetching={isMonthlyDataFetching} />
        </div>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ padding: '.2rem' }}>
        <div className='sales'>
          <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Weekly Sale</h1>
          <HistoryTable data={weeklySale} isFetching={isWeeklySaleFetching} />
        </div>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ padding: '.2rem' }}>
        <div className='sales'>
          <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Daily Sale</h1>
          <HistoryTable data={dailySale} isFetching={isDailySaleFetching} />
        </div>
      </Col>
      </Row>
    </>
  );
};

export default SaleHistoryPage;
