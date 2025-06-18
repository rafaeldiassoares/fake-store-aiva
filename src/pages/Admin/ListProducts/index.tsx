import DataTable from 'react-data-table-component';
import { useListProducts } from '../../../hooks/useProducts';
import { customStyles } from '../../../styles/dataGridStyles';
import type { Category, Product } from '../../../@types';
import { FaEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import SelectCategories from '../../../components/SelectCategories';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';

/**
 * Nessa tela optei por usar uma paginação mais simples pois a api não retorna os dados meta
 * relacionados a paginação, como total de itens, total de páginas, etc.
 * Portanto, a paginação é feita apenas no frontend mas poderia ser implementada uma paginação
 * mais robusta utilizando recursos da api e até guardar o estado da tela na url.
 */

export default function ListProducts() {
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<Category | null>(null);
  const navigate = useNavigate();

  const {
    data: products,
    refetch,
    isLoading,
  } = useListProducts(categoryFilter?.id);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();

    if (products) {
      const filtered = products.filter((product: Product) =>
        product.title.toLowerCase().includes(searchTerm),
      );

      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    if (products) {
      setFilteredData(products);
    }

    refetch();
  }, [products, categoryFilter]);

  const columns = [
    {
      name: 'id',
      selector: (row: Product) => row.id,
      width: '100px',
      center: true,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row: Product) => row.title,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row: Product) => `$${row.price.toFixed(2)}`,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row: Product) => row.category?.name || 'Sem Categoria',
      sortable: true,
    },
    {
      name: 'Actions',
      width: '100px',
      center: true,
      cell: (row: Product) => (
        <a className="text-blue-700" href={`/admin/update-product/${row.id}`}>
          <FaEdit size={18} />
        </a>
      ),
    },
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-wrap justify-center p-4">
      <div className="flex w-full items-center justify-between py-4">
        <span className="text-lg font-bold text-gray-700">Products</span>
        <div>
          <button
            className="w-36 rounded bg-green-500 p-2 text-xs uppercase text-white hover:bg-green-400"
            onClick={() => {
              navigate('/admin/new-product');
            }}
          >
            New Product
          </button>
        </div>
      </div>
      <div className="flex w-full items-center justify-start gap-2 py-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full max-w-xs rounded border p-2"
          onChange={handleFilter}
        />

        <SelectCategories setCategoryFilter={setCategoryFilter} />
      </div>
      <div className="flex w-full">
        <div className="flex w-full flex-col items-center rounded-md border p-8">
          {isLoading && (
            <div className="flex w-full flex-wrap justify-center">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="m-2 flex w-full flex-col bg-gray-200 p-4"
                >
                  <Skeleton count={2} />
                </div>
              ))}
            </div>
          )}

          <DataTable
            pagination
            customStyles={customStyles}
            columns={columns}
            data={filteredData || []}
          />
        </div>
      </div>
    </div>
  );
}
