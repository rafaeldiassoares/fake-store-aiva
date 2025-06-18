import { FaStore } from 'react-icons/fa';
import { MdExitToApp } from 'react-icons/md';
import { useAuth } from '../../hooks/useAuth';

export default function HeaderAdmin() {
  const { logout } = useAuth();

  return (
    <header className="bg-blue-500 text-white">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-16">
            <a href="/admin" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full">
                <FaStore size={24} />
              </div>
              <span className="text-lg font-semibold">Admin</span>
            </a>

            <nav className="ml-8 hidden items-center space-x-4 md:flex">
              <a
                href="/admin/list-products"
                className="rounded px-3 py-2 text-sm hover:bg-blue-800"
              >
                Products
              </a>
              <a
                href="#"
                className="rounded px-3 py-2 text-sm hover:bg-blue-800"
              >
                Categories
              </a>
            </nav>
          </div>
          <div className="mr-8 flex items-center space-x-4">
            <div className="flex items-center gap-8" onClick={() => logout()}>
              <MdExitToApp size={22} className="cursor-pointer text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
