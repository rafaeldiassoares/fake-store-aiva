import { api } from '../../../services/api';

export async function getCategories() {
  const { data } = await api.get('/categories');

  return data || [];
}
