/// <reference types="vite-plugin-svgr/client" />

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

import Github from "@/assets/icons/github.svg?react";
import Facebook from "@/assets/icons/facebook.svg?react";

function Header() {
  return (
    <header className="relative flex h-14 flex-row items-center gap-1 border-b border-border px-4 sm:px-6">
      <div className="container flex h-16 items-center justify-between max-w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1 cursor-pointer" />
          <Separator
            orientation="vertical"
            className="shrink-0 bg-border w-px mr-2 h-4"
            decorative={true}
          />
          <span className="font-semibold text-sm">Overview</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            target="_blank"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground size-9"
            href="https://github.com/dangnguyenquang"
          >
            <Github />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            target="_blank"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground size-9"
            href="https://www.facebook.com/nguyen.ang.993192"
          >
            <Facebook width={20} height={20} />
            <span className="sr-only">X (formerly Twitter)</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
