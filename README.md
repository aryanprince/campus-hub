<div align="center">

# 🎓 Campus Hub

<p>A showcase monorepo of interconnected microservices for student, library, and finance management in a university setting - demonstrating real-world technology and best practices.</p>

<a href="#-features">Features</a>
<span>&nbsp;&nbsp;✦&nbsp;&nbsp;</span>
<a href="#-directory-structure">Directory Structure</a>
<span>&nbsp;&nbsp;✦&nbsp;&nbsp;</span>
<a href="#-features">Features</a>
<span>&nbsp;&nbsp;✦&nbsp;&nbsp;</span>
<a href="#-tech-stack">Tech Stack</a>
<span>&nbsp;&nbsp;✦&nbsp;&nbsp;</span>
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

## 📖 Introduction

Campus Hub is a showcase application featuring three [Next.js](https://nextjs.org) microservices, fully deployed to the cloud for live use. This project includes a Student Portal, a Library Portal, and a Finance Portal, all integrated within a monorepo using [Turborepo](https://turbo.build/repo) and communicating via RESTful APIs.

Built to demonstrate my expertise in modern software development, Campus Hub employs a microservices architecture with independent functionality and separate databases, while leveraging a monorepo for shared code and improved DX. It also implements industry best practices, including CI/CD pipelines, design patterns, and robust architecture.

## 📦 Directory Structure

Campus Hub is a monorepo managed by [Turborepo](https://turbo.build/repo). The monorepo contains an `apps`, `packages`, and `tooling` directories.

```text
    .
    ├── .github                      # GitHub Actions CI/CD workflows
    │    └── workflows               # CI with pnpm cache setup
    │
    ├── .vscode                      # Recommended extensions and settings for VSCode
    │
    ├── apps                         # Main applications under the monorepo
    │    ├── student                 # Next.js app for the Student Portal
    │    ├── library                 # Next.js app for the Library Portal
    │    └── finance                 # Next.js app for the Finance Portal
    │
    ├── packages                     # Shared packages used by the apps
    │    └── ui                      # Shared UI components (using shadcn/ui)
    │
    ├── tooling                      # Shared configuration setup for the apps and packages
    │    ├── config-eslint           # Shared, fine-grained, ESLint preset
    │    ├── config-prettier         # Shared Prettier configuration
    │    ├── config-tailwind         # Shared Tailwind CSS configuration
    │    ├── config-typescript       # Shared TS config all apps under the monorepo
    │    └── github-actions          # Shared GitHub Actions composite workflow step for all CI jobs
    │
    ├── .nvmrc                       # Node Version Manager (nvm/fnm) file (pinned to LTS)
    ├── commitlint.config.ts         # Commitlint configuration for Gitmoji commit messages
    ├── pnpm-workspace.yaml          # pnpm config using catalogs for unified dependencies across monorepo
    ├── renovate.json                # Renovate configuration for automated dependency updates
    ├── docker-compose.yml           # Docker Compose file for local development databases
    └── turbo.json                   # Turborepo configuration file (includes all tasks)
```

## ✨ Features

### Student Portal [(Live Demo)](https://campus-hub-student.vercel.app)

- **Student Registration and Authentication**: Secure sign-up and log-in for students.
- **Course Enrollment and Management**:
  - Browse and enroll in available courses.
  - View enrolled courses and their respective fees.
- **Graduation Status Tracking**:
  - Monitor readiness for graduation.
  - Verify that all course fees are paid for eligibility.
- **Profile Management**: Edit and update personal details.

### Library Portal [(Live Demo)](https://campus-hub-library.vercel.app)

- **Student Verification**: Only accessible to students enrolled in at least one course.
- **Library Book Management**:
  - View and search for available books with cover art.
  - Borrow books with a default return date of 14 days.
  - Create and manage a saved collection of books for future borrowing.
- **Overdue Fee Calculation**:
  - Automatic calculation of fees for overdue books.
  - Display and manage overdue payments.

### Finance Portal [(Live Demo)](https://campus-hub-finance.vercel.app)

- **Invoice Management**:
  - Input and verify invoice numbers for courses or overdue book payments.
  - Display detailed invoice information.
- **Payment Processing**: Facilitate payments to clear outstanding dues.

### Best Practices Implemented

- **CI/CD Pipelines**: Automated testing and deployment processes using GitHub Actions and Vercel.
- **Design Patterns**: Applied relevant design patterns for maintainable and scalable code.
- **Monorepo Structure**: Turborepo allowed shared code and dependencies across the microservices.
- **RESTful APIs**: Seamless communication between microservices.

## 🛠️ Tech Stack

### Frontend:

- [**Next.js (App Router)**](https://nextjs.org/): A React framework for building server-rendered applications.
- [**TypeScript**](https://www.typescriptlang.org/): JavaScript with syntax for types. Used across the entire stack for type safety and improved DX.
- [**Tailwind CSS**](https://tailwindcss.com/) + [**shadcn/ui**](https://ui.shadcn.com/) + [**Radix UI**](https://www.radix-ui.com/): Design system for styling the apps. Used for consistent UI components across the microservices.
- [**React Query**](https://react-query.tanstack.com/): A data-fetching library for React that provides async data state management and caching.
- [**Lucide**](https://lucide.dev/): Icon pack used for the app icons across the microservices.
- [**Geist**](https://vercel.com/font): Nice fonts from Vercel. Used for all the microservices.

### Backend:

- [**Next.js (API Routes)**](https://nextjs.org/): Used to build REST API endpoints directly in Next.js. Used to communicate between the microservices.
- [**TypeScript**](https://www.typescriptlang.org/): JavaScript with syntax for types. Used across the entire stack for type safety and improved DX.
- [**PostgreSQL**](https://www.postgresql.org/): Powerful database system. Used to store all the data for the 3 microservices.
- [**Drizzle ORM**](https://drizzle.dev/): Fast and type-safe database ORM for TypeScript & Node.js.
- [**Lucia**](https://lucia-auth.com/): Authentication library for Next.js. Used to handle authentication for the microservices.

### Tooling:

- [**Turborepo**](https://turborepo.org/): A monorepo tool that's fast, caches builds (locally, remotely and even across CI), and has great DX.
- [**pnpm**](https://pnpm.io/): Fast, disk space efficient package manager. Works well with Turborepo.
  - [**pnpm Workspaces**](https://pnpm.io/workspaces): pnpm feature allowing you to manage multiple packages in a monorepo. Keeps a single lockfile for all packages.
- [**Docker**](https://www.docker.com/): Used to containerize the apps and the databases for local development and deployment.
- [**Prettier**](https://prettier.io/): An opinionated code formatter. Ensures that all code conforms to a consistent style.
  - [**Prettier Tailwind**](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier): A Prettier plugin to format Tailwind CSS classes to a consistent order.
- [**ESLint**](https://eslint.org/): A tool to identify bad code practices and patterns across the codebase.

### Deployment:

- [**Vercel**](https://vercel.com/): Used for the deployment of the Next.js apps, including all the REST API endpoints as serverless functions.
- [**Railway**](https://railway.app/): Preferred database hosting platform for the production databases.
- [**GitHub Actions**](https://github.com/features/actions): Used to automate the CI/CD pipeline for the monorepo along with Vercel deployments.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed first:

- [Node.js](https://nodejs.org/en/download/) (LTS version recommended)

```bash
brew install node # macOS or Linux (using Homebrew)
winget install -e --id OpenJS.NodeJS # Windows
```

- [pnpm](https://pnpm.io/installation)

```bash
brew install pnpm # macOS or Linux (using Homebrew)
winget install -e --id pnpm.pnpm # Windows
# or using npm
npm install -g pnpm # Install pnpm globally
```

- [Docker](https://www.docker.com/products/docker-desktop/) (only for local DBs during development)

```bash
brew install --cask docker # macOS or Linux (using Homebrew)
winget install -e --id Docker.DockerDesktop # Windows
```

- [Turborepo](https://turborepo.org/docs/getting-started) (optional)

```bash
npm install -g turbo # Either install Turbo globally using npm
pnpm install -g turbo # or using pnpm (recommended)
```

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

6. Run script to setup the databases with existing migrations and seed data:

```bash
pnpm db:setup
```

7. Start the development server using Turborepo:

```bash
pnpm dev
```

and open [http://localhost:3001 (Student)](http://localhost:3001), [http://localhost:3002 (Library)](http://localhost:3002), and [http://localhost:3003 (Finance)](http://localhost:3003) with your browser 🚀

8. (Optional) Run the following command to open Drizzle Studio to view the database content from the browser:

```bash
pnpm db:studio
```

and open [https://local.drizzle.studio?port=3011 (Student DB)](https://local.drizzle.studio?port=3011), [https://local.drizzle.studio?port=3012 (Library DB)](https://local.drizzle.studio?port=3012), and [https://local.drizzle.studio?port=3013 (Finance DB)](https://local.drizzle.studio?port=3013) with your browser 🗃️

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

## 📝 Note

Developed as part of a university project, Campus Hub highlights my ability to create production-ready applications using the latest technologies and standards. The project is a testament to my skills in software development, showcasing my expertise in building scalable, maintainable, and secure applications. I hope you enjoy exploring Campus Hub and appreciate the effort that went into creating it.
