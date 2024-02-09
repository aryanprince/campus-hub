/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Fix these hacky node_modules imports
import { PrismaClient } from "../node_modules/.prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.book.deleteMany({});

  const books = await prisma.book.createMany({
    data: [
      {
        isbn: "9789813221871",
        title: "An Introduction To Component-Based Software Development",
        author: "Lau Kung-Kiu",
        year: 2017,
        copies: 1,
      },
      {
        isbn: "9780132350884",
        title: "Clean Code - A Handbook Of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        year: 2009,
        copies: 1,
      },
      {
        isbn: "9780073523323",
        title: "Database System Concepts",
        author: "Abraham Silberschatz ",
        year: 2010,
        copies: 1,
      },
      {
        isbn: "9783827330437",
        title:
          "Design Patterns - Elements Of Reusable Object-Oriented Software",
        author: "Erich Gamma",
        year: 1995,
        copies: 1,
      },
      {
        isbn: "9781543057386",
        title: "Distributed systems (3rd edition)",
        author: "Maarten van Steen",
        year: 2017,
        copies: 2,
      },
      {
        isbn: "9781292097619",
        title: "Fundamentals of database systems (7th edition)",
        author: "Ramez Elmasri",
        year: 2016,
        copies: 2,
      },
      {
        isbn: "9781430265337",
        title: "Introducing Spring Framework - A Primer",
        author: "Felipe Gutierrez",
        year: 2014,
        copies: 1,
      },
      {
        isbn: "9780262530910",
        title: "Introduction To Algorithms",
        author: "Thomas H. Cormen",
        year: 1990,
        copies: 2,
      },
      {
        isbn: "9781449369415",
        title:
          "Introduction To Machine Learning With Python - A Guide For Data Scientists",
        author: "Andreas C. Muller",
        year: 2016,
        copies: 2,
      },
      {
        isbn: "9780321349606",
        title: "Java concurrency in practice",
        author: "Brian Goetz",
        year: 2015,
        copies: 2,
      },
      {
        isbn: "9783319994192",
        title: "Java in two semesters (4th edition)",
        author: "Quentin Charatan",
        year: 2019,
        copies: 1,
      },
      {
        isbn: "9781491952023",
        title: "JavaScript: The Definitive Guide",
        author: "David Flanagan",
        year: 2020,
        copies: 2,
      },
      {
        isbn: "9781491956250",
        title:
          "Microservice Architecture - Aligning Principles, Practices, And Culture",
        author: "Irakli Nadareishvili",
        year: 2016,
        copies: 2,
      },
      {
        isbn: "9781937785499",
        title: "Programming Ruby 1.9 & 2.0 - The Pragmatic Programmers' Guide",
        author: "David Thomas",
        year: 2013,
        copies: 2,
      },
      {
        isbn: "9781593279288",
        title:
          "Python Crash Course, 2nd Edition - A Hands-On, Project-Based Introduction To Programming",
        author: "Eric Mathes",
        year: 2019,
        copies: 1,
      },
      {
        isbn: "9781617298691",
        title: "Spring Start Here - Learn What You Need And Learn It Well",
        author: "Laurentiu Spilca",
        year: 2021,
        copies: 2,
      },
      {
        isbn: "9780135957059",
        title: "The Pragmatic Programmer",
        author: "David Thomas",
        year: 2019,
        copies: 1,
      },
      {
        isbn: "9780596516178",
        title: "The Ruby Programming Language",
        author: "David Flanagan",
        year: 2008,
        copies: 1,
      },
    ],
  });

  console.log(books);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
