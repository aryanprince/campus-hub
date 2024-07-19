<div align="center">

# 🎓 Campus Hub

<p></p>

<a href="#-features">Features</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#-tech-stack">Tech Stack</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#-getting-started">Getting Started</a>

![Next JS](https://img.shields.io/badge/Next.JS-black?style=for-the-badge&logo=next.js&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-black?style=for-the-badge&logo=Turborepo&logoColor=white)
![React](https://img.shields.io/badge/react-black?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwind-black?style=for-the-badge&logo=tailwind-css&logoColor=2338B2AC)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-black?style=for-the-badge&logo=shadcnui&logoColor=white)
![Radix UI](https://img.shields.io/badge/radix-black?style=for-the-badge&logo=radix-ui&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-black?style=for-the-badge&logo=Drizzle&logoColor=#CFF66C)
![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-black?style=for-the-badge&logo=Railway&logoColor=white)

</div>

Campus Hub is a collection of 3 Next.js apps that are designed to be used together to create a campus-wide hub for students to access information and resources.

This project is a monorepo that uses [Turborepo](https://turbo.build/repo) to manage all the packages and apps in the monorepo. Each app is designed to be independent and can be deployed separately. The apps are designed to be used together by communicating with each other through REST API calls.

This project was built to showcase the capabilities of having a microservices architecture for independent functionality and seperate databases while leveraging the benefits of a monorepo for shared code and improved DX.

## ✨ Features

This Turborepo includes the following packages/apps:

- [Student](https://campus-hub-student.vercel.app): A student portal for accessing campus resources and to let students manage their enrolled courses.
- [Library](https://campus-hub-library.vercel.app): A library portal for accessing library resources such as borrowing and returning books.
- [Finance](https://campus-hub-finance.vercel.app): A finance portal for paying tuition fees and for paying other campus services such as library fines.

## 🛠️ Tech Stack

- Frontend:

  - [**Next.js (App Router)**](https://nextjs.org/): A React framework for building server-rendered applications.
  - [**TypeScript**](https://www.typescriptlang.org/): JavaScript with syntax for types. Used across the entire stack for type safety and improved DX.
  - [**Tailwind CSS**](https://tailwindcss.com/): A utility-first CSS framework for building custom designs.
  - [**Radix UI**](https://www.radix-ui.com/): A collection of low-level UI components for building high-quality design systems and web apps.
  - [**shadcn/ui**](https://ui.shadcn.com/): Beautiful UI components built with Radix and Tailwind. Highly customizable and accessible.
  - [**React Query**](https://react-query.tanstack.com/): A data-fetching library for React that provides async data state management and caching.
  - [**Lucide**](https://lucide.dev/): Icon pack used for the app icons.
  - [**Geist**](https://vercel.com/font): Nice fonts from Vercel. Used for all the microservices.

- Backend:

  - [**Next.js (API Routes)**](https://nextjs.org/): Used to build REST API endpoints directly in Next.js. Used to communicate between the microservices.
  - [**TypeScript**](https://www.typescriptlang.org/): JavaScript with syntax for types. Used across the entire stack for type safety and improved DX.
  - [**PostgreSQL**](https://www.postgresql.org/): Powerful database system. Used to store all the data for the 3 microservices.
  - [**Drizzle ORM**](https://drizzle.dev/): Fast and type-safe database ORM for TypeScript & Node.js.
  - [**Lucia**](https://lucia-auth.com/): Authentication library for Next.js. Used to handle authentication for the microservices.

- Tooling:

  - [**Turborepo**](https://turborepo.org/): A monorepo tool that's fast, caches builds (locally, remotely and even across CI), and has great DX.
  - [**pnpm**](https://pnpm.io/): Fast, disk space efficient package manager. Works well with Turborepo.
    - [**pnpm Workspaces**](https://pnpm.io/workspaces): pnpm feature allowing you to manage multiple packages in a monorepo. Keeps a single lockfile for all packages.
  - [**Docker**](https://www.docker.com/): Used to containerize the apps and the databases for local development and deployment.
  - [**Prettier**](https://prettier.io/): An opinionated code formatter. Ensures that all code conforms to a consistent style.
    - [**Prettier Tailwind**](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier): A Prettier plugin to format Tailwind CSS classes to a consistent order.
  - [**ESLint**](https://eslint.org/): A tool to identify bad code practices and patterns across the codebase.

- Deployment:
  - [**Vercel**](https://vercel.com/): Used for the deployment of the Next.js apps, including all the REST API endpoints as serverless functions.
  - [**Railway**](https://railway.app/): Preferred database hosting platform for the production databases.
  - [**GitHub Actions**](https://github.com/features/actions): Used to automate the CI/CD pipeline for the monorepo along with Vercel deployments.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed first:

- [Node.js](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Turborepo](https://turborepo.org/docs/getting-started) (optional)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/aryanprince/campus-hub.git
```

2. Install the dependencies:

```bash
pnpm install
```

3. Create the `.env` file for each app:

```bash
cp apps/student/.env.example apps/student/.env
cp apps/library/.env.example apps/library/.env
cp apps/finance/.env.example apps/finance/.env
```

4. Configure environment variables for each app. Stick to the defaults for the most part.

5. Start the local databases using Docker:

```bash
docker-compose up -d
```

5. Start the development server using Turborepo:

```bash
pnpm dev
```

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
