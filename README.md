# 📦 Inventory CQRS API

## 📝 Project Description
Inventory CQRS API is a backend application for managing products, customers, orders, and inventory levels.  
The project uses **CQRS architecture** and elements of **DDD**, ensuring clean business logic, high testability, and easy extensibility.

---

## 🧰 Requirements
- Node.js (LTS) — https://nodejs.org  
- Git — https://git-scm.com  
- MongoDB Community Edition **or** Docker

### MongoDB locally:
https://www.mongodb.com/try/download/community

### MongoDB via Docker:
```bash
docker run -d --name mongo -p 27017:27017 mongo:6
```

---

## 📥 Installation

Clone the repository:

```bash
git clone <URL_TO_REPOSITORY>
cd inventory-cqrs-api
```

Install dependencies:

```bash
npm install
```

---

## ⚙️ Environment Configuration

Create a `.env` file:

```
MONGO_URI=mongodb://localhost:27017/inventory
PORT=3000
HOLIDAY_CATEGORIES="category1,category2"
```

---

## ▶️ Running the Application

### Development mode:
```bash
npm run dev
```

### Production mode:
```bash
npm run build
npm start
```

The application will be available at:

```
http://localhost:3000
```

---

## 🧪 Tests

### Unit tests:
```bash
npm run test
```

### Integration tests:
```bash
npm run test:integration
```

Integration tests use MongoMemoryServer, so no local database is required.

---

## 🗂️ Project Structure

```
src/
  application/
    common/          
    products/        
    customers/
    orders/
  domain/
    products/
    customers/
    orders/
    pricing/
  infrastructure/
    repositories/
  interfaces/
    http/
      routes/
      middleware/
tests/
  unit/
  integration/
```

---

## 🧠 How CQRS Works

### Commands (modify state):
- CreateProduct  
- RestockProduct  
- SellProduct  
- CreateOrder  

### Queries (read data):
- GetProducts  

CommandBus and QueryBus separate responsibilities, simplifying logic and testing.

---

## 📡 API Endpoints

### Products
- `GET /products`
- `POST /products`
- `POST /products/:id/restock`
- `POST /products/:id/sell`

### Customers
- `POST /customers`

### Orders
- `POST /orders`

---

# 🧪 Testing Endpoints in Postman

Below are ready‑to‑use Postman examples you can paste directly into your requests.

---

## 📦 1. Products

### 1.1. Create a product

**POST**  
```
http://localhost:3000/products
```

**Body (JSON):**
```json
{
  "name": "Test Bike",
  "description": "Example",
  "price": 4500,
  "stock": 20,
  "category": "BIKES"
}
```

---

### 1.2. Get product list

**GET**  
```
http://localhost:3000/products
```

---

### 1.3. Restock product

**POST**  
```
http://localhost:3000/products/<PRODUCT_ID>/restock
```

**Body (JSON):**
```json
{
  "amount": 10
}
```

---

### 1.4. Sell product

**POST**  
```
http://localhost:3000/products/<PRODUCT_ID>/sell
```

**Body (JSON):**
```json
{
  "amount": 5
}
```

---

## 👤 2. Customers

### 2.1. Get customers list

**GET**  
```
http://localhost:3000/customers
```

---

### 2.2. Create customer

**POST**  
```
http://localhost:3000/customers
```

**Body (JSON):**
```json
{
  "name": "Test Customer",
  "location": "US"
}
```

---

## 🧾 3. Orders

### 3.1. Get orders list

**GET**  
```
http://localhost:3000/orders
```

---

### 3.2. Create order

**POST**  
```
http://localhost:3000/orders
```

**Body (JSON):**
```json
{
  "customerId": "<CUSTOMER_ID>",
  "products": [
    {
      "productId": "<PRODUCT_ID>",
      "quantity": 1
    }
  ]
}
```
