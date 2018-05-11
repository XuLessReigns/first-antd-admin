import React from 'react';
import { connect } from 'dva';

// import TestDemo from '../components/common/Breadcrumb/Breadcrumb';//面包屑
// import TestDemo from '../components/common/Dropdown/Dropdown';//下拉菜单
// import TestDemo from '../components/common/Menu/Menu';//导航菜单
// import TestDemo from '../components/common/Pagination/Pagination';//分页
// import TestDemo from '../components/common/Steps/Steps'; //步骤条
import TestDemo from '../components/common/AutoComplete/AutoComplete';//自动完成

function Test (){
  return (
    <div>hellow
      <TestDemo />
    </div>
  );
}

export default connect()(Test);