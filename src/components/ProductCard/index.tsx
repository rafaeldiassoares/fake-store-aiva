export default function ProductCard({
  id,
  image,
  title,
  price,
}: {
  id: string;
  image: string;
  title: string;
  price: number;
}) {
  return (
    <a
      className="m-2 flex w-56 cursor-pointer flex-col justify-between border border-gray-300 p-4"
      href={`/product/${id}`}
    >
      <img src={image} alt={title} />
      <span className="max-w-full text-base text-gray-700">{title}</span>
      <p className="flex pt-4 font-bold text-gray-700">Price: ${price}</p>
    </a>
  );
}
