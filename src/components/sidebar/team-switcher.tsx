import * as React from "react";
import { Check, ChevronsUpDown, Ellipsis, Plus, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

type Org = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

const organizations: Org[] = [
  {
    label: "company",
    value: "company",
    icon: (
      <div className="flex size-6 items-center justify-center rounded-md border border-neutral-200 bg-neutral-100 font-medium text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900">
        C
      </div>
    ),
  }, 
];

export function TeamSwitcher() {
  const [selectedOrg, setSelectedOrg] = React.useState<Org>(organizations[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="default"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground !py-4 cursor-pointer"
            >
              <span className="relative flex shrink-0 overflow-hidden aspect-square size-6 rounded-md">
                {selectedOrg.icon}
              </span>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold">{selectedOrg.label}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No organization found.</CommandEmpty>
                <CommandGroup>
                  {organizations.map((org) => (
                    <CommandItem
                      key={org.value}
                      onSelect={() => {
                        setSelectedOrg(org);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {org.icon}
                        {org.label}
                      </div>
                      {selectedOrg.value === org.value && (
                        <Check className="ml-auto h-4 w-4" />
                      )}
                    </CommandItem>
                  ))}
                  <CommandItem>
                    <div className="flex items-center gap-2">
                      <Ellipsis className="h-4 w-4" />
                      All organizations
                    </div>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Account settings
                    </div>
                  </CommandItem>
                  <CommandItem>
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Organization settings
                    </div>
                  </CommandItem>
                  <CommandItem>
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add organization
                    </div>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
