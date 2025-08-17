import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { ProjectItem } from '@/types/sidebar';

interface SortableItemProps {
  item: ProjectItem;
  isDragging?: boolean;
}

export default function SortableItem({ item, isDragging = false }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <SidebarMenuItem ref={setNodeRef} style={style}>
      <div 
        className={cn(
          "group relative flex items-center rounded-md transition-colors",
          (isDragging || isSortableDragging) && "opacity-50"
        )}
      >
        {/* Drag Handle - Changed to div instead of Button */}
        <div
          className="absolute left-0 h-full w-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10"
          {...attributes}
          {...listeners}
          role="button"
          tabIndex={0}
          aria-label={`Drag ${item.name}`}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Menu Item */}
        <SidebarMenuButton asChild className="pl-6 w-full cursor-pointer">
          <a href={item.url} className="flex items-center gap-3">
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </a>
        </SidebarMenuButton>
      </div>
    </SidebarMenuItem>
  );
}