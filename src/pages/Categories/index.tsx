import Skeleton from 'react-loading-skeleton';
import { useListCategories } from '../../hooks/useCategories';
import CategoryCard from '../../components/CategoryCard';

export default function Categories() {
  const { data: categories } = useListCategories();

  return (
    <div>
      <div className="m-auto flex w-full max-w-5xl p-4 text-xl font-bold text-gray-700">
        Categories
      </div>

      <div className="mx-auto flex max-w-5xl flex-wrap justify-center">
        {categories?.length > 0
          ? categories.map(
              (category: { id: string; image: string; name: string }) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  image={category.image}
                  name={category.name}
                />
              ),
            )
          : Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="m-2 flex w-56 flex-col bg-gray-200 p-4"
              >
                <Skeleton count={10} />
              </div>
            ))}
      </div>
    </div>
  );
}
