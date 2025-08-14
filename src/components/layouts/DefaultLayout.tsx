import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../sidebar/app-sidebar";
import { Outlet } from "react-router";
import Header from "../header/page";

export default function DefaultLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="py-4 sm:px-4 sm:py-6 md:px-6">
              <Outlet />
            </div>
          </div>
s        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
