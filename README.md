# Saraha Backend

This is the backend for the Saraha application. It is built using Node.js, Express, and MongoDB (via Mongoose).

## Overview

A Node.js backend providing user authentication and messaging features. It uses JWT for authentication and bcrypt for password hashing.

## Features

- REST API built with Express.js
- MongoDB database integration using Mongoose
- Environment variable configuration with `dotenv`
- User authentication utilizing `jsonwebtoken` (JWT)
- Password hashing with `bcrypt`

## Dependencies

- express
- mongoose
- jsonwebtoken
- bcrypt
- dotenv
- crypto

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB instance running

### Installation

1. Clone the repository and navigate to the project directory:

```bash
cd saraha
```

2. Install the dependencies:

```bash
npm install
```

3. Configure environment variables. 
Ensure you have a `.env` file in the root of the project with necessary configuration values:
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- etc.

### Running the Application

To run the application in development mode with watch enabled:

```bash
npm run dev
```

The application will start using `node --watch .` with `src/index.js` as the entry point.
