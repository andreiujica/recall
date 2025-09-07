"use client"

import { useState } from "react"
import { ExternalLink, Globe, Trash2 } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { useFavicon } from "@/hooks/use-favicon"
import { formatDate, formatDomain } from "@/utils/formatters"
import { api } from "@/lib/ky"

interface BookmarkCardProps {
  id: string
  url: string
  title?: string | null
  description?: string | null
  createdAt: Date
  className?: string
}

/**
 * This is a bookmark card component that displays a bookmark's title, description, and created at date.
 */
export function BookmarkCard({ 
  id,
  url, 
  title, 
  description, 
  createdAt,
  className
}: BookmarkCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()
  const { faviconUrl, handleFaviconError } = useFavicon(url)

  const handleCardClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleDeleteConfirm = async () => {
    if (isDeleting) return
    
    try {
      setIsDeleting(true)
      await api.delete(`bookmarks/${id}`)
      
      /**
       * Invalidate and refetch bookmarks query
       */
      await queryClient.invalidateQueries({ queryKey: ["bookmarks"] })
    } catch (error) {
      console.error("Failed to delete bookmark:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md",
        className
      )}
      onClick={handleCardClick}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-0 bg-blue-400 dark:bg-blue-500 transition-all duration-300 group-hover:w-1 rounded-l-lg" />
      
      
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Favicon */}
          <div className="flex-shrink-0">
            <div className="flex size-10 items-center justify-center rounded-md border bg-muted/30">
              {faviconUrl ? (
                <img 
                  src={faviconUrl} 
                  alt={`${formatDomain(url)} favicon`}
                  onError={handleFaviconError}
                  className="size-6 rounded-sm"
                />
              ) : (
                <Globe className="size-5 text-muted-foreground" />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium leading-none">
                  {title || formatDomain(url)}
                </h3>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {formatDomain(url)}
                </p>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <AlertDialog>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                          disabled={isDeleting}
                          aria-label="Delete bookmark"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete bookmark</p>
                    </TooltipContent>
                  </Tooltip>
                  <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Bookmark</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this bookmark? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteConfirm}
                        disabled={isDeleting}
                        className="bg-destructive text-white hover:bg-destructive/90"
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <ExternalLink className="size-4 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
            
            {description && (
              <p className="mt-2 text-xs text-muted-foreground truncate leading-relaxed">
                {description}
              </p>
            )}
            
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
