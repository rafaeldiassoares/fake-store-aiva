import { useState } from 'react';

export default function CategoryCard({
  id,
  image,
  name,
}: {
  id: string;
  image: string;
  name: string;
}) {
  const [currentImage, setCurrentImage] = useState(image);

  return (
    <a
      className="m-2 flex w-56 cursor-pointer flex-col justify-between border border-gray-300 p-4"
      href={`/?category-id=${id}&category-name=${encodeURIComponent(name)}`}
    >
      <img
        src={currentImage}
        alt={name}
        onError={() => setCurrentImage('src/assets/fallback-image.png')}
      />
      <span className="mt-2 max-w-full text-base text-gray-700">{name}</span>
    </a>
  );
}
