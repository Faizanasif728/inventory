import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => (
  <Flex
    gap='small'
    justify='center'
    align='center'
    style={{
      height: 'calc(100vh - 10rem)',
    }}
  >
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#4F0341' }} spin />} />
  </Flex>
);

export default Loader;
