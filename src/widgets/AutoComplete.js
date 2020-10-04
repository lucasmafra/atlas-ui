import React, { useState } from 'react';
import { Select } from 'antd';
import styled from 'styled-components'

const { Option } = Select;

const Label = styled.p`
  margin-bottom: 4px;
  font-weight: bold;
`

const AutoComplete = ({ options, onSelect, placeholder, label }) => {
  const onChange = (id) => {
    console.log(`selected ${id}`);
    onSelect(id);
  }
  
  return (
    <div>
      {label && <Label>{label}</Label>}
      <Select
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
      </Select>
    </div>
  )
}

export default AutoComplete