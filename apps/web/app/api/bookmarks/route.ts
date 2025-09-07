import { NextRequest } from "next/server";
import { db } from "@recall/db";
import { bookmarks } from "@recall/db/schemas/bookmarks.sql";
import { desc } from "drizzle-orm";
import { json, fail, validateRequestBody } from "../_lib/validate";
import { HttpError } from "../_lib/http";
import { z } from "zod";

/**
 * GET request to list all bookmarks.
 * @param _req - The request object.
 * @returns The list of bookmarks.
 */
export async function GET(_req: NextRequest) {
  try {
    const rows = await db.select().from(bookmarks).orderBy(desc(bookmarks.createdAt));
    return json(rows);
  } catch (err) {
    console.error(err);
    if (err instanceof HttpError) return fail(err.status, err.message, err.details);
    return fail(500, "Failed to list bookmarks");
  }
}


/**
 * The schema for creating a bookmark.
 */
const createBookmarkSchema = z.object({
  url: z.string().url(),
  title: z.string().optional(),
  description: z.string().optional(),
});

/**
 * POST request to create a new bookmark.
 * @param req - The request object.
 * @returns The created bookmark.
 */
export async function POST(_req: NextRequest) {
  try {
    const body = await validateRequestBody(_req, createBookmarkSchema);
    
    const [newBookmark] = await db
      .insert(bookmarks)
      .values({
        url: body.url,
        title: body.title,
        description: body.description,
      })
      .returning();

    return json(newBookmark, { status: 201 });
  } catch (err) {
    console.error(err);
    if (err instanceof HttpError) return fail(err.status, err.message, err.details);
    return fail(500, "Failed to create bookmark");
  }
}
