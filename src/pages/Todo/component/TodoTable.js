import { connect } from 'dva';
import React from 'react';
import { Table, Pagination, Popconfirm } from 'antd';
import { routerRedux } from 'dva/router';
import { PAGE_SIZE } from '../constants';
import styles from './TodoTable.less';

function TodoTable({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'todo/deleteOneTodo',
      payload: id,
    });
  }
  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: '/todo',
        query: { page },
      })
    );
  }
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'UserId',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: ({ id }) => (
        <span className={styles.operation}>
          <a href="">Edit</a>
          <Popconfirm title="Confirm to delete?" onConfirm={() => deleteHandler(id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  return (
    <div>
      <div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          total={total}
          current={current}
          onChange={pageChangeHandler}
          pageSize={PAGE_SIZE}
        />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  const { list, total, page } = state.todo;
  return {
    list,
    total,
    page,
    loading: state.loading.models.todo,
  };
}
export default connect(mapStateToProps)(TodoTable);
