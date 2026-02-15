# Express MongoDB REST API

A RESTful API built with Express.js and MongoDB for managing users. Implements full CRUD operations with Mongoose ODM.

## Features

- Create, Read, Update, Delete users
- Filter users by query parameters (name, age, email, phoneNumber)
- MongoDB Atlas cloud database
- MVC architecture (Model-View-Controller)

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users` | Create a new user |
| GET | `/users` | Get all users (supports query filters) |
| GET | `/users/:id` | Get a single user by ID |
| PUT | `/users/:id` | Update a user by ID |
| DELETE | `/users` | Delete users by query parameter |
| DELETE | `/users/:id` | Delete a single user by ID |

## User Schema
```javascript
{
  name: String,       // Required
  age: Number,        // Required
  email: String,      // Required
  phoneNumber: Number // Optional
}
```

## Setup

1. Clone the repo
2. Run `npm install`
3. Create a `.env` file (see `.env.example`)
4. Add your MongoDB connection string
5. Run `npm start`

## Example Requests

**Create a user:**
