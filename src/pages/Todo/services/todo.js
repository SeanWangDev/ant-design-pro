import request from '@/utils/request';
import { PAGE_SIZE } from '../constants';

export async function findTodos({ page = 1 }) {
  return request(`/api/todos?_page=${page}&_limit=${PAGE_SIZE}`);
}

export async function deleteOneTodo(id) {
  return request(`/api/todos/${id}`, {
    method: 'DELETE',
  });
}
