# Campus Hub (WIP)

Campus Hub is a collection of 3 Next.js apps that are designed to be used together to create a campus-wide hub for students to access information and resources.

This project is a monorepo that uses [Turborepo](https://turbo.build//) to manage all the packages and apps in the monorepo. Each app is designed to be independent and can be deployed separately. The apps are designed to be used together by communicating with each other through REST API calls.

This project was built to showcase the capabilities of having a microservices architecture for independent functionality and seperate databases while leveraging the benefits of a monorepo for shared code and improved DX.

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-black?style=for-the-badge&logo=Turborepo&logoColor=white)
![React](https://img.shields.io/badge/react-black?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-black?style=for-the-badge&logo=tailwind-css&logoColor=2338B2AC)
![Radix UI](https://img.shields.io/badge/shadcn/ui-black?style=for-the-badge&logo=shadcnui&logoColor=white)
![Radix UI](https://img.shields.io/badge/radix-black?style=for-the-badge&logo=radix-ui&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-black?style=for-the-badge&logo=Prisma&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-black?style=for-the-badge&logo=Drizzle&logoColor=#CFF66C)
![Drizzle](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)
![Drizzle](https://img.shields.io/badge/Railway-black?style=for-the-badge&logo=Railway&logoColor=white)

## Features

This Turborepo includes the following packages/apps:

- [Student](/): A Next.js app that serves as a student portal for accessing campus resources and to let students manage their enrolled courses.
- [Library](/): A Next.js app that serves as a library portal for accessing library resources such as borrowing and returning books.
- [Finance](/): A Next.js app that serves as a finance portal for paying tuition fees and for paying other campus services such as library fines.

## Tech Stack

- **Next.js (App Router)**: A React framework for building server-rendered applications. Has great DX.
- **Turborepo**: A monorepo tool that's an incremental bundler and build system optimized for JS/TS, written in Rust.
- **pnpm Workspaces**: A feature of pnpm that allows you to manage multiple packages in a single repository.
- **TypeScript**: A superset of JavaScript that adds static types to the language. Can't live without it.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs. Regular CSS is honestly a pain.
- **Drizzle ORM**: A TypeScript ORM for interacting with a PostgreSQL database.

## Scripts

### Student App

```sh
db:push # Pushes database schema to the database directly (better to use db:migrate)
```

```sh
db:studio # Opens Drizzle Studio to view stuff in the database
```

```sh
db:seed # Seeds the database with initial data
```

```sh
db:generate # Generates the migration files based on the schema changes
```

```sh
db:migrate # Migrates the database to the latest schema using the generated migration files from db:generate
```

```sh
db:setup # Sets up the database by running db:migrate and db:seed
```

## Getting Started

Run the development server using Turborepo:

```bash
pnpm dev # or turbo dev
```
