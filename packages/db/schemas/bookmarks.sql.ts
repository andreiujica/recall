import { createId } from "@paralleldrive/cuid2";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const bookmarks = sqliteTable("bookmarks", {
  id: text("id").primaryKey().$defaultFn(() => createId()),

  url: text("url").notNull(),
  title: text("title"),
  description: text("description"),

  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

