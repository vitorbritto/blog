import Image from "next/image";
import { Coffee } from "lucide-react";

export function About() {
  return (
    <section className="border-t border-zinc-800 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
            <div className="relative w-48 h-48 mb-6">
              <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 animate-glow blur-md opacity-40" />
              <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 animate-gradient-x" />
              <Image
                src="/avatar.png"
                alt="Vitor Britto"
                fill
                className="relative rounded-lg object-cover"
              />
            </div>
            <a
              href="https://buymeacoffee.com/vitorbritto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition-all group"
            >
              <Coffee className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Me compra um café</span>
            </a>
          </div>
          <div className="lg:w-2/3 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-emerald-400/10 text-emerald-400 ring-1 ring-inset ring-emerald-400/20 mb-4">
              Senior Software Engineer
            </div>
            <h2 className="text-3xl font-bold mb-6">
              Olá, eu sou Vitor Britto{" "}
              <span className="inline-block animate-wave origin-[70%_70%]">
                👋
              </span>
            </h2>
            <div className="space-y-4 text-zinc-400">
              <p>
                Com quase duas décadas de experiência em desenvolvimento de
                software, tenho dedicado minha carreira a criar soluções
                elegantes para problemas complexos. Atualmente, trabalho como
                Senior Software Engineer, focando em desenvolvmento de
                aplicações web e mobile e boas práticas de desenvolvimento.
              </p>
              <p>
                Sou apaixonado por compartilhar conhecimento e contribuir para a
                comunidade de desenvolvimento. Através deste blog, compartilho
                minhas experiências, aprendizados e insights sobre
                desenvolvimento de software, arquitetura e tecnologias modernas.
              </p>
              <p>
                Além do desenvolvimento, sou entusiasta de código limpo, padrões
                de projeto e metodologias ágeis. Acredito que o melhor software
                é aquele que não apenas funciona, mas é também sustentável e
                escalável.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
