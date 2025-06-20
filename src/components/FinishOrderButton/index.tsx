import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/useCartStore';

export default function FinishOrderButton() {
  const products = useCartStore(state => state.products);
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        useCartStore.getState().removeAll();
        alert('Order completed successfully!');
        navigate('/');
      }}
      className="flex w-full justify-center rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50"
      disabled={products.length === 0}
    >
      Finish order
    </button>
  );
}
