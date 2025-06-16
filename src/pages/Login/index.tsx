import { Formik } from 'formik';
import { FaStore } from 'react-icons/fa';
import * as Yup from 'yup';
import { useAuth } from '../../services/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAuthState } from '../../stores/useAuthStore';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const loginErrorMessage = 'Login ou senha não conferem';

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(loginErrorMessage),
    password: Yup.string().required(loginErrorMessage),
  });

  const { login } = useAuth();
  const { isAuthenticated } = useAuthState();

  const loginErrorComponent = () => (
    <p className="absolute bottom-0 right-0 text-right text-xs text-red-600">
      {loginErrorMessage}
    </p>
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-2 flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-lg border border-gray-300 p-8 shadow-lg">
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white">
          <FaStore size={28} />
        </span>
        <h1 className="font-bold text-blue-500">Acessar</h1>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async values => {
            console.log(values);

            try {
              setIsLoading(true);
              await login(values.email, values.password);
              navigate('/');
            } catch (err) {
              const error = err as AxiosError;

              if (
                error.response?.status === 401 ||
                error.response?.status === 403 ||
                error.response?.status === 400
              ) {
                setIsError(true);
              }
            } finally {
              setIsLoading(false);
            }
          }}
        >
          {({ values, touched, errors, handleSubmit, handleChange }) => (
            <form
              onSubmit={handleSubmit}
              action=""
              method="post"
              className="flex flex-col gap-2 pt-8 sm:w-full md:w-[22rem] lg:w-[22rem] xl:w-[22rem]"
            >
              <div className="flex w-full flex-col pb-4">
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  onChange={handleChange}
                  className="flex rounded-md border border-gray-300 p-2"
                  value={values.email}
                />
              </div>

              <div className="relative flex w-full flex-col pb-4">
                <input
                  name="password"
                  type="password"
                  placeholder="Senha"
                  onChange={handleChange}
                  className="mb-2 flex rounded-md border border-gray-300 p-2"
                  value={values.password}
                />
                {(isError || (touched.email && errors.email)) &&
                  loginErrorComponent()}
              </div>
              <button
                type="submit"
                className="mt-8 flex justify-center rounded-md bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
              >
                {isLoading ? 'Carregando...' : 'Entrar'}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
