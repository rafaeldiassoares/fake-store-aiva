import { api } from '../../../services/api';

export async function getProducts(
  idCategory?: string,
  limit?: number,
  offset?: number,
) {
  const apiUrl = idCategory
    ? `/categories/${idCategory}/products` // Na API através desse endpoint que ficou definido como buscar produtos por categoria
    : '/products';

  const { data } = await api.get(apiUrl, {
    params: {
      limit,
      offset,
    },
  });

  return data;
}

export async function getProductById(id?: string) {
  const { data } = await api.get(`/products/${id}`);

  return data;
}

export const createProduct = async (product: {
  title: string;
  price: number;
  description: string;
  categoryId: string;
  images: string[];
}) => {
  const { data } = await api.post('/products', product);

  return data;
};

export const updateProduct = async (product: {
  id: string;
  title: string;
  price: number;
}) => {
  // TODO: seguindo a documentação da API: https://fakeapi.platzi.com/en/rest/products/
  // mesmo passando os paramentros corretamente, a API não atualiza o produto. seria uma instabilidade da API?
  const { data } = await api.put(`/products/${product.id}`, {
    title: product.title,
    price: product.price,
  });

  return data;
};
