import { FaStore } from 'react-icons/fa';

export default function Login() {
  return (
    <div className="min-2 flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-lg border border-gray-300 p-8 shadow-lg">
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white">
          <FaStore size={28} />
        </span>
        <h1 className="font-bold text-blue-500">Acessar</h1>
        <form
          className="flex flex-col gap-4 pt-8 sm:w-full md:w-[22rem] lg:w-[22rem] xl:w-[22rem]"
          method="post"
          action=""
        >
          <input
            type="text"
            placeholder="Usuário"
            className="flex rounded-md border border-gray-300 p-2"
          />
          <input
            type="password"
            placeholder="Senha"
            className="flex rounded-md border border-gray-300 p-2"
          />
          <button
            type="submit"
            className="mt-8 flex justify-center rounded-md bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
