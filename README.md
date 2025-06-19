# Desafio Front-End – React + TypeScript · **Aiva**

Aplicação de loja virtual utilizando a [Fake Store API](https://api.escuelajs.co/docs#/) desenvolvida como desafio técnico para a empresa [Aiva](https://aivatech.co/), foram utilizados React, Typescript, Vite e outros. O projeto simula uma loja virtual e implementa algumas de suas funcionalidades como listagem de produtos com suas informações, detalhe de cada produto, filtros por categorias de produtos, carrinho de compras e área administrativa.

## URL Projeto

[Fake Store](https://fake-store-aiva.vercel.app/)

Ao decorrer desse documento vou mostrando algumas implementações, recursos e técnincas utilizadas em cada uma e justificativa.

## Principais tecnologias

- **React**: Biblioteca para construção de interfaces
- **TypeScript**: Tipagem estática para aumentar a segurança do código
- **Vite**: Build tool para desenvolvimento rápido (Decisão pessoal por já ter experiência no desenvolvimento de aplicações `SPA` utilizando o `Vite`)
- **Tailwind CSS**: Framework CSS para estilização (Escolhido por ter experiência com sua sintaxe)
- **React Query**: Gerenciamento de estado para dados remotos
- **Zustand**: Gerenciamento de estado global da aplicação
- **Jest e React Testing Library**: Suíte de testes automatizados
- **Formik + YUP**: Criação e validação de formulários
- **React Data Table Component**: Implementação de grid de dados com filtros e paginação (Utilizei em diversos projetos e acompanho sua evolução a algum tempo)

Alguns recursos requisitos para o teste podem ser encontrados em algumas partes da aplicação:

- Zustand: Utilizado no fluxo de autenticação para compartilhar o estado global da aplicação, outra implementação interessante foi utilizar o recurso `persist` que guarda o estado do carrinho de compras no `localStorage` automaticamente.
- Formik + YUP: Utilizados na tela de login para validar os dados de acesso do usuário e retornar feedback na tela, também utilizado na área administrativa no cadastro e edição de produtos.
- React Query: Em conjunto com o `Axios` foi utilizado em todas as requisições da aplicação utilizando o recurso de `cache` nativo da lib.
- Axios: Utilizado juntamente com o `React Query`, um ponto interessante é a configuração dos `interceptors` que adicionam o `token` de autenticação em todas as requisições.

Existem mais algumas implementações interessantes que gostaria de ressaltar como o `useToken` que manipula o `localStorage`, o uso de `Url State` onde guardamos a estado da tela na url em algumas partes da aplicação e diversos outros componentes interessantes que compõe a aplicação.

## Estrutura do Projeto

```
src/
├── @types/        # Definições de tipos TypeScript
├── components/    # Componentes React reutilizáveis
├── hooks/         # Custom hooks (useAuth, useUser, useProducts)
├── pages/         # Páginas da aplicação
│   ├── Home/
│   ├── Product/
│   ├── Admin/
│   └── ...
├── services/      # Serviços de API
├── stores/        # Estados globais com Zustand
└── styles/        # Estilos globais
```

## Diferentes ambientes da aplicação

[Fake Store](https://fake-store-aiva.vercel.app/)

A implementação foi seguindo a documentação da [Platzi Fake Store API](https://fakeapi.platzi.com/en/about/introduction/) então decidi implementar recursos mesclando os requisitos do desafio com o que a api disponibiliza, seguindo essa linha de raciocínho optei por desenvolver 2 ambientes, o primeiro simulando a loja virtual e a segunda a área administrativa dessa loja.

### Loja virtual

![image](https://github.com/user-attachments/assets/a9e7f02f-e2b2-4d71-82e4-45938bee2477)

- Exbibição de produtos
- Visualização detalhada de produtos
- Filtragem por categorias
- Carrinho de compras

### Área administrativa

[Área administrativa](https://fake-store-aiva.vercel.app/admin)

Para acessar a área administrativa, é necessário utilizar o usuário e senha disponibilizados na documentação da api:

```
Email: john@mail.com
Password: changeme
```

![image](https://github.com/user-attachments/assets/c423c30e-7670-4101-80c6-3b4d9a9748dd)

![image](https://github.com/user-attachments/assets/8ce7811f-b088-4d72-a08a-78c1c21204f8)

- Autenticação de usuário
- Exemplo de dashboard exibindo gráfico `produtos x categoria`
- Listagem de produtos cadastrados
- Cadastro e edição de novos produtos com upload de imagens

## Instalação e Uso

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/fake-store.git
cd fake-store
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

E preencha as variáveis necessárias no arquivo .env

4. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

## Testes

Para rodar os testes automatizados:

```bash
npm test
```

Para verificar a cobertura:

```bash
npm run test:coverage
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera a versão de produção
- `npm run lint`: Executa o linter no código
- `npm run preview`: Visualiza a versão de produção localmente
- `npm test`: Executa os testes unitários

## Testes e Qualidade

O projeto possui testes unitários utilizando Jest e React Testing Library, com foco em garantir o funcionamento correto dos componentes, hooks e lógicas da aplicação.

A estrutura de testes segue as melhores práticas, incluindo mocks para dependências externas como React Router e React Query.
