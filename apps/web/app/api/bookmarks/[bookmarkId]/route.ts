import { NextRequest } from "next/server";
import { db } from "@recall/db";
import { bookmarks } from "@recall/db/schemas/bookmarks.sql";
import { eq } from "drizzle-orm";
import { json, fail, validateRequestBody, Ctx } from "../../_lib/validate";
import { HttpError } from "../../_lib/http";
import { z } from "zod";


/**
 * GET request to fetch a single bookmark by ID.
 * @param _req - The request object.
 * @param ctx - The context object containing the bookmark ID.
 * @returns The bookmark if found.
 */
export async function GET(_req: NextRequest, ctx: Ctx<{ bookmarkId: string }>) {
  try {
    const { bookmarkId } = await ctx.params;
    
    const [bookmark] = await db
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.id, bookmarkId))
      .limit(1);

    if (!bookmark) {
      return fail(404, "Bookmark not found");
    }

    return json(bookmark);
  } catch (err) {
    console.error(err);
    if (err instanceof HttpError) return fail(err.status, err.message, err.details);
    return fail(500, "Failed to fetch bookmark");
  }
}

/**
 * The schema for updating a bookmark.
 */
const updateBookmarkSchema = z.object({
  url: z.string().url().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

/**
 * PATCH request to update a bookmark by ID.
 * @param req - The request object.
 * @param ctx - The context object containing the bookmark ID.
 * @returns The updated bookmark.
 */
export async function PATCH(req: NextRequest, ctx: Ctx<{ bookmarkId: string }>) {
  try {
    const { bookmarkId } = await ctx.params;
    const body = await validateRequestBody(req, updateBookmarkSchema);

    // Check if bookmark exists
    const [existingBookmark] = await db
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.id, bookmarkId))
      .limit(1);

    if (!existingBookmark) {
      return fail(404, "Bookmark not found");
    }

    // Update the bookmark
    const [updatedBookmark] = await db
      .update(bookmarks)
      .set({
        url: body.url ?? existingBookmark.url,
        title: body.title ?? existingBookmark.title,
        description: body.description ?? existingBookmark.description,
      })
      .where(eq(bookmarks.id, bookmarkId))
      .returning();

    return json(updatedBookmark);
  } catch (err) {
    console.error(err);
    if (err instanceof HttpError) return fail(err.status, err.message, err.details);
    return fail(500, "Failed to update bookmark");
  }
}

/**
 * DELETE request to remove a bookmark by ID.
 * @param _req - The request object.
 * @param ctx - The context object containing the bookmark ID.
 * @returns Success message if deleted.
 */
export async function DELETE(_req: NextRequest, ctx: Ctx<{ bookmarkId: string }>) {
  try {
    const { bookmarkId } = await ctx.params;

    // Check if bookmark exists
    const [existingBookmark] = await db
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.id, bookmarkId))
      .limit(1);

    if (!existingBookmark) {
      return fail(404, "Bookmark not found");
    }

    // Delete the bookmark
    await db
      .delete(bookmarks)
      .where(eq(bookmarks.id, bookmarkId));

    return json({ message: "Bookmark deleted successfully" });
  } catch (err) {
    console.error(err);
    if (err instanceof HttpError) return fail(err.status, err.message, err.details);
    return fail(500, "Failed to delete bookmark");
  }
}
