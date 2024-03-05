"use client";

import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { BookCheck, Bookmark, ExternalLink } from "lucide-react";

import type { book } from "~/server/db/schema/main-schema";
import { Button } from "~/components/ui/button";

export default function BookInfo({
  currentBook,
}: {
  currentBook: typeof book.$inferSelect;
}) {
  console.log("currentBook image", currentBook?.image);

  return (
    <div className="flex gap-8">
      <div className="flex flex-auto flex-col gap-4">
        <div>
          <p className="text-lg text-muted-foreground">{currentBook?.author}</p>
          <h1 className="text-3xl font-semibold">{currentBook?.title}</h1>
        </div>
        {/* <div>
            <p className="">{currentBook?.description}</p>
          </div> */}
        <div className="flex w-full flex-col rounded-sm p-4">
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <p className="uppercase text-muted-foreground">Title</p>
              <p className="uppercase text-muted-foreground">Author</p>
              <p className="uppercase text-muted-foreground">Genre</p>
              <p className="uppercase text-muted-foreground">Language</p>
              <p className="uppercase text-muted-foreground">ISBN</p>
              <p className="uppercase text-muted-foreground">Copies Left</p>
              <p className="uppercase text-muted-foreground">Book ID</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>{currentBook?.title}</p>
              <p>{currentBook?.author}</p>
              <p>{currentBook?.genre}</p>
              <p>{currentBook?.language}</p>
              <p>{currentBook?.isbn}</p>
              <p>{currentBook?.copies}</p>
              <p>{currentBook?.bookId}</p>
            </div>
          </div>
        </div>
        <p>{currentBook.description}</p>
      </div>
      <div className="flex w-[200px] shrink-0 flex-col gap-8">
        {currentBook.image && currentBook.title && (
          <AspectRatio ratio={1 / 1.6} className="bg-muted">
            <Image
              className="rounded-[5px] object-cover"
              src={currentBook.image}
              alt={currentBook.title}
              fill
            />
          </AspectRatio>
        )}
        <div className="w-full flex-1 space-y-2">
          <Button className="inline-flex w-full gap-2">
            <BookCheck className="size-4" />
            Borrow ∙ {currentBook.copies} left
          </Button>
          <Button variant={"secondary"} className="inline-flex w-full gap-2">
            <Bookmark className="size-4" />
            Save for Later
          </Button>
          <Button variant={"secondary"} className="inline-flex w-full gap-2">
            <ExternalLink className="size-4" />
            View on Amazon
          </Button>
        </div>
      </div>
    </div>
  );
}
