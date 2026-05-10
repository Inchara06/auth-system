# Authentication & Authorization System

## Introduction
This project is a backend authentication and authorization system developed using Node.js, Express.js, MongoDB, JWT, and bcrypt.

## Features
- User Registration
- User Login
- JWT Authentication
- Role-based Authorization
- Admin and Student Roles

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## API Endpoints

### Register User
POST /api/register

### Login User
POST /api/login

### Get All Users (Admin Only)
GET /api/users

### View Profile
GET /api/profile

### Update Profile
PUT /api/profile

### Delete User
DELETE /api/user/:id

## How to Run the Project

1. Install dependencies
npm install

2. Start MongoDB

3. Run the server
node server.js

## Output
The project successfully performs authentication and authorization using JWT tokens.