import { type ComponentType } from "react";

export interface ProjectItem {
    name: string;
    url: string;
    icon: React.ComponentType<any>;
    id: string;
}

export interface DraggableFavoritesSidebarProps {
    projects: ProjectItem[];
    onProjectsReorder?: (newOrder: ProjectItem[]) => void;
}

interface User {
    name: string;
    email: string;
    avatar: string;
}

export interface SubItem {
    title: string;
    url: string;
}

export interface NavItem {
    title: string;
    url: string;
    icon: ComponentType<any>;
    items?: SubItem[]
}

export interface DashboardConfig {
    user: User;
    navMain: NavItem[];
    projects: ProjectItem[];
    navSecondary: NavItem[];
}
