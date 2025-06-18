import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSearchParams } from 'react-router-dom';
import Breadcrumb, { type BreadcrumbItem } from '../../components/Breadcrumb';
import ProductCard from '../../components/ProductCard';
import { useListProducts } from '../../hooks/useProducts';

export default function Home() {
  const [limit, setLimit] = useState(12);
  const [searchParams] = useSearchParams();
  const idCategory = searchParams.get('category-id') || undefined;
  const nameCategory = searchParams.get('category-name') || undefined;

  const { data: products, isLoading } = useListProducts(idCategory, limit, 0);

  const handleShowMore = () => {
    setLimit(prevLimit => prevLimit + 12);

    // Forma simples de rolar para o final da página após carregar mais produtos
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 500);
  };

  const breadcrumbItems: BreadcrumbItem[] = [{ name: 'Home', href: '/' }];

  if (idCategory && nameCategory) {
    breadcrumbItems.push({
      name: nameCategory,
    });
  }

  return (
    <div>
      <div className="m-auto flex w-full max-w-5xl p-4 text-xl font-bold text-gray-700">
        Products
      </div>

      <Breadcrumb breadcrumbItems={breadcrumbItems} />

      <div className="justify-left mx-auto flex max-w-5xl flex-wrap">
        {products?.length > 0
          ? products.map((product: any) => (
              <ProductCard
                id={product.id}
                key={product.id}
                image={product.images[0]}
                title={product.title}
                price={product.price}
              />
            ))
          : Array.from({ length: limit }).map((_, index) => (
              <div
                key={index}
                className="m-2 flex w-56 flex-col bg-gray-200 p-4"
              >
                <Skeleton count={10} />
              </div>
            ))}
      </div>

      <div className="mb-16 flex w-full justify-center p-4">
        <button
          onClick={handleShowMore}
          className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
}
