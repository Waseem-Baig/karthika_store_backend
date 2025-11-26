# Karthika Secure Shop - Backend API

Backend API for the Karthika Secure Shop e-commerce platform specializing in security cameras, CCTV systems, and surveillance equipment.

## 🚀 Features

- **Express.js REST API** - Fast and scalable Node.js server
- **MongoDB Database** - NoSQL database with Mongoose ODM
- **JWT Authentication** - Secure user authentication and authorization
- **Role-based Access Control** - Admin and user roles
- **File Upload** - Multer integration for product images
- **Security** - Helmet middleware for secure HTTP headers
- **CORS Enabled** - Cross-origin resource sharing
- **Request Logging** - Morgan middleware for logging
- **Environment Configuration** - dotenv for environment variables
- **Cart System** - Database-backed shopping cart with session support

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd karthika-secure-shop/backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**

Create a `.env` file in the backend directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/karthika-secure-shop
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

4. **Seed the database (optional):**

```bash
node seedCables.js
node seedNetworking.js
node seedStorage.js
```

5. **Start the server:**

Development mode with auto-reload:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server will be running at `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/              # Configuration files
├── controllers/         # Request handlers
│   ├── authController.js
│   ├── cameraController.js
│   ├── recorderController.js
│   ├── systemController.js
│   ├── solutionController.js
│   ├── cableController.js
│   ├── networkingController.js
│   ├── storageController.js
│   ├── cartController.js
│   ├── installationRequestController.js
│   └── quoteRequestController.js
├── middleware/          # Custom middleware
├── models/              # Mongoose schemas
│   ├── User.js
│   ├── Camera.js
│   ├── Recorder.js
│   ├── System.js
│   ├── Solution.js
│   ├── Cable.js
│   ├── Networking.js
│   ├── Storage.js
│   ├── Cart.js
│   ├── InstallationRequest.js
│   └── QuoteRequest.js
├── routes/              # API routes
│   ├── auth.js
│   ├── cameras.js
│   ├── recorders.js
│   ├── systems.js
│   ├── solutions.js
│   ├── cableRoutes.js
│   ├── networkingRoutes.js
│   ├── storageRoutes.js
│   ├── cartRoutes.js
│   ├── installationRequests.js
│   ├── quoteRequests.js
│   └── upload.js
├── scripts/             # Utility scripts
├── uploads/             # Uploaded product images
├── utils/               # Helper functions
├── .env                 # Environment variables (not in git)
├── .gitignore
├── package.json
├── README.md
└── server.js           # Entry point
```

## 🔌 API Endpoints

### Health Check

- `GET /` - Welcome message
- `GET /api/health` - Server health status

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Products

#### Cameras

- `GET /api/cameras` - Get all cameras (with filters)
- `GET /api/cameras/:id` - Get single camera
- `POST /api/cameras` - Create camera (Admin)
- `PUT /api/cameras/:id` - Update camera (Admin)
- `DELETE /api/cameras/:id` - Delete camera (Admin)

#### Recorders

- `GET /api/recorders` - Get all recorders
- `GET /api/recorders/:id` - Get single recorder
- `POST /api/recorders` - Create recorder (Admin)
- `PUT /api/recorders/:id` - Update recorder (Admin)
- `DELETE /api/recorders/:id` - Delete recorder (Admin)

#### Systems

- `GET /api/systems` - Get all systems
- `GET /api/systems/:id` - Get single system
- `POST /api/systems` - Create system (Admin)
- `PUT /api/systems/:id` - Update system (Admin)
- `DELETE /api/systems/:id` - Delete system (Admin)

#### Solutions

- `GET /api/solutions` - Get all solutions
- `GET /api/solutions/:id` - Get single solution
- `POST /api/solutions` - Create solution (Admin)
- `PUT /api/solutions/:id` - Update solution (Admin)
- `DELETE /api/solutions/:id` - Delete solution (Admin)

#### Cables

- `GET /api/cables` - Get all cables
- `GET /api/cables/:id` - Get single cable
- `POST /api/cables` - Create cable (Admin)
- `PUT /api/cables/:id` - Update cable (Admin)
- `DELETE /api/cables/:id` - Delete cable (Admin)

#### Networking

- `GET /api/networking` - Get all networking products
- `GET /api/networking/:id` - Get single networking product
- `POST /api/networking` - Create networking product (Admin)
- `PUT /api/networking/:id` - Update networking product (Admin)
- `DELETE /api/networking/:id` - Delete networking product (Admin)

#### Storage

- `GET /api/storage` - Get all storage products
- `GET /api/storage/:id` - Get single storage product
- `POST /api/storage` - Create storage product (Admin)
- `PUT /api/storage/:id` - Update storage product (Admin)
- `DELETE /api/storage/:id` - Delete storage product (Admin)

### Cart

- `GET /api/cart?sessionId=xxx` - Get cart by session ID
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `PUT /api/cart/update/:productId` - Update item quantity
- `DELETE /api/cart/clear` - Clear cart

### Requests

#### Installation Requests

- `GET /api/installation-requests` - Get all installation requests (Admin)
- `GET /api/installation-requests/:id` - Get single installation request
- `POST /api/installation-requests` - Create installation request
- `PUT /api/installation-requests/:id` - Update installation request (Admin)
- `DELETE /api/installation-requests/:id` - Delete installation request (Admin)

#### Quote Requests

- `GET /api/quote-requests` - Get all quote requests (Admin)
- `GET /api/quote-requests/:id` - Get single quote request
- `POST /api/quote-requests` - Create quote request
- `PUT /api/quote-requests/:id` - Update quote request (Admin)
- `DELETE /api/quote-requests/:id` - Delete quote request (Admin)

### File Upload

- `POST /api/upload` - Upload single image (Admin)
- `POST /api/upload/multiple` - Upload multiple images (Admin)

## 🔐 Environment Variables

| Variable      | Description                         | Default                              |
| ------------- | ----------------------------------- | ------------------------------------ |
| `MONGODB_URI` | MongoDB connection string           | `mongodb://localhost:27017/karthika` |
| `JWT_SECRET`  | Secret key for JWT token generation | (required)                           |
| `PORT`        | Server port                         | `5000`                               |
| `NODE_ENV`    | Environment mode                    | `development`                        |
| `CLIENT_URL`  | Frontend URL for CORS               | `http://localhost:5173`              |

## 🗄️ Database Models

- **User** - User accounts with authentication
- **Camera** - Security cameras with specifications
- **Recorder** - DVR/NVR systems
- **System** - Complete CCTV systems
- **Solution** - Custom security solutions
- **Cable** - Cables and connectors
- **Networking** - PoE switches, injectors, extenders
- **Storage** - HDDs, SSDs, MicroSD cards
- **Cart** - Shopping cart with session support
- **InstallationRequest** - Installation service requests
- **QuoteRequest** - Product quote requests

## 🧪 Seeding Data

Run the seed scripts to populate the database with sample products:

```bash
# Seed cables
node seedCables.js

# Seed networking products
node seedNetworking.js

# Seed storage products
node seedStorage.js
```

## 🔒 Authentication & Authorization

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the request cookies or Authorization header.

**Roles:**

- `user` - Regular customers
- `admin` - Administrators with full access

## 📝 License

ISC

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, email support@karthikasecureshop.com or open an issue in the repository.
