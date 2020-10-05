import React from 'react';
import { Select as AntSelect } from 'antd';
import styled from 'styled-components'

const { Option } = AntSelect;

const Label = styled.p`
  margin-bottom: 4px;
  font-weight: bold;
`

const Select = ({ options, onSelect, placeholder, label }) => {
  const onChange = (id) => {
    console.log(`selected ${id}`);
    onSelect(id);
  }
  
  return (
    <div>
      {label && <Label>{label}</Label>}
      <AntSelect
        allowClear
        showSearch
        style={{ width: '100%' }}
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options.map(({ id, name }) => {
          return <Option key={id} value={id}>{ name }</Option>
        })}
      </AntSelect>
    </div>
  )
}

export default Select