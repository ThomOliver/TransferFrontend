# Transfer Service - Frontend

# Visão Geral

Este projeto é um frontend para gerenciar operações de transferência. Ele é construído usando React, TailwindCSS e outras tecnologias web modernas. Abaixo, você encontrará detalhes sobre a estrutura do projeto, instruções de configuração e funcionalidades.

---

## Documentação
https://www.notion.so/Transfer-Service-16be0bb4388a806ba3feed64f39647d7?pvs=4

---

## Estrutura do Projeto

---

A estrutura de diretórios do projeto é organizada da seguinte forma:

```plaintext
frontend/
├── node_modules/           # Dependências do projeto
├── public/                 # Arquivos públicos estáticos
│   ├── favicon.ico         # Ícone do site
│   ├── index.html          # Template HTML
│   ├── manifest.json       # Arquivo de manifesto PWA
│   └── robots.txt          # Padrão de exclusão de robôs
├── src/                    # Código-fonte principal
│   ├── components/         # Componentes reutilizáveis do React
│   │   ├── CreateTransferForm.jsx # Componente para criar transferências
│   │   └── TransferList.jsx       # Componente para listar e visualizar transferências
│   ├── context/            # Contexto React para gerenciamento de estado
│   │   └── TransferContext.js     # Provedor de contexto de transferências
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.jsx              # Página inicial
│   │   ├── ListTransfers.jsx     # Página para listar transferências
│   │   └── Transfers.jsx         # Página para criar transferências
│   ├── services/           # Manipuladores de serviços de API
│   │   └── api.js                # Configuração da API Axios
│   ├── styles/             # Estilos globais e específicos dos componentes
│   │   └── index.css             # Arquivo principal do TailwindCSS
│   ├── App.js              # Componente principal da aplicação
│   ├── index.js            # Ponto de entrada da aplicação
│   └── reportWebVitals.js  # Monitoramento de performance
├── .gitignore              # Arquivo Git ignore
├── Dockerfile              # Configuração Docker
├── package-lock.json       # Arquivo de bloqueio de dependências
├── package.json            # Metadados e scripts do projeto
├── README.md               # Documentação do projeto
└── tailwind.config.js      # Configuração do TailwindCSS
```

---

## Funcionalidades

### 1. **Página Inicial**
   - Tela de boas-vindas com opções de navegação para criar ou listar transferências.

### 2. **Criar Transferência**
   - Formulário para criar uma nova transferência.
   - Validações usando `react-hook-form` e `yup`.

### 3. **Lista de Transferências**
   - Exibe uma lista de todas as transferências.
   - Clicar em uma transferência exibe informações detalhadas.

### 4. **Gerenciamento de Estado**
   - `TransferContext` gerencia o estado global das transferências.
   - Lida com a busca, criação e exibição de detalhes de transferências.

## Pré-requisitos

- Node.js (>=18.x)
- npm (>=9.x)

---

## Rodar projeto com Docker Compose

Criar pasta transferProject com as pastas TransferBackend, TransferFrontend dentro da pasta raiz (transferProject), junto com os arquivos .env, docker-compose.yml. exemplo Abaixo.

```plaintext
transferProject/
├── TransferBackend/      # Código do Back-end
│   ├── Dockerfile        # Dockerfile do Back-end
├── TransferFrontend/     # Código do Front-end
│   ├── Dockerfile        # Dockerfile do Front-end
├── docker-compose.yml    # Configuração do Docker Compose
├── .env                  # Variáveis de ambiente

```

### Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```env
DB_NAME=transferdb
DB_USER=postgres
DB_PASSWORD=Baraco12
DB_HOST=localhost
DB_PORT=5432
DB_NAME_TEST=transferTextdb
PORT=4000
```

### Arquivo `docker-compose.yml`

```yaml
version: "3.8"
services:
  app:
    build:
      context: ./TransferBackend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      DB_NAME: ${DB_NAME}
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_HOST: db
      DB_PORT: 5432
      NODE_ENV: production
    depends_on:
      - db
    volumes:
      - ./TransferBackend:/app
    command: npm run dev

  db:
    image: postgres:15
    container_name: postgres_transfer_service
    restart: always
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

  frontend:
    build:
      context: ./TransferFrontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      REACT_APP_API_URL: "http://app:4000"
    depends_on:
      - app
    volumes:
      - ./TransferFrontend:/app
                - /app/node_modules
    stdin_open: true
    tty: true

volumes:
  db_data:

```

---

## Instruções para Execução

### Passo 1: Inicializar os contêineres

Execute o seguinte comando para iniciar os serviços:

```bash
docker-compose up --build
```

### Passo 2: Acessar os serviços

- **Backend**: Acesse `http://localhost:4000`
- **Frontend**: Acesse `http://localhost:3000`

## Configuração

### TailwindCSS
- Personalize os estilos em `tailwind.config.js`.
- Estilos globais estão definidos em `src/styles/index.css`.

---

## Dependências

### Dependências Principais
- **React**: ^18.3.0
- **React Router DOM**: ^7.1.1
- **Axios**: ^1.7.9
- **React Hook Form**: ^7.54.2
- **Yup**: ^1.6.1

### Dependências de Desenvolvimento
- **TailwindCSS**: ^3.4.17
- **PostCSS**: ^8.4.49
- **Autoprefixer**: ^10.4.20
