import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useMonthlySaleQuery } from '../../redux/features/management/saleApi';
import { months } from '../../utils/generateDate';
import { Flex } from 'antd';
import Loader from '../Loader';

const MonthlyChart = () => {
  const { data: monthlyData, isLoading } = useMonthlySaleQuery(undefined);

  if (isLoading)
    return (
      <Flex>
        <Loader />
      </Flex>
    );

  const data = monthlyData?.data.map(
    (item: { month: number; year: number; totalProfit?: number }) => ({
      name: `${months[item.month - 1]}, ${item.year}`,
      profit: item.totalProfit ?? 0,
    })
  );

  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray='3 3' stroke='#e0e0e0' />
        <XAxis dataKey='name' stroke='#666' />
        <YAxis stroke='#666' />
        <Tooltip 
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #4F0341', borderRadius: '8px' }}
          cursor={{ fill: 'rgba(79, 3, 65, 0.1)' }}
        />
        <Legend />
        <Bar 
          name='Profit' 
          dataKey='profit' 
          fill='#4F0341'
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyChart;
