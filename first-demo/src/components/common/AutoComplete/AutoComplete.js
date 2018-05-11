import React from 'react';
import styles from './AutoComplete.css';
import {connect} from 'dva';

import { AutoComplete,Input ,Button ,Icon} from 'antd';

function onSelect(value) {
  console.log('onSelect', value);
}

const Option = AutoComplete.Option;

const { TextArea } = Input;

function onSelect(value) {
  console.log('onSelect', value);
}

const dataSource1 = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

function searchResult(query) {
  return (new Array(getRandomInt(5))).join('.').split('.')
    .map((item, idx) => ({
      query,
      category: `${query}${idx}`,
      count: getRandomInt(200, 100),
    }));
}

function renderOption(item) {
  return (
    <Option key={item.category} text={item.category}>
      {item.query} 在
      <a
        href={`https://s.taobao.com/search?q=${item.query}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.category}
      </a>
      区块中
      <span className="global-search-item-count">约 {item.count} 个结果</span>
    </Option>
  );
}

class Index extends React.Component{

  state = {
    dataSource: [],
    result: [],
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  }

  handleSearch1 = (value) => {
    let result;
    if (!value || value.indexOf('@') >= 0) {
      result = [];
    } else {
      result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    }
    this.setState({ result });
  }

  handleSearch2 = (value) => {
    this.setState({
      dataSource: value ? searchResult(value) : [],
    });
  }

  handleKeyPress = (ev) => {
    console.log('handleKeyPress', ev);
  }

  
  render (){
    const { dataSource } = this.state;

    const { result } = this.state;
    const children = result.map((email) => {
      return <Option key={email}>{email}</Option>;
    });

    return (
      <div>
        1. 基本使用。通过 dataSource 设置自动完成的数据源

        <AutoComplete
          dataSource={dataSource}
          style={{ width: 200 }}
          onSelect={onSelect}
          onSearch={this.handleSearch}
          placeholder="input here"
        />

        <br />

        2. 也可以直接传 AutoComplete.Option 作为 AutoComplete 的 children，而非使用 dataSource。
        <AutoComplete
        style={{ width: 200 }}
        onSearch={this.handleSearch1}
        placeholder="input here"
      >
        {children}
      </AutoComplete>

      <br/>
      3. 自定义输入组件。

      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={this.handleSearch}
      >
        <TextArea
          placeholder="input here"
          className="custom"
          style={{ height: 50 }}
          onKeyPress={this.handleKeyPress}
        />
      </AutoComplete>

      <br />
      4. 不区分大小写的 AutoComplete
      <AutoComplete
        style={{ width: 200 }}
        dataSource={dataSource1}
        placeholder="try to type `b`"
        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />

      <br />
      5. 查询模式: 不确定类目 示例。
      {/* 暂时有点问题 */}
      {/* <div className="global-search-wrapper" style={{ width: 300 }}>
        <AutoComplete
          className="global-search"
          size="large"
          style={{ width: '100%' }}
          dataSource={dataSource.map(renderOption)}
          onSelect={onSelect}
          onSearch={this.handleSearch}
          placeholder="input here"
          optionLabelProp="text"
        >
          <Input
            suffix={(
              <Button className="search-btn" size="large" type="primary">
                <Icon type="search" />
              </Button>
            )}
          />
        </AutoComplete>
      </div> */}

      </div>
    )
  }
}

export default connect()(Index);