# URL Shortener

A minimal REST API for shortening URLs, built with **NestJS**, **Prisma**, and **PostgreSQL**.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Framework  | NestJS 11                         |
| ORM        | Prisma 7 (with `@prisma/adapter-pg`) |
| Database   | PostgreSQL                        |
| Language   | TypeScript 5                      |

---

## Prerequisites

- Node.js ≥ 18
- PostgreSQL running locally (or a remote connection string)

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/url-test"
```

> If your password contains special characters (e.g. `@`), URL-encode only the password portion.  
> Example: password `p@ss` → `postgresql://postgres:p%40ss@localhost:5432/url-test`

### 3. Generate Prisma client & run migrations

```bash
npx prisma migrate dev
```

### 4. Start the development server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`.

---

## API Endpoints

All routes are prefixed with `/url`.

### Shorten a URL

```
POST /url/shorten
```

**Request body:**

```json
{
  "originalUrl": "https://example.com/some/very/long/path"
}
```

**Response:**

```json
{
  "id": "uuid",
  "originalUrl": "https://example.com/some/very/long/path",
  "shortCode": "aB3xYz",
  "count": "0"
}
```

---

### Resolve a short code

```
GET /url/:code
```

Returns the original URL string for the given short code.

---

### Get click stats

```
GET /url/stats/:code
```

**Response:**

```json
{
  "originalUrl": "https://example.com/some/very/long/path",
  "clickCount": "5"
}
```

---

## Scripts

| Command              | Description                        |
|----------------------|------------------------------------|
| `npm run start:dev`  | Start in watch mode (development)  |
| `npm run start:prod` | Run compiled production build      |
| `npm run build`      | Compile TypeScript to `dist/`      |
| `npm run test`       | Run unit tests                     |
| `npm run test:e2e`   | Run end-to-end tests               |

---

## Project Structure

```
src/
├── common/
│   └── database/
│       └── prisma.service.ts   # Prisma client singleton
├── url/
│   ├── dto/
│   ├── url.controller.ts       # Route handlers
│   ├── url.service.ts          # Business logic
│   └── url.module.ts
├── app.module.ts
└── main.ts
prisma/
└── schema.prisma               # Database schema
```
