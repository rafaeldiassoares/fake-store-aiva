import { useQuery } from 'react-query';
import { getCategories } from './api';

export function useListCategories() {
  return useQuery(['list-categories'], () => getCategories());
}
