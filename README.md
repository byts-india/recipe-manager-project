# Recipe Manager — Backend API

A RESTful API for managing recipes, recipe categories, and cooking steps, with user authentication via JWT.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MongoDB (Mongoose v9) |
| Auth | JSON Web Tokens (jsonwebtoken) |
| Password Hashing | bcryptjs |
| Validation | Joi |
| Logging | Morgan |
| Config | dotenv |
| Dev Server | Nodemon |

---

## Features

- User registration and login
- Password hashing with bcrypt
- JWT-based session management
- Full CRUD for Recipes, Recipe Categories, and Steps
- Request payload validation with Joi
- MongoDB ObjectId validation middleware
- Static file serving from `public/`
- Consistent JSON response format across all endpoints

---

## Project Structure

```
back-end/
├── index.js                   # Entry point — starts server
├── package.json
├── public/
│   └── index.html             # Static HTML (served at /)
└── src/
    ├── app.js                 # Express app setup, route mounting
    ├── config/
    │   └── dbConfig.js        # MongoDB connection
    ├── controller/
    │   ├── userController.js
    │   ├── recipeController.js
    │   ├── recipeCategoryController.js
    │   └── stepsController.js
    ├── middleware/
    │   ├── verifyJwt.js       # JWT auth guard
    │   ├── validateId.js      # MongoDB ObjectId param validator
    │   └── validatePayload.js # Generic Joi body validator factory
    ├── model/
    │   ├── User.js
    │   ├── Recipe.js
    │   ├── RecipeCategory.js
    │   └── Steps.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── userRoutes.js
    │   ├── recipeRoutes.js
    │   ├── recipeCategoryRoutes.js
    │   └── stepsRoutes.js
    ├── service/
    │   ├── userService.js
    │   ├── recipeService.js
    │   ├── recipeCategoryService.js
    │   └── stepsService.js
    ├── utils/
    │   └── ResponseUtil.js    # successResponse / failureResponse helpers
    └── validators/
        ├── userValidator.js
        ├── recipeValidator.js
        ├── recipeCategoryValidator.js
        └── stepsValidator.js
```

---

## Environment Variables

Create a `.env` file inside `back-end/`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET_KEY=your_super_secret_key
```

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on (default: 5000) |
| `MONGODB_URI` | MongoDB connection string (local or Atlas) |
| `JWT_SECRET_KEY` | Secret used to sign and verify JWT tokens |

---

## Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/byts-india/recipe-manager-project.git
cd recipe-manager-project/back-end

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# then fill in your values

# 4. Start development server (auto-restarts on changes)
npm run dev

# 5. Start production server
npm start
```

Server runs at: `http://localhost:5000`
Health check: `GET http://localhost:5000/health`

---

## Data Models

### User
| Field | Type | Rules |
|---|---|---|
| `name.firstName` | String | — |
| `name.lastName` | String | — |
| `age` | Number | required, min: 5 |
| `email` | String | required, unique |
| `password` | String | required, hashed with bcrypt (salt 10) |

### Recipe
| Field | Type | Rules |
|---|---|---|
| `title` | String | required, minLength: 2 |
| `duration.value` | Number | default: 0 |
| `duration.units` | String | enum: `hour`, `minutes` |
| `image` | String | URL |
| `ingredients` | [String] | array of ingredient strings |
| `category_id` | ObjectId | ref to RecipeCategory |
| `steps` | [ObjectId] | refs to Steps |

### RecipeCategory
| Field | Type | Rules |
|---|---|---|
| `name` | String | required |
| `description` | String | — |

### Steps
| Field | Type | Rules |
|---|---|---|
| `order` | Number | min: 1, default: 1, indexed |
| `description` | String | — |
| `category` | String | enum: `START`, `MID`, `END` |

---

## API Endpoints

Base URL: `http://localhost:5000`

### Auth

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login and get a token | No |

**POST `/auth/register`** — Request body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 28,
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```

**POST `/auth/login`** — Request body:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```

