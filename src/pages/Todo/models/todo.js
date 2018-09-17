import { findTodos, deleteOneTodo } from '../services/todo';

export default {
  namespace: 'todo',
  state: {
    list: [],
    total: null,
  },
  reducers: {
    save(
      state,
      {
        payload: { data: list, total, page },
      }
    ) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *findTodos(
      {
        payload: { page = 1 },
      },
      { call, put }
    ) {
      const response = yield call(findTodos, { page });
      yield put({
        type: 'save',
        payload: {
          data: response.data,
          total: parseInt(response.headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *deleteOneTodo({ payload: id }, { call, put, select }) {
      yield call(deleteOneTodo, id);
      const page = yield select(state => state.todo.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/todo') {
          dispatch({ type: 'findTodos', payload: query });
        }
      });
    },
  },
};
