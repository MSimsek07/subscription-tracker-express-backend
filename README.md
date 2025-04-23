# Subscription Backend Node.js Project

Welcome to my journey of building a subscription backend using Node.js, Express, and MongoDB! This README documents my development process, learnings, and project structure.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Development Journey](#development-journey)
3. [Project Structure](#project-structure)
4. [Environment Configuration](#environment-configuration)
5. [Database Setup](#database-setup)
6. [Models](#models)
7. [Error Handling](#error-handling)
8. [Authentication & Authorization](#authentication--authorization)
9. [Testing Endpoints](#testing-endpoints)
10. [Notes & Learnings](#notes--learnings)

---

## Project Overview
A Node.js backend for managing user subscriptions, featuring authentication, authorization, and MongoDB integration.

---

## Development Journey

### 1. Project Initialization
- Used `npx express-generator --no-view --git ./` to scaffold the project.
- Installed `nodemon` for development and set up scripts in `package.json`.
- Configured ES6 module support with `"type": "module"` in `package.json`.

### 2. Linting
- Initialized ESLint with `npx eslint --init` for code quality.

### 3. Environment Variables
- Installed `dotenv`.
- Created a `config` folder and added `env.js`.
- Created `.env.development.local` and `.env.production.local` for environment variables.
- Set development port in `.env.development.local` (e.g., `PORT=5500`).
- Ensured `.en.*.local` is in `.gitignore`.

### 4. Routing
- Created a `routes` folder and defined endpoints (e.g., `auth.routes.js`).
- Imported routes in `app.js`.

### 5. Database Setup
- Chose MongoDB Atlas for the database.
- Installed `mongodb` and `mongoose`.
- Stored the connection string in `.env.development.local` and exported it in `env.js`.
- Created a `database` directory and `mongodb.js` for the connection logic.
- Connected to the database in `app.js`.

### 6. Models
- Created models (blueprints) in the `models` directory (e.g., `user.model.js`).

### 7. Error Handling
- Implemented centralized error handling middleware in `middlewares/error.middleware.js`.
- Imported and used error handling middleware in `app.js`.
- Utilized built-in Express middlewares (cookieParser, urlencoded, json parser, etc.).

### 8. Authentication & Authorization
- Installed `jsonwebtoken` and `bcryptjs` for authentication.
- Added `JWT_SECRET` and `JWT_EXPIRES_IN` to `.env.development.local`.
- Created controllers in the `controllers` directory (e.g., `auth.controller.js`).
- Tested endpoints using Postman/Thunder Client.
- Noted a learning: Password validation must be handled before hashing, as hashing bypasses model validation for weak passwords. Added regex checks for password strength in the controller.
- Implemented authorization by fetching user data from the database (e.g., in `user.controller.js`).

### 9. Security & Role-Based Access Improvements
- Added a `role` field to the user model, supporting both `user` and `admin` roles.
- Updated user registration logic to allow setting the role to `admin` only if explicitly provided; otherwise, defaults to `user`.
- Implemented admin-only access for fetching all users: only authenticated admins can access the GET `/users` endpoint.
- Secured the GET `/users/:id` endpoint so only the user themselves or an admin can access specific user info.
- Refactored authorization logic into a reusable `authorizeSelfOrAdmin` middleware for cleaner routes and better maintainability.

---

## Project Structure
```
app.js
config/
  env.js
controllers/
  auth.controller.js
  user.controller.js
database/
  mongodb.js
middlewares/
  error.middleware.js
  auth.middleware.js
models/
  subscription.model.js
  user.model.js
routes/
  auth.routes.js
  subscription.routes.js
  user.routes.js
```

---

## Environment Configuration
- Store sensitive data in `.env.*.local` files.
- Use `dotenv` and `config/env.js` to load environment variables.

---

## Database Setup
- Use MongoDB Atlas for cloud database.
- Store connection string in environment variables.
- Use `mongoose` for ODM.

---

## Models
- Define data blueprints in the `models` directory.
- Example: `user.model.js`, `subscription.model.js`.

---

## Error Handling
- Centralized error handling in `middlewares/error.middleware.js`.
- Use Express built-in middlewares for parsing and cookies.

---

## Authentication & Authorization
- Use JWT for authentication and `bcryptjs` for password hashing.
- Validate password strength before hashing.
- Store JWT secrets in environment variables.

---

## Testing Endpoints
- Use Postman or Thunder Client to test API endpoints.

---

## Notes & Learnings
- Always validate passwords before hashing.
- Centralized error handling improves debugging.
- Keep environment variables out of version control.
- Modularize code for maintainability.

---

_This README is a living document and will be updated as development progresses._





