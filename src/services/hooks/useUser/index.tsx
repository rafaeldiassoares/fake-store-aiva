import { useMutation } from 'react-query';
import type { Response } from '../../../@types';
import { queryClient } from '../../api';
import { postUserAuthenticate } from './api';

type IPostUserAuthenticateResponse = {
  access_token: string;
  expires: string;
};

export type ILoginPayload = {
  email: string;
  password: string;
};

export function usePostUserAuthenticate() {
  return useMutation<
    Response<IPostUserAuthenticateResponse>,
    Error,
    ILoginPayload
  >(data => postUserAuthenticate(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('user'); // Invalida para sempre refazer a requisição, não usar o cache do react query
    },
  });
}
