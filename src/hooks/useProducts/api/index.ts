import { api } from '../../../services/api';

export async function getProducts(
  limit: number,
  offset: number,
  idCategory?: string,
) {
  const apiUrl = idCategory
    ? `/categories/${idCategory}/products`
    : '/products';

  const { data } = await api.get(apiUrl, {
    params: {
      limit,
      offset,
    },
  });

  return data;
}

export async function getProductById(id: string) {
  const { data } = await api.get(`/products/${id}`);

  return data;
}
