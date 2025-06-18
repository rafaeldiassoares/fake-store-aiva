import { useEffect, useState } from 'react';

interface ModalNewImageProps {
  message: string;
  showAlert?: boolean;
}

export default function Alert({ message, showAlert }: ModalNewImageProps) {
  const [, setShowModal] = useState(showAlert);

  useEffect(() => {
    // Fechar o alerta automaticamente
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 3000); // Alerta permanece aberto por 3 segundos

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="min-w-[600px] rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">{message}</h2>
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
      )}
    </>
  );
}
