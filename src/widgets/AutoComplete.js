import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const AutoComplete = ({ options, onSelect, placeholder }) => {
  const onChange = (id) => {
    console.log(`selected ${id}`);
    onSelect(id);
  }
  
  return (
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
  )
}

export default AutoComplete