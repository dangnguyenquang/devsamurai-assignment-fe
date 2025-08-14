import * as React from "react";
import { Check, ChevronsUpDown, Plus, Search, Settings } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  { label: "All organizations", value: "all" },
];

export default function OrgSwitcher() {
  const [open, setOpen] = React.useState(false);
  const [selectedOrg, setSelectedOrg] = React.useState<Org>(organizations[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            {selectedOrg.icon}
            <span className="truncate font-bold">{selectedOrg.label}</span>
          </div>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0">
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
                    setOpen(false);
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
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
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
      </PopoverContent>
    </Popover>
  );
}
