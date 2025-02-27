# Back-end Developer Interview Project

A project to create an API service that provides histogram data for each column in the `Projection2021.csv` file.

## Quick Start

Clone the repo:

```bash
git clone <repository-url>
cd back-end-interview
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Table of Contents

- [Back-end Developer Interview Project](#back-end-developer-interview-project)
  - [Quick Start](#quick-start)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Commands](#commands)
  - [Environment Variables](#environment-variables)
  - [Project Structure](#project-structure)
  - [API Documentation](#api-documentation)
    - [API Endpoints](#api-endpoints)
  - [Error Handling](#error-handling)
  - [Validation](#validation)
  - [Testing](#testing)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **SQL database**: PostgreSQL object data modeling using Prisma ORM.
- **Validation**: Request data validation using Joi.
- **Logging**: Using winston and morgan.
- **Error handling**: Centralized error handling mechanism.
- **API documentation**: With swagger-ui-express.
- **Docker support**: Containerized application using Docker.

## Commands

Running locally:

```bash
npm run db:start
npm run start
```

Running in development mode:

```bash
npm run dev
```

Testing:

```bash
# run all tests
npm run test

# run all tests in watch mode
npm run test:watch
```

Docker:

```bash
# run docker container in development mode
npm run docker:dev

# run docker container in production mode
npm run docker:prod

# start postgres docker service
npm run db:start

# stop postgres docker service
npm run db:stop
```

Linting:

```bash
# run ESLint
npm run lint

# fix ESLint errors
npm run lint:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Node environment
NODE_ENV=dev

# Port number
PORT=3000

# URL of the PostgreSQL database
DATABASE_URL=postgresql://postgres:password@localhost:5432/test_db?schema=public
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.ts          # Express app
 |--index.ts        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is automatically generated using the swagger definitions.

### API Endpoints

List of available routes:

**Projection routes**:\
`GET /v1/projection/:column/histogram` - get histogram for a column

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`).

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

## Validation

Request data is validated using Joi. Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```typescript
import express from "express";
import validate from "../../middlewares/validate";
import projectionValidation from "../../validations/projection.validation";
import projectionController from "../../controllers/projection.controller";

const router = express.Router();

router.get(
  "/projection/:column/histogram",
  validate(projectionValidation.getHistogram),
  projectionController.getHistogram
);
```

## Testing

To run the tests, use the following command:

```bash
npm test
```

## Data source

Projection2021.csv - sourced from the "USDA Agricultural Baseline Database" for the current year projections https://www.ers.usda.gov/media/u55iwexw/projection2021.zip
