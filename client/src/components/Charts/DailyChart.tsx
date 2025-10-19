import { Flex } from 'antd';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDailySaleQuery } from '../../redux/features/management/saleApi';
import Loader from '../Loader';
import { months } from '../../utils/generateDate';

export default function DailyChart() {
  const { data: dailyData, isLoading } = useDailySaleQuery(undefined);

  if (isLoading)
    return (
      <Flex>
        <Loader />
      </Flex>
    );

  const data = dailyData?.data.map(
    (item: {
      day: number;
      month: number;
      year: number;
      totalProfit?: number; // mapped in API layer
      totalQuantity: number;
    }) => ({
      name: `${item.day} ${months[item.month - 1]}, ${item.year}`,
      profit: item.totalProfit ?? 0,
      quantity: item.totalQuantity,
    })
  );

  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Area name='Profit' type='monotone' dataKey='profit' stroke='#8884d8' fill='#164863' />
        <Area type='monotone' dataKey='quantity' stroke='#8884d8' fill='#164863' />
      </AreaChart>
    </ResponsiveContainer>
  );
}
