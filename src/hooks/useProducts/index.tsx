import { useMutation, useQuery } from 'react-query';
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from './api';
import { queryClient } from '../../services/api';

export function useListProducts(
  idCategory?: string,
  limit?: number,
  offset?: number,
) {
  return useQuery(
    ['list-products', idCategory, limit, offset],
    () => getProducts(idCategory, limit, offset),
    { enabled: true },
  );
}

export function useGetProductById(id?: string) {
  return useQuery(['product', id], () => getProductById(id), {
    enabled: !!id,
  });
}

export function useCreateProduct() {
  return useMutation(createProduct);
}

export function useUpdateProduct() {
  return (
    useMutation(updateProduct),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('list-products');
      },
    }
  );
}
