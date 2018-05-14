import React from 'react';
import styles from './AutoComplete.css';
import {connect} from 'dva';

import { AutoComplete,Input ,Button ,Icon} from 'antd';

function onSelect(value) {
  console.log('onSelect', value);
}

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

const { TextArea } = Input;

const dataSource1 = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

const dataSource2 = [{
  title: '话题',
  children: [{
    title: 'AntDesign',
    count: 10000,
  }, {
    title: 'AntDesign UI',
    count: 10600,
  }],
}, {
  title: '问题',
  children: [{
    title: 'AntDesign UI 有多好',
    count: 60100,
  }, {
    title: 'AntDesign 是啥',
    count: 30010,
  }],
}, {
  title: '文章',
  children: [{
    title: 'AntDesign 是一个设计语言',
    count: 100000,
  }],
}];

function renderTitle(title) {
  return (
    <span>
      {title}
      <a
        style={{ float: 'right' }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >更多
      </a>
    </span>
  );
}

const options = dataSource2.map(group => (
  <OptGroup
    key={group.title}
    label={renderTitle(group.title)}
  >
    {group.children.map(opt => (
      <Option key={opt.title} value={opt.title}>
        {opt.title}
        <span className="certain-search-item-count">{opt.count} 人 关注</span>
      </Option>
    ))}
  </OptGroup>
)).concat([
  <Option disabled key="all" className="show-all">
    <a
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      查看所有结果
    </a>
  </Option>,
]);

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
    dataSource4: [],
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
      dataSource4: value ? searchResult(value) : [],
    });
  }

  handleKeyPress = (ev) => {
    console.log('handleKeyPress', ev);
  }

  
  render (){
    const { dataSource,dataSource4 } = this.state;
    console.log(dataSource,dataSource4)

    const { result } = this.state;
    const children = result.map((email) => {
      return <Option key={email}>{email}</Option>;
    });
    
    const dataSource3 = ['12345', '23456', '34567'];

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
      5.查询模式: 确定类目 示例。
      <div className="certain-category-search-wrapper" style={{ width: 250 }}>
        <AutoComplete
          className="certain-category-search"
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: 300 }}
          size="large"
          style={{ width: '100%' }}
          dataSource={options}
          placeholder="input here"
          optionLabelProp="value"
        >
          <Input suffix={<Icon type="search" className="certain-category-icon" />} />
        </AutoComplete>
      </div>
      <AutoComplete dataSource={dataSource3} />

      <br />
      6. 查询模式: 不确定类目 示例。
      <div className="global-search-wrapper" style={{ width: 300 }}>
        <AutoComplete
          className="global-search"
          size="large"
          style={{ width: '100%' }}
          dataSource={dataSource4.map(renderOption)}
          onSelect={onSelect}
          onSearch={this.handleSearch2}
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
      </div>

      </div>
    )
  }
}

export default connect()(Index);