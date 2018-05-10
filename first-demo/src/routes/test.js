import React from 'react';
import { connect } from 'dva';

// import TestDemo from '../components/common/Breadcrumb/Breadcrumb';
// import TestDemo from '../components/common/Dropdown/Dropdown';
import TestDemo from '../components/common/Menu/Menu';

function Test (){
  return (
    <div>hellow
      <TestDemo />
    </div>
  );
}

export default connect()(Test);