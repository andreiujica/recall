"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { PlusIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { api } from "../../lib/ky"
import type { Bookmark } from "../../types/api"


interface CreateBookmarkForm {
  url: string
  title?: string
  description?: string
}

export function CreateBookmark() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBookmarkForm>()

  const onSubmit = async (data: CreateBookmarkForm) => {
    try {
      setIsSubmitting(true)
      
      await api.post("bookmarks", {
        json: {
          url: data.url,
          title: data.title || undefined,
          description: data.description || undefined,
        },
      }).json<Bookmark>()

      /**
       * Reset form and close dropdown on success
       */
      reset()
      setIsOpen(false)
      
      /**
       * Invalidate and refetch bookmarks query
       */
      await queryClient.invalidateQueries({ queryKey: ["bookmarks"] })
    } catch (error) {
      console.error("Failed to create bookmark:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
          <Button
          variant="ghost"
          size="icon"
          className="transition-colors duration-200 size-7 bg-blue-400 text-white hover:text-white hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500"
          aria-label="Create new bookmark"
          disabled={isSubmitting}
        >
              <PlusIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Bookmark</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-80 p-4" align="end">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Create New Bookmark</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">URL *</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              {...register("url", {
                required: "URL is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Please enter a valid URL",
                },
              })}
              aria-invalid={errors.url ? "true" : "false"}
            />
            {errors.url && (
              <p className="text-sm text-destructive">{errors.url.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Optional title"
              {...register("title")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Optional description"
              {...register("description")}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                reset()
                setIsOpen(false)
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm" disabled={isSubmitting} className="bg-blue-400 text-white hover:text-white hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600">
              {isSubmitting ? "Creating..." : "Create Bookmark"}
            </Button>
          </div>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
