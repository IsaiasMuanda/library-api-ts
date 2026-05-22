# Bookstore API

REST API para uma livraria com sistema de compra e aluguer de livros.

## Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Linguagem:** TypeScript
- **Base de dados:** MongoDB + Mongoose
- **Dependency Injection:** Inversify
- **Validação:** Zod
- **Autenticação:** JWT
- **Segurança:** express-rate-limit

## Módulos

- [x] Auth
- [x] User
- [x] Author
- [x] Book
- [x] Cart
- [x] Reservation
- [x] Job de expiração de reservas

## Instalação

### Pré-requisitos

- Node.js
- MongoDB

### Passos

```bash
# Clonar o repositório
git clone <url-do-repositório>

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Preencher os valores no .env

# Iniciar em desenvolvimento
npm run dev
```

## Variáveis de Ambiente

```env
# Server
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/bookstore

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Email
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_user
SMTP_PASS=your_mailtrap_pass
EMAIL_FROM="Bookstore <noreply@bookstore.com>"

# Regras de negócio
RESERVATION_EXPIRE_HOURS=48
RENTAL_DAYS_LIMIT=14
```

## Endpoints

### Auth — `/api/auth`

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/auth/signup` | Registar utilizador | — |
| POST | `/api/auth/login` | Login. Devolve JWT | — |
| GET | `/api/auth/me` | Dados do utilizador autenticado | JWT |

### User — `/api/users`

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/users` | Listar todos os utilizadores | Admin |
| GET | `/api/users/:id` | Obter utilizador por ID | Admin |
| PUT | `/api/users/:id` | Actualizar utilizador | Admin |
| DELETE | `/api/users/:id` | Eliminar utilizador | Admin |

### Author — `/api/authors`

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/authors` | Listar autores. Query: `page`, `limit`, `sort`, `order` | — |
| GET | `/api/authors/:id` | Obter autor por ID | — |
| POST | `/api/authors` | Criar autor | Admin |
| PUT | `/api/authors/:id` | Actualizar autor | Admin |
| DELETE | `/api/authors/:id` | Eliminar autor | Admin |

### Book — `/api/books`

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/books` | Listar livros. Query: `genero`, `titulo`, `autor`, `anoPublicacao`, `type`, `minPreco`, `maxPreco`, `page`, `limit` | — |
| GET | `/api/books/:id` | Obter livro por ID | — |
| POST | `/api/books` | Criar livro | Admin |
| PUT | `/api/books/:id` | Actualizar livro | Admin |
| DELETE | `/api/books/:id` | Eliminar livro | Admin |

### Cart — `/api/cart`

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/cart` | Obter carrinho do utilizador | JWT |
| POST | `/api/cart/items` | Adicionar item. Body: `book`, `type`, `quantidade` | JWT |
| PATCH | `/api/cart/items/:bookId` | Actualizar quantidade. Body: `type`, `quantidade` | JWT |
| DELETE | `/api/cart/items/:bookId` | Remover item. Query: `?type=compra` | JWT |
| DELETE | `/api/cart` | Esvaziar carrinho | JWT |
| POST | `/api/cart/checkout` | Criar reserva e esvaziar carrinho | JWT |

### Reservation — `/api/reservations`

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/reservations` | Listar reservas. Admin vê todas, user vê as suas. Query: `status`, `page`, `limit` | JWT |
| GET | `/api/reservations/:id` | Obter reserva por ID | JWT |
| PATCH | `/api/reservations/:id/confirm` | Confirmar pagamento. Body: `pickUpDate` | Admin |
| PATCH | `/api/reservations/:id/cancel` | Cancelar reserva | JWT |

## Regras de Negócio

- Um utilizador só pode cancelar as suas próprias reservas com status `pendente`
- O admin pode cancelar qualquer reserva
- Reservas expiram automaticamente após 48 horas se não forem confirmadas
- O stock é libertado automaticamente quando uma reserva expira ou é cancelada
- O preço unitário é guardado como snapshot no momento da adição ao carrinho
- O mesmo livro pode estar no carrinho como compra e aluguer simultaneamente

## Arquitectura

O projecto segue uma arquitectura em camadas com responsabilidades bem definidas:

```
Controller → Service → Repository → Model
```

- **Controller** — recebe o request, extrai dados, chama o service, devolve resposta
- **Service** — aplica as regras de negócio, não conhece HTTP
- **Repository** — única camada que fala com o MongoDB
- **Model** — define o schema da colecção, zero lógica de negócio
