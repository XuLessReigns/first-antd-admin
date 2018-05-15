import React from 'react';
import styles from './DatePicker.css';
import {connect} from 'dva';

import {DatePicker,Radio} from 'antd';
import moment from 'moment';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

function onChange(date, dateString) {
  console.log(date, dateString);
}

function onChange1(dates, dateStrings) {
  console.log('From: ', dates[0], ', to: ', dates[1]);
  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

function onOk(value) {
  console.log('onOk: ', value);
}

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // Can not select days before today and today
  // console.log(current,moment().endOf('day')+'**********************')
  return current && current < moment().endOf('day');
}

function disabledDateTime() {
  console.log(range(0, 24).splice(4, 20),range(30, 60))
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}

function disabledRangeTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
}

class Index extends React.Component{

  state = {
    size: 'default',
    startValue: null,
    endValue: null,
    endOpen: false,
    mode: 'time',
    mode1: ['month', 'month'],
    value: [],
  };

  handleOpenChange = (open) => {
    console.log(open)
    if (open) {
      this.setState({ mode: 'time' });
    }
  }

  handlePanelChange = (value, mode) => {
    console.log(value,mode)
    this.setState({ mode });
  }

  handlePanelChange1 = (value, mode) => {
    console.log(value,mode)
    this.setState({
      value,
      mode1: [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1],
      ],
    });
  }

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }


  render(){

    const { size ,startValue, endValue, endOpen,mode1,value} = this.state;
    return (
      <div>
        1.基本
        最简单的用法，在浮层中可以选择或者输入日期。
        <div>
          <DatePicker onChange={onChange} />
          <br />
          <MonthPicker onChange={onChange} placeholder="Select month" />
          <br />
          <RangePicker onChange={onChange} />
          <br />
          <WeekPicker onChange={onChange} placeholder="Select week" />
        </div>

        <br/>
        2.日期格式
        使用 format 属性，可以自定义日期显示格式。
        <div>
          <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
          <br />
          <MonthPicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} />
          <br />
          <RangePicker
            defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
            format={dateFormat}
          />
        </div>

        <br/>
        3.三种大小
        三种大小的输入框，若不设置，则为 default。
        <div>
          <Radio.Group value={size} onChange={this.handleSizeChange}>
            <Radio.Button value="large">Large</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
          </Radio.Group>
          <br /><br />
          <DatePicker size={size} />
          <br />
          <MonthPicker size={size} placeholder="Select Month" />
          <br />
          <RangePicker size={size} />
          <br />
          <WeekPicker size={size} placeholder="Select Week" />
        </div>

        <br />
        4.日期时间选择
        增加选择时间功能，当 showTime 为一个对象时，其属性会传递给内建的 TimePicker。
        <div>
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select Time"
            onChange={onChange}
            onOk={onOk}
          />
          <br />
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            placeholder={['Start Time', 'End Time']}
            onChange={onChange}
            onOk={onOk}
          />
        </div>

        <br />
        5.禁用
        选择框的不可用状态。
        <div>
          <DatePicker defaultValue={moment('2015-06-06', dateFormat)} disabled />
          <br />
          <MonthPicker defaultValue={moment('2015-06', 'YYYY-MM')} disabled />
          <br />
          <RangePicker
            defaultValue={[moment('2015-06-06', dateFormat), moment('2015-06-06', dateFormat)]}
            disabled
          />
        </div>
        
        <br />
        6.不可选择日期和时间
        可用 disabledDate 和 disabledTime 分别禁止选择部分日期和时间，其中 disabledTime 需要和 showTime 一起使用。
        <div>
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            disabledDate={disabledDate}
            disabledTime={disabledDateTime}
            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
          />
          <br />
          <MonthPicker disabledDate={disabledDate} placeholder="Select month" />
          <br />
          <RangePicker
            disabledDate={disabledDate}
            disabledTime={disabledRangeTime}
            showTime={{
              hideDisabledOptions: true,
              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
            }}
            format="YYYY-MM-DD HH:mm:ss"
          />
        </div>

        <br />
        7.自定义日期范围选择
        当 RangePicker 无法满足业务需求时，可以使用两个 DatePicker 实现类似的功能。
        通过设置 disabledDate 方法，来约束开始和结束日期。
        通过 open onOpenChange 来优化交互
        <div>
          <DatePicker
            disabledDate={this.disabledStartDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={startValue}
            placeholder="Start"
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
          />
          <DatePicker
            disabledDate={this.disabledEndDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={endValue}
            placeholder="End"
            onChange={this.onEndChange}
            open={endOpen}
            onOpenChange={this.handleEndOpenChange}
          />
        </div>
        
        <br />
        8.预设范围
        RangePicker 可以设置常用的 预设范围 提高用户体验。
        <div>
          <RangePicker
            ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
            onChange={onChange1}
          />
          <br />
          <RangePicker
            ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={onChange1}
          />
        </div>
        
        <br />
        9.额外的页脚
        在浮层中加入额外的页脚，以满足某些定制信息的需求。
        <div>
          <DatePicker renderExtraFooter={() => 'extra footer'} />
          <DatePicker renderExtraFooter={() => 'extra footer'} showTime />
          <RangePicker renderExtraFooter={() => 'extra footer'} />
          <RangePicker renderExtraFooter={() => 'extra footer'} showTime />
          <MonthPicker renderExtraFooter={() => 'extra footer'} placeholder="Select month" />
        </div>
        <br />
        10.受控面板
        通过组合 mode 与 onPanelChange 控制要展示的面板。
        <DatePicker
          mode={this.state.mode}
          showTime
          onOpenChange={this.handleOpenChange}
          onPanelChange={this.handlePanelChange}
        />

      <RangePicker
        placeholder={['Start month', 'End month']}
        format="YYYY-MM"
        value={value}
        mode={mode1}
        onPanelChange={this.handlePanelChange1}
      />

        <br />
        11.定制日期单元格
        使用 dateRender 可以自定义日期单元格的内容和样式。
        <div>
          <DatePicker
            dateRender={(current) => {
              const style = {};
              if (current.date() === 1) {
                style.border = '1px solid #1890ff';
                style.borderRadius = '50%';
              }
              return (
                <div className="ant-calendar-date" style={style}>
                  {current.date()}
                </div>
              );
            }}
          />
          <RangePicker
            dateRender={(current) => {
              const style = {};
              if (current.date() === 1) {
                style.border = '1px solid #1890ff';
                style.borderRadius = '50%';
              }
              return (
                <div className="ant-calendar-date" style={style}>
                  {current.date()}
                </div>
              );
            }}
          />
        </div>

      </div>
    )
  }
} 

export default connect()(Index);