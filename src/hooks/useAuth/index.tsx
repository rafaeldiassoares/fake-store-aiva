import { useAuthState } from '../../stores/useAuthStore';
import { usePostUserAuthenticate } from '../useUser';

export function useAuth() {
  const { login: loginState } = useAuthState();
  const { mutateAsync: postUserAuthenticate } = usePostUserAuthenticate();

  const login = async (email: string, password: string) => {
    const { data } = await postUserAuthenticate({ email, password }); // Faz requisição de login usando o react-query

    if (data.access_token) {
      loginState(data.access_token); // Armazena o token no Zustand
    }
  };

  return {
    login,
  };
}
