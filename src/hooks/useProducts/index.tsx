import { useQuery } from 'react-query';
import { getProductById, getProducts } from './api';

export function useListProducts(
  limit: number,
  offset: number,
  idCategory?: string,
) {
  return useQuery(
    ['list-products', limit, offset, idCategory],
    () => getProducts(limit, offset, idCategory),
    { enabled: true },
  );
}

export function useGetProductById(id: string) {
  return useQuery(['product', id], () => getProductById(id), {
    enabled: !!id,
  });
}
