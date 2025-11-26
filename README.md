# Karthika Secure Shop - Backend

Backend API for the Karthika Secure Shop e-commerce platform.

## Features

- Express.js REST API
- MongoDB database integration
- JWT authentication
- Secure headers with Helmet
- CORS enabled
- Request logging with Morgan
- Environment variable configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

   - Copy `.env` file and update with your actual values
   - Required variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret key
     - `PORT`: Server port (default: 5000)

3. Start the server:

Development mode with auto-reload:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Endpoints

### Health Check

- `GET /` - Welcome message
- `GET /api/health` - Server health status

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders

- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (Admin)
- `DELETE /api/orders/:id` - Cancel order

### Users

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (Private)
- `PUT /api/users/profile` - Update user profile (Private)
- `GET /api/users` - Get all users (Admin)

## Project Structure

```
backend/
├── routes/
│   ├── products.js
│   ├── orders.js
│   └── users.js
├── models/          (to be created)
├── middleware/      (to be created)
├── controllers/     (to be created)
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Environment Variables

See `.env` file for all available configuration options.

## Next Steps

- Create MongoDB models
- Implement authentication middleware
- Add input validation
- Implement actual CRUD operations
- Add file upload functionality
- Integrate payment gateway

## License

ISC
