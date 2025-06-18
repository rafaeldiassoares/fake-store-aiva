import { FaMinus, FaPlus } from 'react-icons/fa';
import { useCartStore, type CartItem } from '../../stores/useCartStore';

interface CartHandleQtdProps {
  product: CartItem;
}

export default function CartHandleQtd({ product }: CartHandleQtdProps) {
  return (
    <div className="flex items-center justify-center gap-2 border p-2 text-gray-700">
      <button
        onClick={() => useCartStore.getState().removeProduct(product.id)}
        className="text-gray-500 hover:text-gray-700"
      >
        <FaMinus />
      </button>
      <span>{product.quantity}</span>
      <button
        onClick={() => useCartStore.getState().addProduct(product)}
        className="text-gray-500 hover:text-gray-700"
      >
        <FaPlus />
      </button>
    </div>
  );
}
