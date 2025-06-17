import type { ILoginPayload } from '..';
import { api } from '../../../services/api';

export async function postUserAuthenticate({ email, password }: ILoginPayload) {
  const result = await api.post('/auth/login', { email, password });

  return result;
}
