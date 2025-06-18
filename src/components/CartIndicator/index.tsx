import { FaShoppingCart } from 'react-icons/fa';
import { useCartStore } from '../../stores/useCartStore';

export default function CartIndicator() {
  // Retorna os produtos que foram salvos no localStorage através do Zustand
  // através do zustand é possível acessar esses valores globalmente
  const products = useCartStore(state => state.products);
  const totalItems = products.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  return (
    <div className="relative">
      <span className="absolute -right-4 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
        {totalItems}
      </span>
      <a href="/cart" className="flex items-center gap-2">
        <FaShoppingCart size={20} className="text-white" />
      </a>
    </div>
  );
}
