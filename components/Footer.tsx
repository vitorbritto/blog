import Link from "next/link";
import { Github, Linkedin, Youtube, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-sm text-zinc-400 mb-4">
              Receba as últimas atualizações e artigos diretamente no seu email.
              Sem spam, apenas conteúdo relevante.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 bg-zinc-800 rounded-lg px-4 py-2 text-sm border border-zinc-700 focus:border-emerald-400 focus:outline-none"
              />
              <button className="px-4 py-2 bg-emerald-400 text-zinc-900 rounded-lg hover:bg-emerald-300 transition-colors text-sm font-medium">
                Inscrever
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  Artigos
                </Link>
              </li>
              <li>
                <Link
                  href="/tracks"
                  className="text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  Trilhas
                </Link>
              </li>
              <li>
                <Link
                  href="https://vitorbritto.dev"
                  target="_blank"
                  className="text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Conecte-se</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://github.com/vitorbritto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/vitorbritto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@vitor.britto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/@vitorbritto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Medium
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-400">
            © 2025 Vitor Britto - Blog. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacidade"
              className="text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              Privacidade
            </Link>
            <Link
              href="/termos"
              className="text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
