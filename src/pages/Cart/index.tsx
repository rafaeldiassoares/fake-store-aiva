import Breadcrumb from '../../components/Breadcrumb';
import CartHandleQtd from '../../components/CartHandleQtd';
import FinishOrderButton from '../../components/FinishOrderButton';
import { useCartStore } from '../../stores/useCartStore';

export default function Cart() {
  const products = useCartStore(state => state.products);

  const totalItems = products
    .reduce((acc, product) => acc + product.price * product.quantity, 0)
    .toFixed(2);

  return (
    <div>
      <div className="m-auto flex w-full max-w-5xl p-4 text-xl font-bold text-gray-700">
        Shopping cart
      </div>

      <Breadcrumb
        breadcrumbItems={[{ name: 'Home', href: '/' }, { name: 'Cart' }]}
      />

      <div className="justify-left mx-auto flex max-w-5xl flex-row">
        <div className="flex w-full flex-col">
          {products?.length > 0 ? (
            products.map((product: any) => (
              <div className="m-2 flex cursor-pointer flex-row justify-between border border-gray-300 p-4">
                <div className="flex items-start gap-4">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-16 w-16"
                  />
                  <div>
                    <span className="max-w-full text-base text-gray-700">
                      {product.title}
                    </span>
                    <p className="flex pt-4 font-bold text-gray-700">
                      Price: ${product.price}
                    </p>
                  </div>
                </div>
                <div>
                  <CartHandleQtd product={product} />
                  <p className="flex justify-end pt-4 text-sm font-bold text-gray-700">
                    Total: ${(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="m-2 flex w-full flex-col items-center justify-center p-4">
              <p className="text-gray-700">Your cart is empty</p>
              <a href="/" className="text-blue-500 hover:underline">
                Go back to products
              </a>
            </div>
          )}
        </div>
        <div className="mb-2 mt-2 flex w-60 flex-col justify-between border border-gray-300">
          <div className="flex flex-col items-start justify-start p-4 font-bold text-gray-700">
            <h2 className="py-2">Order</h2>
            <span className="text-sm text-gray-500">Total: ${totalItems}</span>
          </div>
          <div className="flex flex-col items-center justify-end p-2">
            <FinishOrderButton />
          </div>
        </div>
      </div>
    </div>
  );
}
