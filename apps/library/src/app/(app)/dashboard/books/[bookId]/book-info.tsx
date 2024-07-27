"use client";

import type { User } from "lucia";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { BookCheck, Bookmark, ExternalLink, Undo2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@campus-hub/ui/components/ui/button";

import type { book } from "~/server/db/schema/main-schema";
import { api } from "~/trpc/react";

export default function BookInfo({
  currentBook,
  currentUser,
}: {
  currentBook: typeof book.$inferSelect;
  currentUser: User;
}) {
  const router = useRouter();

  const { data: ifUserHasBorrowedBook, refetch: refetchIfUserHasBorrowedBook } =
    api.transaction.checkIfUserHasBorrowedBook.useQuery({
      userId: currentUser.id,
      bookId: currentBook.bookId,
    });

  const { mutate: createNewBorrowTransaction } =
    api.transaction.borrowBook.useMutation({
      onSuccess: () => {
        router.refresh();
        void refetchIfUserHasBorrowedBook();
        toast.success("Borrowed book", {
          description: "You have successfully borrowed this book.",
        });
      },
      onError: (error) => {
        toast.warning("Error borrowing book", {
          description: error.message,
        });
      },
    });

  const { mutate: returnBook } = api.transaction.returnBook.useMutation({
    onSuccess: (data) => {
      router.refresh();
      void refetchIfUserHasBorrowedBook();
      toast.success(data?.message, {
        description: data?.description,
      });
    },
    onError: (error) => {
      toast.error("Error returning book", {
        description: error.message,
      });
    },
  });

  return (
    <div className="flex flex-col gap-8 md:flex-row">
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

      {/* RIGHT SIDE OF LAYOUT */}
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

        {/* LIST OF BUTTONS */}
        <div className="w-full flex-1 space-y-2">
          {!ifUserHasBorrowedBook?.hasBorrowedBook && (
            <Button
              className="inline-flex w-full gap-2"
              onClick={() => {
                void createNewBorrowTransaction({
                  bookId: currentBook.bookId,
                  userId: currentUser.id,
                });
              }}
            >
              <BookCheck className="size-4" />
              Borrow ∙ {currentBook.copies} left
            </Button>
          )}
          {!!ifUserHasBorrowedBook?.hasBorrowedBook && (
            <Button
              className="inline-flex w-full gap-2"
              onClick={() => {
                void returnBook({
                  bookId: currentBook.bookId,
                  userId: currentUser.id,
                  studentNumber: currentUser.username,
                });
              }}
            >
              <Undo2 className="size-4" />
              Return Book
            </Button>
          )}
          <Button
            variant={"secondary"}
            className="inline-flex w-full gap-2"
            onClick={() => {
              toast.success(
                <div className="inline-flex items-center gap-2">
                  <Bookmark className="size-4" />
                  <div className="inline-flex flex-col">
                    <h1 className="font-medium">Saved book for later</h1>
                    <p className="text-muted-foreground">
                      View this book in your saved list.
                    </p>
                  </div>
                </div>,
              );
            }}
          >
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
