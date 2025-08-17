/// <reference types="vite-plugin-svgr/client" />

import { useState } from 'react';
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import SortableItem from './SortableItem';
import type { DraggableFavoritesSidebarProps } from '@/types/sidebar';

export default function DraggableFavoritesSidebar({ 
  projects: initialProjects, 
  onProjectsReorder 
}: DraggableFavoritesSidebarProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((item) => item.id === active.id);
      const newIndex = projects.findIndex((item) => item.id === over.id);

      const newProjects = arrayMove(projects, oldIndex, newIndex);
      
      setProjects(newProjects);
      onProjectsReorder?.(newProjects);
    }

    setActiveId(null);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const activeItem = activeId ? projects.find((item) => item.id === activeId) : null;

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {/* Collapsible Header */}
      <SidebarGroupLabel className="px-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className="flex items-center justify-between w-full h-auto p-2 text-left hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <span className="text-sm font-medium text-sidebar-foreground/70">
            Favorites
          </span>
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-sidebar-foreground/50 transition-transform" />
          ) : (
            <ChevronDown className="h-4 w-4 text-sidebar-foreground/50 transition-transform" />
          )}
        </Button>
      </SidebarGroupLabel>

      {/* Collapsible Content */}
      {!isCollapsed && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={projects.map(item => item.id)} strategy={verticalListSortingStrategy}>
            <SidebarMenu className="px-2 space-y-1">
              {projects.map((item, index) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  isDragging={activeId === item.id}
                />
              ))}
            </SidebarMenu>
          </SortableContext>
          
          {/* Drag Overlay */}
          <DragOverlay>
            {activeItem ? (
              <div className="flex items-center gap-3 p-2 bg-sidebar-accent border border-sidebar-border rounded-md shadow-lg">
                <activeItem.icon className="h-4 w-4" />
                <span className="font-medium">{activeItem.name}</span>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </SidebarGroup>
  );
}