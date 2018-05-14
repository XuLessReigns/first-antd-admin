import React from 'react';
import styles from './Cascader.css';
import {connect} from 'dva';

import { Cascader,Input ,Button ,Icon} from 'antd';

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }, {
      value: 'xiasha',
      label: 'Xia Sha',
      disabled: true,
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  disabled: true,
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
      code: 453400,
    }],
  }],
}];

const options1 = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  isLeaf: false,
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  isLeaf: false,
}];

const options2 = [{
  code: 'zhejiang',
  name: 'Zhejiang',
  items: [{
    code: 'hangzhou',
    name: 'Hangzhou',
    items: [{
      code: 'xihu',
      name: 'West Lake',
    }],
  }],
}, {
  code: 'jiangsu',
  name: 'Jiangsu',
  items: [{
    code: 'nanjing',
    name: 'Nanjing',
    items: [{
      code: 'zhonghuamen',
      name: 'Zhong Hua Men',
    }],
  }],
}];

const obj = { label: 'name', value: 'code', children: 'items' };

function onChange(value) {
  console.log(value);
}

// Just show the latest item.
function displayRender(label) {
  return label[label.length - 1];
}

function handleAreaClick(e, label, option) {
  e.stopPropagation();
  console.log('clicked', label, option);
}

const displayRender1 = (labels, selectedOptions) => labels.map((label, i) => {
  const option = selectedOptions[i];
  if (i === labels.length - 1) {
    return (
      <span key={option.value}>
        {label} (<a onClick={e => handleAreaClick(e, label, option)}>{option.code}</a>)
      </span>
    );
  }
  return <span key={option.value}>{label} / </span>;
});

function filter(inputValue, path) {
  return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
}

class Index extends React.Component{

  state = {
    text: 'Unselect',
    options1
  };

  onChange = (value, selectedOptions) => {
    console.log(value,selectedOptions)
    this.setState({
      text: selectedOptions.map(o => o.label).join(', '),
    });
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    console.log(selectedOptions,targetOption)

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [{
        label: `${targetOption.label} Dynamic 1`,
        value: 'dynamic1',
      }, {
        label: `${targetOption.label} Dynamic 2`,
        value: 'dynamic2',
      }];
      this.setState({
        options1: [...this.state.options1],
      });
    }, 1000);
  }

  render (){
    
    return (
      <div>
      1. 基本省市区级联。
      <Cascader options={options} onChange={onChange} placeholder="Please select"/>

      <br />

      2. 默认值通过数组的方式指定。defaultValue
      <Cascader options={options} onChange={onChange} placeholder="Please select" defaultValue={["jiangsu", "nanjing", "zhonghuamen"]}/>
      
      <br/>
      3. 可以自定义显示
      切换按钮和结果分开。
      <span>
        {this.state.text}
        &nbsp;
        <Cascader options={options} onChange={this.onChange}>
          <a href="#">Change city</a>
        </Cascader>
      </span>

      <br />
      4. 移入展开
      通过移入展开下级菜单，点击完成选择。
      <Cascader
        options={options}
        expandTrigger="hover"
        displayRender={displayRender}
        onChange={onChange}
      />
     
      <br />
      5.禁用选项
      通过指定 options 里的 disabled 字段。
     
      <br />
      6. 选择即改变
      这种交互允许只选中父级选项。
      <Cascader options={options} onChange={onChange} changeOnSelect />

      <br/>
      7.大小
      不同大小的级联选择器。
      <Cascader size="large" options={options} onChange={onChange} /><br /><br />
      <Cascader options={options} onChange={onChange} /><br /><br />
      <Cascader size="small" options={options} onChange={onChange} /><br /><br />

      <br/>
      8.自定义已选项
      例如给最后一项加上邮编链接。
      <Cascader
        options={options}
        defaultValue={['zhejiang', 'hangzhou', 'xihu']}
        displayRender={displayRender1}
        style={{ width: '100%' }}
      />

      <br/>
      9.搜索
      可以直接搜索选项并选择。
      Cascader[showSearch] 暂不支持服务端搜索，更多信息见 #5547
      <Cascader
        options={options}
        onChange={onChange}
        placeholder="Please select"
        showSearch={{ filter }}
      />
      <br/>
      10.动态加载选项
      使用 loadData 实现动态加载选项。
      注意：loadData 与 showSearch 无法一起使用。
      <Cascader
        options={this.state.options1}
        loadData={this.loadData}
        onChange={this.onChange}
        changeOnSelect
      />

      <br/>
      10.自定义字段名。
      filedNames 这个属性求大神告知怎么用
      {/* filedNames 这个属性貌似暂时不支持 */}
      {/* <Cascader filedNames={{ label: 'name', value: 'code', children: 'items' }} options={options2} onChange={onChange} placeholder="Please select" /> */}
      
      </div>
    )
  }
}

export default connect()(Index);