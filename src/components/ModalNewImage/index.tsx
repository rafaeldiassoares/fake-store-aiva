import { useUploadImage } from '../../hooks/useUploadImage';

interface ModalNewImageProps {
  setShowModal: (show: boolean) => void;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ModalNewImage({
  setShowModal,
  setImages,
}: ModalNewImageProps) {
  const { mutateAsync: upload } = useUploadImage();

  const submitFile = async (file: File) => {
    try {
      const location = await upload(file);

      setImages((prev: string[]) => [...prev, location]);

      setShowModal(false);
    } catch (error) {
      console.error('Erroe', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="min-w-[600px] rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Upload images</h2>
        <div className="mb-4 py-8">
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                submitFile(e.target.files[0]);
                setShowModal(false);
              }
            }}
            className="block w-full"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
