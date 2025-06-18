import ReactApexChart from 'react-apexcharts';
import { useListProducts } from '../../../hooks/useProducts';

export default function Dashboard() {
  const { data: products } = useListProducts();

  const productsPerCategoryMap: Record<string, number> = {};
  const categoriesSet = new Set<string>();

  if (products) {
    products.forEach((product: any) => {
      const categoryName = product.category?.name ?? 'Sem Categoria';
      productsPerCategoryMap[categoryName] =
        (productsPerCategoryMap[categoryName] || 0) + 1;
      categoriesSet.add(categoryName);
    });
  }

  const categories = Array.from(categoriesSet);
  const productsPerCategory = categories.map(
    cat => productsPerCategoryMap[cat],
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-wrap justify-center p-4">
      <div className="flex w-full justify-start py-4 text-lg font-bold text-gray-700">
        Dashboard
      </div>
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-col items-center rounded-md border p-8">
          <h2 className="mb-2 text-base font-bold text-gray-700">
            Products by category
          </h2>
          <ReactApexChart
            type="bar"
            height={300}
            width={600}
            series={[{ name: 'Product', data: productsPerCategory }]}
            options={{
              xaxis: {
                categories: categories,
              },
            }}
          />
        </div>
        <div className="flex w-full">
          <div className="flex w-full flex-col items-center rounded-md border p-8">
            <h2 className="mb-2 text-base font-bold text-gray-700">
              Total Products: {products ? products.length : 0}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
