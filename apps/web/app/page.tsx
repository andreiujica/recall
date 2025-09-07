import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { MainArea } from "@/components/main-area"
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar"
import { AppHeader } from "@/components/header"

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <MainArea />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
