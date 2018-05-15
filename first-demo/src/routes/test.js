import React from 'react';
import { connect } from 'dva';

// import TestDemo from '../components/common/Breadcrumb/Breadcrumb';//面包屑
// import TestDemo from '../components/common/Dropdown/Dropdown';//下拉菜单
// import TestDemo from '../components/common/Menu/Menu';//导航菜单
// import TestDemo from '../components/common/Pagination/Pagination';//分页
// import TestDemo from '../components/common/Steps/Steps'; //步骤条
// import TestDemo from '../components/common/AutoComplete/AutoComplete';//自动完成
// import TestDemo from '../components/common/Cascader/Cascader';//级联选择
// import TestDemo from '../components/common/Checkbox/Checkbox';//多选框
// import TestDemo from '../components/common/DatePicker/DatePicker';//日期选择框
import TestDemo from '../components/common/Form/Form'; //表单

function Test (){
  return (
    <div>hellow!!! This is example.
      <TestDemo />
    </div>
  );
}

export default connect()(Test);