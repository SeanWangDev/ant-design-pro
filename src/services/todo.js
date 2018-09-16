import request from '@/utils/request';

export default async function query({ page = 1 }) {
  return request(`/api/todos?_page=${page}&_limit=5`);
}
