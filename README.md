# Gazeta Esportiva Frontend by Odds Scanner

This project is a React application built with TypeScript and managed with npm. It uses the T3 Stack and is bootstrapped with `create-t3-app`.

## Project Structure

The project has the following structure:

- `src/`: This is where all the source code of the application lives.
  - `app/`: Contains the main application code.
    - `api/trpc/[trpc]/route.ts`: Contains the tRPC routes.
    - `posts/`: Contains the page for displaying posts.
    - `_components/create-post.tsx`: Contains the component for creating a post.
  - `server/`: Contains the server-side code.
    - `api/root.ts`: The root file for the API.
    - `routers/post.ts`: Contains the router for posts.
  - `styles/globals.css`: Contains the global styles for the application.
- `public/`: Contains the static files that will be served by the application.
- `prisma/`: Contains the Prisma schema for the application.
- `.env.example`: An example environment file. You should copy this file to `.env` and fill in your own values.
- `package.json`: Contains the list of npm dependencies as well as build and test scripts.

## Main Tools and Libraries

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.
- [npm](https://www.npmjs.com/): A package manager for JavaScript.
- [T3 Stack](https://create.t3.gg/): A full-stack framework for building web applications.
- [Next.js](https://nextjs.org): A React framework for building JavaScript applications.
- [Prisma](https://prisma.io): An open-source database toolkit.
- [tRPC](https://trpc.io): A toolkit for building end-to-end typesafe APIs.

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```sh
git clone <repository-url>
cd <repository-name>
npm install
```

Then, copy the `.env.example` file to `.env` and fill in your own values.

Finally, run the development server:

```sh
npm run dev
```

open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the application in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the application for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run start`

Runs the application in production mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run lint`

Runs ESLint on the project.

### `npm run format`

Runs Prettier on the project.

### `npm run typecheck`

Runs the TypeScript compiler on the project.

### `npm run prisma studio`

Opens the Prisma Studio application.

## What's Included?

Your environment will have everything you need to build a modern single-page React application:

- React, JSX, and TypeScript support.
- Next.js for static and server rendering.
- Prisma for database access.
- tRPC for end-to-end type-safe APIs.
- Linting and formatting with ESLint and Prettier.
- Environment variables.

## What's Not Included?

A local running database is not included. You can use the Prisma Studio application to view and edit your database. However, if you want to persist your data, you will need to deploy your own database.

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!
