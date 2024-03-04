CREATE TABLE IF NOT EXISTS "book" (
	"book_id" text PRIMARY KEY NOT NULL,
	"isbn" text,
	"title" text,
	"author" text,
	"year" integer,
	"genre" text,
	"language" text,
	"copies" integer,
	"image" text,
	"description" text,
	CONSTRAINT "book_isbn_unique" UNIQUE("isbn")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction" (
	"transaction_id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"book_id" text NOT NULL,
	"borrowed_at" date NOT NULL,
	"returned_at" date
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "isbn_idx" ON "book" ("isbn");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "book" ("title");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_book_id_book_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "book"("book_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
