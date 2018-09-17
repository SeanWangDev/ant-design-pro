import request from '@/utils/request';

export async function findAll({ page = 1 }) {
  return request(`/api/todos?_page=${page}&_limit=5`);
}

export async function deleteOne(id) {
  return request(`/api/todos/${id}`, {
    method: 'DELETE',
  });
}
