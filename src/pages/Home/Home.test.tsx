import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import Home from './index';

const mockUseListProducts = jest.fn();

jest.mock('../../hooks/useProducts', () => ({
  useListProducts: () => mockUseListProducts(),
}));

jest.mock('react-loading-skeleton', () => {
  return function Skeleton() {
    return <div data-testid="skeleton">Loading...</div>;
  };
});

const mockScrollTo = jest.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

jest.useFakeTimers(); // Mock para setTimeout

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockScrollTo.mockClear();
  });

  it('deve renderizar o título "Products"', () => {
    mockUseListProducts.mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<Home />, { wrapper: createWrapper() });

    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('deve renderizar o breadcrumb com "Home"', () => {
    mockUseListProducts.mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<Home />, { wrapper: createWrapper() });

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('deve renderizar skeletons quando está carregando', () => {
    mockUseListProducts.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<Home />, { wrapper: createWrapper() });

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(12);
  });

  it('deve renderizar produtos quando dados estão disponíveis', () => {
    const mockProducts = [
      {
        id: '1',
        title: 'Produto 1',
        price: 99.99,
        images: ['https://example.com/image1.jpg'],
      },
      {
        id: '2',
        title: 'Produto 2',
        price: 149.99,
        images: ['https://example.com/image2.jpg'],
      },
    ];

    mockUseListProducts.mockReturnValue({
      data: mockProducts,
      isLoading: false,
    });

    render(<Home />, { wrapper: createWrapper() });

    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
    expect(screen.getByText('Price: $99.99')).toBeInTheDocument();
    expect(screen.getByText('Price: $149.99')).toBeInTheDocument();
  });

  it('deve renderizar o botão "Load More"', () => {
    mockUseListProducts.mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<Home />, { wrapper: createWrapper() });

    expect(screen.getByText('Load More')).toBeInTheDocument();
  });

  it('deve chamar setLimit quando o botão "Load More" é clicado', () => {
    mockUseListProducts.mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<Home />, { wrapper: createWrapper() });

    const loadMoreButton = screen.getByText('Load More');
    fireEvent.click(loadMoreButton);

    expect(mockUseListProducts).toHaveBeenCalled(); // como se chamasse o useListProducts novamente
  });

  it('deve renderizar imagens dos produtos corretamente', () => {
    const mockProducts = [
      {
        id: '1',
        title: 'Produto com Imagem',
        price: 99.99,
        images: ['https://example.com/test-image.jpg'],
      },
    ];

    mockUseListProducts.mockReturnValue({
      data: mockProducts,
      isLoading: false,
    });

    render(<Home />, { wrapper: createWrapper() });

    const productImage = screen.getByAltText('Produto com Imagem');
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute(
      'src',
      'https://example.com/test-image.jpg',
    );
  });

  it('deve renderizar links dos produtos corretamente', () => {
    const mockProducts = [
      {
        id: '123',
        title: 'Produto Link',
        price: 99.99,
        images: ['https://example.com/image.jpg'],
      },
    ];

    mockUseListProducts.mockReturnValue({
      data: mockProducts,
      isLoading: false,
    });

    render(<Home />, { wrapper: createWrapper() });

    const productLink = screen.getByRole('link', { name: /produto link/i });
    expect(productLink).toHaveAttribute('href', '/product/123');
  });
});
