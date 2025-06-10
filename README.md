# Graph Project

A simple GraphQL API for managing books and authors, built with Node.js, TypeScript, MongoDB, and GraphQL.

## Features

- Add, delete, and query books and authors
- MongoDB for persistent storage
- TypeScript for type safety
- GraphQL API for flexible queries and mutations

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd Graph
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:

   ```
   DB_CONNECTION=mongodb://localhost:27017/graphdb
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Open [http://localhost:4000/graphql](http://localhost:4000/graphql) in your browser to access the GraphQL playground.

## Running with Docker Compose

1. Build and start the services:
   ```sh
   docker-compose up --build
   ```
2. The API will be available at [http://localhost:4000/graphql](http://localhost:4000/graphql)

3. To stop and remove the containers:

   ```sh
   docker-compose down
   ```

4. By default, the app connects to the MongoDB service defined in `docker-compose.yml` using the environment variable:
   ```
   DB_CONNECTION=mongodb://mongo:27017/graphdb
   ```

## .env.example

Create a `.env` file in your project root based on this example:

```
DB_CONNECTION=mongodb://localhost:27017/graphdb
```

## Scripts

- `npm run dev` — Start the server with hot-reloading (nodemon)
- `npm run start` — Start the server
- `npm run lint` — Run ESLint to check code style
- `npm run lint:fix` — Auto-fix lint issues

## Project Structure

```
src/
  graphql/
    mutations/
    queries/
    types/
  utils/
  assets/
  server.ts
.env.example
```

## Example GraphQL Queries

### Add a Book

```graphql
mutation {
  addBook(name: "1984", authorId: "AUTHOR_ID") {
    id
    name
    authorId
  }
}
```

### Delete a Book

```graphql
mutation {
  deleteBook(id: "BOOK_ID") {
    id
    name
  }
}
```

### Add an Author

```graphql
mutation {
  addAuthor(name: "George Orwell") {
    id
    name
  }
}
```

### Delete an Author

```graphql
mutation {
  deleteAuthor(id: "AUTHOR_ID") {
    id
    name
  }
}
```

### Get All Books

```graphql
{
  books {
    id
    name
    author {
      id
      name
    }
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/feature-name`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/feature-name`)
5. Open a pull request

## License

MIT

> **Note:** This project is a proof of concept and is not intended for production use. Security, scalability, and advanced error handling are out of scope.
