import React from 'react';
import styles from './Pagination.css';
import {connect} from 'dva';

import { Pagination } from 'antd';

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}

function onChange(pageNumber) {
  console.log('Page: ', pageNumber);
}

function showTotal(total) {
  return `Total ${total} items`;
}

function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <a>Previous</a>;
  } else if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
}

class Index extends React.Component{
  state = {
    current: 3,
  }
  onChange = (page) => {
    console.log(page);
    this.setState({
      current: page,
    });
  }

  render (){
    return (
      <div>
        {/* 基础分页。 */}
        1. 基础分页。<br />
        <Pagination defaultCurrent={1} total={50} />

        {/* 更多分页。 */}
        2. 更多分页。<br />
        <Pagination defalutCurrent={6} total={500}/>

        {/* 改变每页显示条目数。 */}
        3. 改变每页显示条目数。<br />
        <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} />

        {/* 快速跳转到某一页。 */}
        4. 快速跳转到某一页。<br />
        <Pagination showQuickJumper onChange={onChange} defaultCurrent={2} total={500} />

        {/* 迷你版本。 */}
        5. 迷你版本。<br />
        <div>
          <Pagination size="small" total={50} />
          <Pagination size="small" total={50} showSizeChanger showQuickJumper />
          <Pagination size="small" total={50} showTotal={showTotal} />
        </div>
        {/* 简单的翻页。 */}
        6. 简单的翻页。<br />
        <Pagination simple defaultCurrent={2} total={50} />

        {/* 受控制的页码 */}
        7. 受控制的页码<br />
        <Pagination current={this.state.current} onChange={this.onChange} total={50} />

        {/* 通过设置 showTotal 展示总共有多少数据。 */}
        8. 通过设置 showTotal 展示总共有多少数据。<br />
        <div>
          <Pagination
            total={85}
            showTotal={total => `Total ${total} items`}
            pageSize={20}
            defaultCurrent={1}
          />
          <br />
          <Pagination
            total={85}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            pageSize={20}
            defaultCurrent={1}
          />
        </div>

        {/* 修改上一步和下一步为文字链接。 */}
        9. 修改上一步和下一步为文字链接。<br />
        <Pagination total={500} itemRender={itemRender} />

      </div>
    )
  }
}

export default connect()(Index);