import { CodeXml, Github, Linkedin, Twitter } from 'lucide-react'

export const socialLinks = [
  {
    href: 'https://vitorbritto.dev',
    icon: CodeXml,
    label: 'vitorbritto.dev'
  },
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
    href: 'https://twitter.com/vitorbritto',
    icon: Twitter,
    label: 'Twitter'
  }
] as const
