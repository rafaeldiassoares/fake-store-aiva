import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './services/api';

export default function App() {
  return (
    //  Instancia QueryClient do react-query
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
