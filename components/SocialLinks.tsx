"use client";

import { socialLinks } from "@/config/socialLinks";
import { IconLink } from "./IconLink";

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((link) => (
        <IconLink
          key={link.href}
          href={link.href}
          icon={link.icon}
          label={link.label}
        />
      ))}
    </div>
  );
}
