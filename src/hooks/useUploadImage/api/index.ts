import { api } from '../../../services/api';

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  // TODO: aqui deve melhorar o tratamento de erro, talvez com um try/catch
  const response = await api.post('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const { data } = response;

  return data.location || '';
}
