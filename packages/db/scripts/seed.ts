import { resolve } from 'path';
import { config } from 'dotenv';
import { eq, or } from 'drizzle-orm';

/**
 * As this will be run outside of the server, we need to load the env file.
 * IMPORTANT: This must be done before importing the db instance.
 */
config({ path: resolve(__dirname, '../../../.env') });

import { bookmarks } from '../schemas/bookmarks.sql';

async function main() {
  console.log("🌱 Seeding bookmarks…");

  /**
   * Because we want the db instance to have access to the right env variables,
   * we need to import it after the env file is loaded.
   */
  const { db } = await import('../index.js');

  await db.transaction(async (tx) => {
    /**
     * Remove any existing bookmarks with the same URLs to avoid duplicates.
     * 
     * NOTE: We can run the seed script multiple times without issue.
     */
    await tx.delete(bookmarks).where(or(
      eq(bookmarks.url, "https://github.com/drizzle-team/drizzle-orm"),
      eq(bookmarks.url, "https://nextjs.org/docs"),
      eq(bookmarks.url, "https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
      eq(bookmarks.url, "https://developer.mozilla.org/en-US/docs/Web/JavaScript"),
      eq(bookmarks.url, "https://www.figma.com/design/")
    ));

    /**
     * Create 5 sample bookmarks with diverse content.
     */
    await tx
      .insert(bookmarks)
      .values([
        {
          url: "https://github.com/drizzle-team/drizzle-orm",
          title: "Drizzle ORM - TypeScript ORM for SQL databases",
          description: "A lightweight TypeScript ORM for SQL databases with great DX and type safety."
        },
        {
          url: "https://nextjs.org/docs",
          title: "Next.js Documentation",
          description: "Official Next.js docs for React applications with SSR and SSG."
        },
        {
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          title: "Rick Astley - Never Gonna Give You Up (Official Video)",
          description: "The classic rickroll that became internet culture."
        },
        {
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
          title: "JavaScript | MDN Web Docs",
          description: "Comprehensive JavaScript documentation from Mozilla."
        },
        {
          url: "https://www.figma.com/design/",
          title: "Figma: The Collaborative Interface Design Tool",
          description: "Collaborative design tool for UI/UX and prototyping."
        }
      ]);
  });

  console.log("✅ Seeded: 5 bookmarks created successfully.");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
