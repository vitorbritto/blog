"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { LucideIcon } from "lucide-react";

interface IconLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export function IconLink({ href, icon: Icon, label }: IconLinkProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer p-1.5 rounded-lg hover:bg-zinc-800 hover:text-emerald-400 transition-all active:scale-95"
          >
            <Icon className="w-5 h-5" />
            <span className="sr-only">{label}</span>
          </a>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-zinc-800 text-zinc-100 px-3 py-1.5 rounded-lg text-sm z-50"
            sideOffset={5}
          >
            {label}
            <Tooltip.Arrow className="fill-zinc-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