---

### User

| Method | Endpoint | Description |
|---|---|---|
| GET | `/user/all` | Get all users |
| GET | `/user/all/age` | Get users by age range (body: `fromAge`, `toAge`) |
| GET | `/user/:id` | Get user by ID |
| PUT | `/user/email/:id` | Update user email |
| PUT | `/user/name/:id` | Update user name |
| PUT | `/user/age/:id` | Update user age |
| DELETE | `/user/:id` | Delete user |

---

### Recipe

| Method | Endpoint | Description |
|---|---|---|
| POST | `/recipe/` | Create a recipe |
| GET | `/recipe/all` | Get all recipes |
| GET | `/recipe/:id` | Get recipe by ID |
| PUT | `/recipe/:id` | Update recipe |
| DELETE | `/recipe/:id` | Delete recipe |

**POST `/recipe/`** — Request body:
```json
{
  "title": "Chocolate Chip Cookies",
  "duration": { "value": 30, "units": "minutes" },
  "image": "https://example.com/cookies.jpg",
  "ingredients": ["2 cups flour", "1 cup butter", "2 cups chocolate chips"],
  "category_id": "<recipeCategoryId>",
  "steps": ["<stepId1>", "<stepId2>"]
}
```

---

### Recipe Category

| Method | Endpoint | Description |
|---|---|---|
| POST | `/recipe-category/` | Create a category |
| GET | `/recipe-category/all` | Get all categories |
| GET | `/recipe-category/:id` | Get category by ID |
| PUT | `/recipe-category/:id` | Update category |
| DELETE | `/recipe-category/:id` | Delete category |

**POST `/recipe-category/`** — Request body:
```json
{
  "name": "Desserts",
  "description": "Sweet treats and dessert recipes"
}
```

---

### Steps

| Method | Endpoint | Description |
|---|---|---|
| POST | `/steps/` | Create a step |
| GET | `/steps/all` | Get all steps |
| GET | `/steps/:id` | Get step by ID |
| PUT | `/steps/:id` | Update step |
| DELETE | `/steps/:id` | Delete step |

**POST `/steps/`** — Request body:
```json
{
  "order": 1,
  "description": "Preheat oven to 350°F",
  "category": "START"
}
```

---

## Response Format

All endpoints return a consistent JSON structure.

**Success:**
```json
{
  "success": true,
  "message": "operation description",
  "data": { }
}
```

**Failure:**
```json
{
  "success": false,
  "message": "error description"
}
```

**Validation error (422):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["title must be at least 2 characters", "units must be either 'hour' or 'minutes'"]
}
```

---

## Middleware

### `verifyJwt`
Protects routes that require authentication. Reads the token from the `Authorization` header.

```
Authorization: Bearer <your_jwt_token>
```

Attaches the decoded payload to `req.user` for use in downstream handlers.

### `validateId`
Validates that `req.params.id` is a valid 24-character MongoDB ObjectId before hitting the controller. Returns `400` if invalid.

### `validatePayload(schema)`
A factory middleware — accepts a Joi schema and validates `req.body` against it. Returns `422` with an array of error messages if validation fails.

**Usage example:**
```js
const verifyJwt = require("../middleware/verifyJwt");
const validateId = require("../middleware/validateId");
const validatePayload = require("../middleware/validatePayload");
const { recipeSchema } = require("../validators/recipeValidator");

router.post("/", verifyJwt, validatePayload(recipeSchema), recipeController.create);
router.get("/:id", verifyJwt, validateId, recipeController.getById);
```

---

## Postman Collection

Import `Recipe_Manager_API.postman_collection.json` (at the project root) directly into Postman to get all endpoints pre-configured with dummy data and environment variables.

| Variable | Default Value |
|---|---|
| `baseUrl` | `http://localhost:5000` |
| `userId` | replace with real ID |
| `recipeId` | replace with real ID |
| `recipeCategoryId` | replace with real ID |
| `stepId` | replace with real ID |

