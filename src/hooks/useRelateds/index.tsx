import { useQuery } from 'react-query';
import { getRelatedProducts } from './api';

export function useGetRelatedProducts(idProduct: string) {
  return useQuery(
    ['related-products', idProduct],
    () => getRelatedProducts(idProduct),
    {
      enabled: !!idProduct,
    },
  );
}
