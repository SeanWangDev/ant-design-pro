import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TodoTable from './component/TodoTable';

export default () => (
  <div>
    <PageHeaderWrapper title="待办事项">
      <TodoTable />
    </PageHeaderWrapper>
  </div>
);
