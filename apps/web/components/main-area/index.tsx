"use client"

import { api } from "@/lib/ky"
import { useQuery } from "@tanstack/react-query"
import { BookmarkCard } from "./bookmark-card"
import { Bookmark } from "@/types/api"


export function MainArea() {
  const {data: bookmarks = [], isLoading} = useQuery<Bookmark[]>({
    queryKey: ["bookmarks"],
    queryFn: () => api.get("bookmarks").json(),
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bookmarks.map((bookmark) => (
        <BookmarkCard 
          key={bookmark.id} 
          id={bookmark.id}
          url={bookmark.url} 
          title={bookmark.title} 
          description={bookmark.description} 
          createdAt={new Date(bookmark.createdAt)} 
        />
      ))}
    </div>
  )
}