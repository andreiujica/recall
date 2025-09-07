import { Contrast } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"

/**
 * This component is used to display the app logo in the sidebar.
 * It has both light and dark mode support.
 * 
 * @returns The AppLogo component
 */
export function AppLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
          <a href="#">
            <div className="bg-blue-400 text-white dark:bg-blue-500 dark:text-gray-900 flex aspect-square size-8 items-center justify-center rounded-lg">
              <Contrast className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold tracking-tighter text-lg text-gray-900 dark:text-gray-100">Recall</span>
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}