/// <reference types="vite-plugin-svgr/client" />

import * as React from "react";
import {
  Home,
  Map,
  MessageCircle,
  PieChart,
  Plus,
  Settings,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import DraggableFavoritesSidebar from "@/components/sidebar/nav-projects";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavSecondary } from "./ nav-secondary";
import { useSelector } from "react-redux";
import { type RootState } from "@/stores";
import type { DashboardConfig } from "@/types/sidebar";
import Google from "@/assets/icons/google.svg?react";
import Microsoft from "@/assets/icons/microsoft.svg?react";
import { Building } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data:DashboardConfig = {
    user: {
      name: useSelector((state: RootState) => state.auth.user?.name) || "",
      email: useSelector((state: RootState) => state.auth.user?.email) || "",
      avatar: "https://placehold.net/avatar.svg",
    },
    navMain: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Contacts",
        url: "#",
        icon: Users,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
      },
    ],
    projects: [
      {
        id: "1",
        name: "Google",
        url: "#",
        icon: Google,
      },
      {
        id: "2",
        name: "DevSamurai",
        url: "#",
        icon: Building,
      },
      {
        id: "3",
        name: "Microsoft",
        url: "#",
        icon: Microsoft,
      },
    ],
    navSecondary: [
      {
        title: "Invite member",
        url: "#",
        icon: Plus,
      },
      {
        title: "Feedback",
        url: "#",
        icon: MessageCircle,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props} className="bg-white dark:bg-gray-900">
      <SidebarHeader className="gap-2 p-3 flex h-14 flex-row items-center py-0">
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <DraggableFavoritesSidebar projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
