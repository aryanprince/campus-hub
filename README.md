# 🎓 Campus Hub (WIP)

Campus Hub is a collection of 3 Next.js apps that are designed to be used together to create a campus-wide hub for students to access information and resources.

This project is a monorepo that uses [Turborepo](https://turbo.build//) to manage all the packages and apps in the monorepo. Each app is designed to be independent and can be deployed separately. The apps are designed to be used together by communicating with each other through REST API calls.

This project was built to showcase the capabilities of having a microservices architecture for independent functionality and seperate databases while leveraging the benefits of a monorepo for shared code and improved DX.

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-black?style=for-the-badge&logo=Turborepo&logoColor=white)
![React](https://img.shields.io/badge/react-black?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-black?style=for-the-badge&logo=tailwind-css&logoColor=2338B2AC)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-black?style=for-the-badge&logo=shadcnui&logoColor=white)
![Radix UI](https://img.shields.io/badge/radix-black?style=for-the-badge&logo=radix-ui&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-black?style=for-the-badge&logo=Drizzle&logoColor=#CFF66C)
![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-black?style=for-the-badge&logo=Railway&logoColor=white)

## ✨ Features

This Turborepo includes the following packages/apps:

- [Student](https://campus-hub-student.vercel.app): A Next.js app that serves as a student portal for accessing campus resources and to let students manage their enrolled courses.
- [Library](https://campus-hub-library.vercel.app): A Next.js app that serves as a library portal for accessing library resources such as borrowing and returning books.
- [Finance](https://campus-hub-finance.vercel.app): A Next.js app that serves as a finance portal for paying tuition fees and for paying other campus services such as library fines.

## 🛠️ Tech Stack

- Frontend:

  - **Next.js (App Router)**: A React framework for building server-rendered applications.
  - **TypeScript**: JavaScript with syntax for types. Used across the entire stack for type safety and improved DX.
  - **Tailwind CSS**: A utility-first CSS framework for building custom designs.
  - **Radix UI**: A collection of low-level UI components for building high-quality design systems and web apps.
  - **shadcn/ui**: Beautiful UI components built with Radix and Tailwind. Highly customizable and accessible.
  - **React Query**: A data-fetching library for React that provides async data state management and caching.
  - **Lucide**: Icon pack used for the app icons.
  - **Geist**: Nice fonts from Vercel. Used for all the microservices.

- Backend:

  - **Next.js (API Routes)**: Used to build REST API endpoints directly in Next.js. Used to communicate between the microservices.
  - **TypeScript**: JavaScript with syntax for types. Used across the entire stack for type safety and improved DX.
  - **PostgreSQL**: Powerful database system. Used to store all the data for the 3 microservices.
  - **Drizzle ORM**: Fast and type-safe database ORM for TypeScript & Node.js.
  - **NextAuth.js**: Authentication library for Next.js. Used to handle authentication for the microservices.

- Tooling / DevOps:

  - **Turborepo**: A monorepo tool that's fast, caches builds (locally, remotely and even across CI), and has great DX.
  - **pnpm** (Package Manager): Fast, disk space efficient package manager. Works well with Turborepo.
  - **pnpm Workspaces**: pnpm feature allowing you to manage multiple packages in a monorepo. Keeps a single lockfile for all packages.
  - **GitHub Actions**: Used to automate the CI/CD pipeline for the monorepo along with Vercel deployments.
  - **Docker**: Used to containerize the apps and the databases for local development and deployment.
  - **Prettier**: An opinionated code formatter. Ensures that all code conforms to a consistent style.
    - **Prettier Tailwind**: A Prettier plugin to format Tailwind CSS classes to a consistent order.
  - **ESLint**: A tool to identify bad code practices and patterns across the codebase.

- Deployment:
  - **Vercel**: Used for the deployment of the Next.js apps, including all the REST API endpoints as serverless functions.
  - **Railway**: Preferred database hosting platform for the production databases.

## 📜 Scripts

### Database Scripts

Run the following scripts to manage the database schema and data:

```sh
db:studio # Opens Drizzle Studio to view stuff in the database. So cool!
```

```sh
db:push # Pushes database schema directly w/o migrations (prefer db:migrate)
```

```sh
db:migrate:generate # Generates the migration files based on the schema changes
```

```sh
db:migrate:run # Migrates the database using the generated migration files (from db:generate)
```

```sh
db:migrate:push # Generates and runs the migration files in one go (db:generate + db:migrate)
```

```sh
db:seed # Seeds the database with initial data
```

```sh
db:setup # Sets up the database by running db:migrate and db:seed
```

## 🚀 Getting Started

Run the development server using Turborepo:

```bash
pnpm dev # or turbo dev
```
