import React from 'react';
import styles from './Breadcrumb.css';
import {connect} from 'dva';

import { Router, Route, Link, hashHistory } from 'react-router';
import { Breadcrumb, Alert } from 'antd';

const Apps = () => (
  <ul className="app-list">
    <li>
      <Link to="/apps/1">Application1</Link>：<Link to="/apps/1/detail">Detail</Link>
    </li>
    <li>
      <Link to="/apps/2">Application2</Link>：<Link to="/apps/2/detail">Detail</Link>
    </li>
  </ul>
);

const Home = ({ routes, params, children }) => (
  <div className="demo">
    <div className="demo-nav">
      <Link to="/">Home</Link>
      <Link to="/apps">Application List</Link>
    </div>
    {children || 'Home Page'}
    <Alert style={{ margin: '16px 0' }} message="Click the navigation above to switch:" />
    <Breadcrumb routes={routes} params={params} />


    <Breadcrumb separator=">">
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
      <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
  </div>
);

class Index extends React.Component{
  render (){
    return (
      <div>hellow
      <Apps />
      <Home />
      </div>
    )
  }
}

export default connect()(Index);