"use client"

import { ExternalLink, Globe } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { useFavicon } from "@/hooks/use-favicon"
import { formatDate, formatDomain } from "@/utils/formatters"

interface BookmarkCardProps {
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
  url, 
  title, 
  description, 
  createdAt,
  className
}: BookmarkCardProps) {
  const { faviconUrl, handleFaviconError } = useFavicon(url)

  const handleCardClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
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
              <ExternalLink className="ml-2 size-4 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
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
