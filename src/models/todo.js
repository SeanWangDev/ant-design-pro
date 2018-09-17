import { findAll } from '@/services/todo';

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
        payload: { data: list, total },
      }
    ) {
      return { ...state, list, total };
    },
  },
  effects: {
    *fetch(
      {
        payload: { page },
      },
      { call, put }
    ) {
      const response = yield call(findAll, { page });
      yield put({
        type: 'save',
        payload: { data: response.data, total: response.headers['x-total-count'] },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/todo') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
