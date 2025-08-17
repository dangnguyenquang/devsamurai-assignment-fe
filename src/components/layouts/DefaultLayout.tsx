import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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

          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
