import { useMutation } from 'react-query';
import { uploadImage } from './api';

export function useUploadImage() {
  return useMutation(uploadImage);
}
