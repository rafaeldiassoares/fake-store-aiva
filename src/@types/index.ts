import type { AxiosResponse } from 'axios';

export type Response<T> = AxiosResponse<T>;

export type Category = {
  id: string;
  name: string;
  image: string;
};

export type Product = {
  id: string;
  title: string;
  images: string[];
  description: string;
  price: number;
  category: Category;
};
