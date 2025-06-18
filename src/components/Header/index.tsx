import { FaStore } from 'react-icons/fa';
import CartIndicator from '../CartIndicator';

export default function Header() {
  return (
    <header className="border-b border-gray-700 bg-gray-900 text-white">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-16">
            <a href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full">
                <FaStore size={24} />
              </div>
              <span className="text-lg font-semibold">Fake Store</span>
            </a>

            <nav className="ml-8 hidden items-center space-x-4 md:flex">
              <a
                href="/"
                className="rounded px-3 py-2 text-sm hover:bg-gray-800"
              >
                Products
              </a>
              <a
                href="/categories"
                className="rounded px-3 py-2 text-sm hover:bg-gray-800"
              >
                Categories
              </a>
            </nav>
          </div>
          <div className="mr-8 flex items-center space-x-4">
            <div className="flex items-center gap-8" onClick={() => {}}>
              <CartIndicator />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
