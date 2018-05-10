import React from 'react';
import styles from './Dropdown.css';
import {connect} from 'dva';

import { Dropdown, Menu, Icon ,Button,message} from 'antd';

const onClick = function ({ key }) {

  console.log(key,message)
  message.info(`Click on item ${key}`);
};

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const menu1 = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://alipay.com">http://alipay.com</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">http://www.taobao.com</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">http://www.tmall.com</a>
    </Menu.Item>

    <Menu.Divider />
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd memu item</Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
    <Menu.Item key="4" disabled>4rd menu item（disabled）</Menu.Item>
  </Menu>
);


const SubMenu = Menu.SubMenu;

const menu2 = (
  <Menu>
    <Menu.Item>1st menu item</Menu.Item>
    <Menu.Item>2nd menu item</Menu.Item>
    <SubMenu title="sub menu">
      <Menu.Item>3rd menu item</Menu.Item>
      <Menu.Item>4th menu item</Menu.Item>
    </SubMenu>
    <SubMenu title="disabled sub menu" disabled>
      <Menu.Item>5d menu item</Menu.Item>
      <Menu.Item>6th menu item</Menu.Item>
    </SubMenu>
  </Menu>
);


class Index extends React.Component{

  state = {
    visible: false,
  };
  handleMenuClick = (e) => {
    if (e.key === '3') {
      this.setState({ visible: false });
    }
  }
  handleVisibleChange = (flag) => {
    console.log(flag)
    this.setState({ visible: flag });
  }

  render (){

    const menu3 = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">Clicking me will not close the menu.</Menu.Item>
        <Menu.Item key="2">Clicking me will not close the menu also.</Menu.Item>
        <Menu.Item key="3">Clicking me will close the menu</Menu.Item>
      </Menu>
    );

    return (
      <div>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Hover me <Icon type="down" />
        </a>
      </Dropdown>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button>bottomLeft</Button>
      </Dropdown>
      <Dropdown overlay={menu} placement="bottomCenter">
        <Button>bottomCenter</Button>
      </Dropdown>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>bottomRight</Button>
      </Dropdown>
      <br />

      {/* 距离浏览器顶部需要有一定距离 */}
      <Dropdown overlay={menu} placement="topLeft">
        <Button>topLeft</Button>
      </Dropdown>
      <Dropdown overlay={menu} placement="topCenter">
        <Button>topCenter</Button>
      </Dropdown>
      <Dropdown overlay={menu} placement="topRight">
        <Button>topRight</Button>
      </Dropdown>


      {/* 点击触发 */}
      <br />点击触发
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="#">
          Click me <Icon type="down" />
        </a>
      </Dropdown>

      {/* 点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。 */}
      <br />点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Hover me, Click menu item <Icon type="down" />
        </a>
      </Dropdown>

      {/* 左边是按钮，右边是额外的相关功能菜单。 */}
      <br/>左边是按钮，右边是额外的相关功能菜单。
      <Dropdown.Button onClick={handleButtonClick} overlay={menu1}>
        Dropdown
      </Dropdown.Button>
      <Dropdown.Button
        onClick={handleButtonClick}
        overlay={menu1}
        disabled
        style={{ marginLeft: 8 }}
      >
        Dropdown
      </Dropdown.Button>
      <Dropdown overlay={menu1}>
        <Button style={{ marginLeft: 8 }}>
          Button <Icon type="down" />
        </Button>
      </Dropdown>

      {/* 传入的菜单里有多个层级。 */}
      <br/>传入的菜单里有多个层级。
      <Dropdown overlay={menu2}>
        <a className="ant-dropdown-link" href="#">
          Cascading menu <Icon type="down" />
        </a>
      </Dropdown>

      {/* 默认是移入触发菜单，可以点击触发 */}
      <br/>默认是移入触发菜单，可以点击触发
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <span style={{ userSelect: 'none' }}>Right Click on Me</span>
      </Dropdown>

      {/* 默认是点击关闭菜单，可以关闭此功能。 */}
      <br/>默认是点击关闭菜单，可以关闭此功能。
      <Dropdown overlay={menu3}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
      >
        <a className="ant-dropdown-link" href="#">
          Hover me <Icon type="down" />
        </a>
      </Dropdown>
      </div>
    )
  }
}

export default connect()(Index);