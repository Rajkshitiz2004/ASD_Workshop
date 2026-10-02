# Products API — ASD Workshop

A simple Express.js REST API with **layered architecture** and **caching middleware**.

---

## 📁 Project Structure

```
kshitiz_ASD_Workshop/
├── .gitignore
├── package.json
├── server.js
├── README.md
└── src/
    ├── database/
    │   ├── db.json              # JSON file-based data store
    │   └── products.js          # Database access layer (reads/writes db.json)
    ├── middleware/
    │   └── cache.js             # Caching middleware (TTL, HIT/MISS headers, invalidation)
    ├── services/
    │   └── productService.js    # Business logic / service layer
    ├── controllers/
    │   └── productController.js # Request/response handling layer
    └── routes/
        └── productRoutes.js     # Route definitions
```

---

## 🔄 Request Flow (Layered Architecture)

```
Route → Middleware (Cache) → Controller → Service → Database (db.json)
```

| Layer        | File                          | Responsibility                                      |
| ------------ | ----------------------------- | --------------------------------------------------- |
| **Route**    | `src/routes/productRoutes.js` | Defines endpoints, attaches middleware               |
| **Middleware**| `src/middleware/cache.js`     | Caches GET responses, sets HIT/MISS headers, 1-min TTL |
| **Controller**| `src/controllers/productController.js` | Handles req/res, calls service, triggers cache invalidation |
| **Service**  | `src/services/productService.js` | Business logic layer                              |
| **Database** | `src/database/products.js`    | Reads/writes data from `db.json`                    |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)

### Installation

```bash
npm install
```

### Start the Server

```bash
npm start
```

Server runs at **http://localhost:3000**

### Development Mode (auto-restart on changes)

```bash
npm run dev
```

---

## 📡 API Endpoints

### Base URL: `http://localhost:3000`

| Method   | Endpoint          | Description              |
| -------- | ----------------- | ------------------------ |
| `GET`    | `/products`       | Get all products         |
| `GET`    | `/products/:id`   | Get a product by ID      |
| `POST`   | `/products`       | Create a new product     |
| `PUT`    | `/products/:id`   | Update a product (full)  |
| `PATCH`  | `/products/:id`   | Update a product (partial) |
| `DELETE` | `/products/:id`   | Delete a product         |

---

## 🧪 Example Requests

### GET all products

```bash
curl -i http://localhost:3000/products
```

### GET a single product

```bash
curl -i http://localhost:3000/products/1
```

### POST — Create a new product

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Keyboard", "price": 29.99, "category": "Electronics"}'
```

### PUT — Update a product

```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Gaming Laptop", "price": 1499.99, "category": "Electronics"}'
```

### PATCH — Partially update a product

```bash
curl -X PATCH http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 899.99}'
```

### DELETE — Delete a product

```bash
curl -X DELETE http://localhost:3000/products/1
```

---

## ⚡ Caching

### How It Works

- **GET requests** are cached using an in-memory `Map`.
- Each cache entry has a **TTL (Time to Live) of 1 minute**.
- The `X-Cache` response header indicates:
  - `HIT` — Response served from cache.
  - `MISS` — Response fetched from database and stored in cache.
- **POST, PUT, PATCH, DELETE** requests that successfully modify data will **invalidate all cache entries** to prevent stale data.

### Example — Observing Cache Behavior

```bash
# First request — X-Cache: MISS
curl -i http://localhost:3000/products

# Second request (within 1 min) — X-Cache: HIT
curl -i http://localhost:3000/products

# Create a product — cache is invalidated
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Mouse", "price": 19.99, "category": "Electronics"}'

# Next GET — X-Cache: MISS (cache was cleared)
curl -i http://localhost:3000/products
```

---

## 💾 Database

Data is stored in `src/database/db.json` as a JSON file. The initial dataset contains:

| ID | Name       | Price   | Category    |
| -- | ---------- | ------- | ----------- |
| 1  | Laptop     | 999.99  | Electronics |
| 2  | Headphones | 49.99   | Electronics |
| 3  | Coffee Mug | 12.99   | Kitchen     |
| 4  | Notebook   | 5.99    | Stationery  |
| 5  | Backpack   | 79.99   | Accessories |

All CRUD operations read from and write to this file, so data **persists** across server restarts.

---

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** JSON file (`db.json`)
- **Caching:** Custom in-memory middleware with TTL
