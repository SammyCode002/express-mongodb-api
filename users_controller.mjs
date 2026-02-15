// Samuel Dameg

import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as users from './users_model.mjs';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

const ERROR_NOT_FOUND = { Error: "Not found" };

app.listen(PORT, async () => {
    await users.connect()
    console.log(`Server listening on port ${PORT}...`);
});



/**
 * Create a new user with the query parameters provided in the body
 */
app.post('/users', asyncHandler(async (req, res) => {
    const user = await users.createUser(req.body.name, 
                            req.body.age, 
                            req.body.email,
                            req.body.phoneNumber);
    res.status(201).json(user);
}));

/**
 * GET /users - Retrieve all users or filter by query parameters
 */
app.get('/users', asyncHandler(async (req, res) => {
    // Build filter object from query parameters
    const filter = {};
    if (req.query.name !== undefined) {
        filter.name = req.query.name;
    }
    if (req.query.age !== undefined) {
        filter.age = req.query.age;
    }
    if (req.query.email !== undefined) {
        filter.email = req.query.email;
    }
    if (req.query.phoneNumber !== undefined) {
        filter.phoneNumber = req.query.phoneNumber;
    }
    
    const result = await users.findUsers(filter);
    res.status(200).json(result);
}));

/**
 * GET /users/:id - Retrieve a single user by ID
 */
app.get('/users/:id', asyncHandler(async (req, res) => {
    const user = await users.findUserById(req.params.id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));

/**
 * PUT /users/:id - Update a user by ID
 */
app.put('/users/:id', asyncHandler(async (req, res) => {
    const updates = {};
    if (req.body.name !== undefined) {
        updates.name = req.body.name;
    }
    if (req.body.age !== undefined) {
        updates.age = req.body.age;
    }
    if (req.body.email !== undefined) {
        updates.email = req.body.email;
    }
    if (req.body.phoneNumber !== undefined) {
        updates.phoneNumber = req.body.phoneNumber;
    }
    
    const user = await users.updateUser(req.params.id, updates);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));

/**
 * DELETE /users - Delete users by query parameter
 */
app.delete('/users', asyncHandler(async (req, res) => {
    // Build filter object from query parameter
    const filter = {};
    if (req.query.name !== undefined) {
        filter.name = req.query.name;
    }
    if (req.query.age !== undefined) {
        filter.age = req.query.age;
    }
    if (req.query.email !== undefined) {
        filter.email = req.query.email;
    }
    if (req.query.phoneNumber !== undefined) {
        filter.phoneNumber = req.query.phoneNumber;
    }
    
    const result = await users.deleteUsers(filter);
    res.status(200).json(result);
}));

/**
 * DELETE /users/:id - Delete a single user by ID
 */
app.delete('/users/:id', asyncHandler(async (req, res) => {
    const user = await users.deleteUserById(req.params.id);
    if (user) {
        res.status(204).send();
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));
