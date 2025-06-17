import { api } from '../../../services/api';

export async function getRelatedProducts(idProduct: string) {
  const { data } = await api.get(`/products/${idProduct}/related`);

  return data;
}
