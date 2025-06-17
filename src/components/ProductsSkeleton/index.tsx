import Skeleton from 'react-loading-skeleton';

interface ProductSkeletonProps {
  qtd: number;
}

export default function ProductSkeleton({ qtd }: ProductSkeletonProps) {
  return (
    <>
      {Array.from({ length: qtd }).map(() => (
        <div className="m-2 flex w-56 flex-col bg-gray-200 p-4">
          <Skeleton count={10} />
        </div>
      ))}
    </>
  );
}
