import { useState } from 'react';
import { useGetProductById } from '../../hooks/useProducts';
import { useParams } from 'react-router-dom';
import { useGetRelatedProducts } from '../../hooks/useRelateds';
import ProductCard from '../../components/ProductCard';
import ProductSkeleton from '../../components/ProductsSkeleton';
import type { Product } from '../../@types';
import { useCartStore } from '../../stores/useCartStore';
import Breadcrumb from '../../components/Breadcrumb';
import Skeleton from 'react-loading-skeleton';

export default function Product() {
  const { id } = useParams();
  const addToCart = useCartStore(state => state.addProduct);

  const { data: product } = useGetProductById(id || '');
  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.images?.[0],
  );

  const { data: relatedProducts } = useGetRelatedProducts(id || '');

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div>
      <div className="m-auto flex w-full max-w-5xl p-4 text-xl font-bold text-gray-700">
        {product?.title}
      </div>

      {product && (
        <Breadcrumb
          breadcrumbItems={[
            { name: 'Home', href: '/' },
            {
              name: product?.category?.name,
              href: `/?category-id=${product?.category?.id}&category-name=${product?.category?.name}`,
            },
            { name: product?.slug },
          ]}
        />
      )}

      {product ? (
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center">
          <div className="flex flex-row">
            <div className="mx-auto flex max-w-5xl flex-col justify-center">
              <div className="gray-300 m-2 flex w-56 cursor-pointer flex-col p-4">
                <img
                  src={imagePreview || product.images[0]}
                  alt="Product Name"
                  className="h-56 w-56 object-cover"
                />
              </div>
              <div className="mx-auto flex max-w-5xl flex-wrap justify-center">
                {product.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    className="m-2 h-16 w-16 cursor-pointer object-cover"
                    onClick={() => setImagePreview(image)}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col p-4">
              <div className="flex w-full">
                <span className="flex w-full text-xl font-bold text-gray-700">
                  {product.title}
                </span>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-36 rounded bg-yellow-500 p-2 text-xs uppercase text-white hover:bg-yellow-400"
                >
                  Add to cart
                </button>
              </div>
              <p className="flex w-full pt-4 font-bold text-gray-700">
                Price: ${product.price}
              </p>

              <div className="py-4">
                <h2 className="text-base font-bold text-gray-700">
                  Description:
                </h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center p-4">
            <h2 className="w-full py-8 text-xl font-bold text-gray-700">
              Related products
            </h2>
            <div className="flex w-full flex-wrap justify-center">
              {relatedProducts?.length > 0 ? (
                relatedProducts
                  .slice(0, 4) // A api não espera um limite, definindo aqui para exibir apenas 4 produtos relacionados
                  .map((product: any) => (
                    <ProductCard
                      id={product.id}
                      key={product.id}
                      image={product.images[0]}
                      title={product.title}
                      price={product.price}
                    />
                  ))
              ) : (
                <ProductSkeleton qtd={4} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="m-2 flex w-56 flex-col bg-gray-200 p-4">
              <Skeleton count={10} />
            </div>
          ))}{' '}
        </div>
      )}
    </div>
  );
}
