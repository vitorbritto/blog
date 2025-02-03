import { Github, Linkedin, Youtube, BookOpen } from "lucide-react";

export const socialLinks = [
  {
    href: "https://github.com/vitorbritto",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/vitorbritto",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://youtube.com/@vitor.britto",
    icon: Youtube,
    label: "YouTube",
  },
  {
    href: "https://medium.com/@vitorbritto",
    icon: BookOpen,
    label: "Medium",
  },
] as const;
