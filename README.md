# Backend Application
This is the backend service for managing the basys ai Patient dashboard. Built using Node.js and Express, the API serves as the foundation for Patient dahboard, allowing.

## Features
- Authentication using JWT token and cookies.
- Integeration with MongoDB
- Patient CRUD operation (To fetch or add patient).
- Prioir authorization request CRUD operation (To fetch or add request).

## Tech Stack
- Runtime environment: NodeJS
- Web framework: ExpressJS
- Database: MongoDB
- Authentication: JWT
- ORM: mongoose

# Getting started
## Prerequisites
- Node.js (>= v14.x.x)
- npm or yarn
- MongoDB/PostgreSQL/MySQL (or any other database)

## Installation
- Clone the repository:
```
git clone https://github.com/AkshitGuptaIITR/basys-ai-backend.git
cd basys-ai-backend
```
- Install dependencies:
```
npm install
```
- Set up environment variables by creating a .env file in the root directory:
```
cp Sample.env .env
```

## Running the Application
### Development Mode
To start the application in development mode, run:
```
npm run dev
# or if using yarn
yarn dev
```
This will start the server with automatic reloading using nodemon.

### Production Mode
To start the application in production mode, run:
```
npm start
```
This will run the application without reloading.

## Environment Variables
The following environment variables need to be set up in the .env file:
```
ENVIRONMENT=
PORT=
DATABASE=
DATABASE_PASSWORD=
JWT_SECRET=

CLIENT_URL=
```
