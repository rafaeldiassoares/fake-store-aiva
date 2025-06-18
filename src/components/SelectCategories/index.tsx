import { twMerge } from 'tailwind-merge';
import type { Category } from '../../@types';
import { useListCategories } from '../../hooks/useCategories';
import { useSearchParams } from 'react-router-dom';

interface SelectCategoriesProps {
  setCategoryFilter: (category: Category | null) => void;
  className?: string;
  isRegister?: boolean;
}

export default function SelectCategories({
  setCategoryFilter,
  className,
  isRegister = false,
}: SelectCategoriesProps) {
  const { data: categories } = useListCategories();

  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;

    if (value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        category: value,
      });

      const selectedCategory = categories?.find((c: Category) => {
        return c.id.toString() === value;
      });

      setCategoryFilter(selectedCategory || null);
    } else {
      // Preciso remover o parâmetro de categoria se o valor for vazio
      const params = Object.fromEntries(searchParams.entries());
      delete params.category;
      setSearchParams(params);
    }
  }

  return (
    <>
      <select
        className={twMerge(
          className
            ? className
            : 'w-full max-w-xs rounded border p-2 text-gray-400',
        )}
        onChange={handleChange}
        value={searchParams.get('category') || ''}
      >
        {!isRegister && <option value="all">All Categories</option>}

        {categories?.map((category: Category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
}
