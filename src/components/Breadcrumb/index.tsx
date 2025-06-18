export type BreadcrumbItem = {
  name: string;
  href?: string;
};

interface BreadcrumbProps {
  breadcrumbItems: BreadcrumbItem[];
}

export default function Breadcrumb({ breadcrumbItems }: BreadcrumbProps) {
  return (
    <nav
      className="mx-auto mb-4 max-w-5xl px-4 text-sm text-gray-500"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <a
                href={item.href}
                className="font-medium text-gray-700 hover:underline"
              >
                {item.name}
              </a>
            ) : (
              <>{item.name}</>
            )}

            {index < breadcrumbItems.length - 1 && (
              <span className="mx-2">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
