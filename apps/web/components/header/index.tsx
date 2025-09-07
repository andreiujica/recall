import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "@workspace/ui/components/breadcrumb";
import { ThemeToggle } from "./theme-toggle";
import { CreateBookmark } from "./create-bookmark";

export function AppHeader() {
  return (
    <header className="bg-background sticky top-0 flex flex-col border-b">
      <div className="flex shrink-0 items-center gap-2 p-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Bookmark Library</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-2 ml-auto">
        <CreateBookmark />
        <ThemeToggle />
        </div>
      </div>
    </header>
  )
}