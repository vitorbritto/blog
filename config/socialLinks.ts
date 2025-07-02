import { Github, Linkedin, Youtube, BookOpen, Code, FileStack } from 'lucide-react'

export const socialLinks = [
  {
    href: 'https://github.com/vitorbritto',
    icon: Github,
    label: 'GitHub'
  },
  {
    href: 'https://linkedin.com/in/vitorbritto',
    icon: Linkedin,
    label: 'LinkedIn'
  },
  {
    href: 'https://youtube.com/@vitor.britto',
    icon: Youtube,
    label: 'YouTube'
  },
  {
    href: 'https://medium.com/@vitorbritto',
    icon: BookOpen,
    label: 'Medium'
  },
  {
    href: 'https://dev.to/vitorbritto',
    icon: Code,
    label: 'Dev.to'
  },
  {
    href: 'https://substack.com/@vitorbritto',
    icon: FileStack,
    label: 'Substack'
  }
] as const
