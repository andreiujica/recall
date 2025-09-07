import { db } from '@recall/db';
import { bookmarks } from '@recall/db/schemas/bookmarks.sql';

/**
 * This is a simple health check endpoint that checks if the database is connected
 * and that we can ping the server.
 * 
 */
export async function GET() {

  /**
   * Check if the database is connected.
   */
  try {
    await db.select().from(bookmarks).limit(1);
  } catch (error) {
    return Response.json({ status: 'error', message: 'Database connection failed' }, { status: 500 });
  }

  return Response.json({ status: 'ok' }, { status: 200 });
}