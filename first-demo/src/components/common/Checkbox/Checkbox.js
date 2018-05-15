import React from 'react';
import styles from './Checkbox.css';
import {connect} from 'dva';

import { Checkbox,Button,Row, Col} from 'antd';
const CheckboxGroup = Checkbox.Group;

function onChangeCheckbox(e) {
  console.log(`checked = ${e.target.checked}`);
}

function onChangeCheckboxGroup(checkedValues) {
  console.log('checked = ', checkedValues);
}

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false },
];


class Index extends React.Component{

  state = {
    checked: true,
    disabled: false,
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  };

  onChange1 = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
  }
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }

  toggleChecked = () => {
    this.setState({ checked: !this.state.checked });
  }
  toggleDisable = () => {
    this.setState({ disabled: !this.state.disabled });
  }
  onChange = (e) => {
    console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked,
    });
  }

  render (){

    const label = `${this.state.checked ? 'Checked' : 'Unchecked'}-${this.state.disabled ? 'Disabled' : 'Enabled'}`;
    
    return (
      <div>
      1. 简单的 checkbox。
      <Checkbox onChange={onChangeCheckbox}>Checkbox</Checkbox>

      <br />

      2. 不可用
      checkbox 不可用
      <div>
        <Checkbox defaultChecked={false} disabled />
        <br />
        <Checkbox defaultChecked disabled />
      </div>
      
      <br/>
      3. 受控的 Checkbox
      联动 checkbox。
      <div>
        <p style={{ marginBottom: '20px' }}>
          <Checkbox
            checked={this.state.checked}
            disabled={this.state.disabled}
            onChange={this.onChange}
          >
            {label}
          </Checkbox>
        </p>
        <p>
          <Button
            type="primary"
            size="small"
            onClick={this.toggleChecked}
          >
            {!this.state.checked ? 'Check' : 'Uncheck'}
          </Button>
          <Button
            style={{ marginLeft: '10px' }}
            type="primary"
            size="small"
            onClick={this.toggleDisable}
          >
            {!this.state.disabled ? 'Disable' : 'Enable'}
          </Button>
        </p>
      </div>

      <br />
      4. Checkbox 组
      方便的从数组生成 Checkbox 组。
      <div>
        <CheckboxGroup options={plainOptions} defaultValue={['Apple']} onChange={onChangeCheckboxGroup} />
        <br /><br />
        <CheckboxGroup options={options} defaultValue={['Pear']} onChange={onChangeCheckboxGroup} />
        <br /><br />
        <CheckboxGroup options={optionsWithDisabled} disabled defaultValue={['Apple']} onChange={onChangeCheckboxGroup} />
      </div>
     
      <br />
      5.全选
      在实现全选效果时，你可能会用到 indeterminate 属性。
      <div>
        <div style={{ borderBottom: '1px solid #E9E9E9' }}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            Check all
          </Checkbox>
        </div>
        <br />
        <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange1} />
      </div>

      <br />
      6. 布局
      Checkbox.Group 内嵌 Checkbox 并与 Grid 组件一起使用，可以实现灵活的布局。
      <Checkbox.Group style={{ width: '100%' }} onChange={onChangeCheckboxGroup}>
        <Row>
          <Col span={8}><Checkbox value="A">A</Checkbox></Col>
          <Col span={8}><Checkbox value="B">B</Checkbox></Col>
          <Col span={8}><Checkbox value="C">C</Checkbox></Col>
          <Col span={8}><Checkbox value="D">D</Checkbox></Col>
          <Col span={8}><Checkbox value="E">E</Checkbox></Col>
        </Row>
      </Checkbox.Group>
      </div>
    )
  }
}

export default connect()(Index);