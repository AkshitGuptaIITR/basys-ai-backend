require("dotenv").config();

const config = {
  ENVIRONMENT: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE: process.env.DATABASE,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
};

module.exports = config;
