import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Flex } from 'antd';
import Loader from '../Loader';
import { useYearlySaleQuery } from '../../redux/features/management/saleApi';

const YearlyChart = () => {
  const { data: yearlyData, isLoading } = useYearlySaleQuery(undefined);

  if (isLoading)
    return (
      <Flex>
        <Loader />
      </Flex>
    );

  const data = yearlyData?.data.map(
    (item: { year: number; totalProfit?: number; totalQuantity: number; totalBill?: number }) => ({
      name: `${item.year}`,
      profit: item.totalProfit ?? 0,
      quantity: item.totalQuantity,
      sale: item.totalBill ?? 0,
    })
  );

  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray='3 3' stroke='#e0e0e0' />
        <XAxis dataKey='name' stroke='#666' />
        <YAxis stroke='#666' />
        <Tooltip 
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #4F0341', borderRadius: '8px' }}
          cursor={{ fill: 'rgba(79, 3, 65, 0.1)' }}
        />
        <Legend />
        <Area 
          name='Profit' 
          type='monotone' 
          dataKey='profit' 
          stroke='#4F0341' 
          fill='rgba(79, 3, 65, 0.3)'
          strokeWidth={2}
        />
        <Area 
          name='Sale' 
          type='monotone' 
          dataKey='sale' 
          stroke='#a855f7' 
          fill='rgba(168, 85, 247, 0.2)'
          strokeWidth={2}
        />
        <Area 
          name='Quantity' 
          type='monotone' 
          dataKey='quantity' 
          stroke='#8B5F9C' 
          fill='rgba(139, 95, 156, 0.2)'
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default YearlyChart;


