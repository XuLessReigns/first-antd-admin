import React from 'react';
import styles from './Steps.css';
import {connect} from 'dva';

import { Steps,Icon ,message ,Button ,Popover} from 'antd';

const Step = Steps.Step;

const steps = [{
  title: 'First',
  content: 'First-content',
}, {
  title: 'Second',
  content: 'Second-content',
}, {
  title: 'Last',
  content: 'Last-content',
}];

const customDot = (dot, { status, index }) => (
  <Popover content={<span>step {index} status: {status}</span>}>
    {dot}
  </Popover>
);

class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render (){
    const { current } = this.state;

    return (
      <div>
        {/* 简单的步骤条。 */}
        1. 简单的步骤条。
        <Steps current={1}>
          <Step title="Finished" description="This is a description." />
          <Step title="In Progress" description="This is a description." />
          <Step title="Waiting" description="This is a description." />
        </Steps>
        {/* 迷你版的步骤条，通过设置 <Steps size="small"> 启用. */}
        2. 迷你版的步骤条
        <Steps size="small" current={1}>
          <Step title="Finished" />
          <Step title="In Progress" />
          <Step title="Waiting" />
        </Steps>
        {/* 通过设置 Steps.Step 的 icon 属性，可以启用自定义图标。 */}
        3. 通过设置 Steps.Step 的 icon 属性，可以启用自定义图标。
        <Steps size="small" current={1}>
          <Step status="finish" title="Login" icon={<Icon type="user" />} />
          <Step status="finish" title="Verification" icon={<Icon type="solution" />} />
          <Step status="process" title="Pay" icon={<Icon type="loading" />} />
          <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
        </Steps>
        {/* 通常配合内容及按钮使用，表示一个流程的处理进度。 */}
        4. 通常配合内容及按钮使用，表示一个流程的处理进度。
        <div>
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
          <div className="steps-content">{steps[this.state.current].content}</div>
          <div className="steps-action">
            {
              this.state.current < steps.length - 1
              &&
              <Button type="primary" onClick={() => this.next()}>Next</Button>
            }
            {
              this.state.current === steps.length - 1
              &&
              <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
            }
            {
              this.state.current > 0
              &&
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            }
          </div>
        </div>
        {/* 简单的竖直方向的步骤条。 */}
        5. 简单的竖直方向的步骤条。
        <Steps direction="vertical" current={1}>
          <Step title="Finished" description="This is a description." />
          <Step title="In Progress" description="This is a description." />
          <Step title="Waiting" description="This is a description." />
        </Steps>
        {/* 简单的竖直方向的小型步骤条 */}
        6. 简单的竖直方向的小型步骤条
        <Steps direction="vertical" size="small" current={1}>
          <Step title="Finished" description="This is a description." />
          <Step title="In Progress" description="This is a description." />
          <Step title="Waiting" description="This is a description." />
        </Steps>
        {/* 使用 Steps 的 status 属性来指定当前步骤的状态。 */}
        7. 使用 Steps 的 status 属性来指定当前步骤的状态。
        <Steps current={1} status="error">
          <Step title="Finished" description="This is a description" />
          <Step title="In Process" description="This is a description" />
          <Step title="Waiting" description="This is a description" />
        </Steps>
        {/* 包含步骤点的进度条。 */}
        8. 包含步骤点的进度条。
        <Steps progressDot current={1}>
          <Step title="Finished" description="This is a description." />
          <Step title="In Progress" description="This is a description." />
          <Step title="Waiting" description="This is a description." />
        </Steps>
        {/* 为点状步骤条增加自定义展示。*/}
        9. 为点状步骤条增加自定义展示。
        <Steps current={1} progressDot={customDot}>
          <Step title="Finished" description="You can hover on the dot." />
          <Step title="In Progress" description="You can hover on the dot." />
          <Step title="Waiting" description="You can hover on the dot." />
          <Step title="Waiting" description="You can hover on the dot." />
        </Steps>

      </div>
    )
  }
}

export default connect()(Index);