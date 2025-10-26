import {Col, Flex, Row, Slider, Select} from 'antd';
import React from 'react';
import {useGetAllCategoriesQuery} from '../../redux/features/management/categoryApi';
import {useGetAllBrandsQuery} from '../../redux/features/management/brandApi';

interface ProductManagementFilterProps {
  query: {name: string; category: string; brand: string; limit: number; stockStatus?: string};
  setQuery: React.Dispatch<
    React.SetStateAction<{name: string; category: string; brand: string; limit: number; stockStatus?: string}>
  >;
}

const ProductManagementFilter = ({query, setQuery}: ProductManagementFilterProps) => {
  const {data: categories} = useGetAllCategoriesQuery(undefined);
  const {data: brands} = useGetAllBrandsQuery(undefined);

  return (
    <Flex className='filter-bar' vertical>
      <Row gutter={[16, 8]} style={{width: '100%'}}>
        <Col xs={{span: 24}} lg={{span: 8}}>
          <label className='filter-label'>Price Range</label>
          <Slider
            range
            step={100}
            max={20000}
            defaultValue={[1000, 5000]}
            onChange={(value) => {
              setQuery((prev) => ({
                ...prev,
                minPrice: value[0],
                maxPrice: value[1],
              }));
            }}
          />
        </Col>
        <Col xs={{span: 24}} lg={{span: 8}}>
          <label className='filter-label'>Search by product name</label>
          <input
            type='text'
            value={query.name}
            className={`input-field`}
            placeholder='Search by Product Name'
            onChange={(e) => setQuery((prev) => ({...prev, name: e.target.value}))}
          />
        </Col>
        <Col xs={{span: 24}} lg={{span: 8}}>
          <label className='filter-label'>Stock Status</label>
          <Select
            className='filter-select'
            allowClear
            placeholder='All Stock'
            value={query.stockStatus || undefined}
            options={[
              { value: 'in', label: 'In Stock' },
              { value: 'low', label: 'Low Stock' },
              { value: 'out', label: 'Out of Stock' },
            ]}
            onChange={(value) => setQuery((prev) => ({ ...prev, stockStatus: value || '' }))}
          />
        </Col>
      </Row>
      <Row gutter={[16, 8]} style={{width: '100%', marginTop: '.25rem'}}>
        <Col xs={{span: 24}} lg={{span: 12}}>
          <label className='filter-label'>Filter by Category</label>
          <Select
            className='filter-select'
            allowClear
            placeholder='Filter by Category'
            value={query.category || undefined}
            options={categories?.data?.map((category: {_id: string; name: string}) => ({
              value: category._id,
              label: category.name,
            }))}
            onChange={(value) => setQuery((prev) => ({ ...prev, category: value || '' }))}
          />
        </Col>
        <Col xs={{span: 24}} lg={{span: 12}}>
          <label className='filter-label'>Filter by Brand</label>
          <Select
            className='filter-select'
            allowClear
            placeholder='Filter by Brand'
            value={query.brand || undefined}
            options={brands?.data?.map((brand: {_id: string; name: string}) => ({
              value: brand._id,
              label: brand.name,
            }))}
            onChange={(value) => setQuery((prev) => ({ ...prev, brand: value || '' }))}
          />
        </Col>
      </Row>
    </Flex>
  );
};

export default ProductManagementFilter;
