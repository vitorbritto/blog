import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="px-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6 max-w-3xl pt-6 pb-24">
          <h1
            className={cn(
              "text-6xl font-bold leading-tight",
              "bg-gradient-to-r from-white via-emerald-400 to-emerald-600",
              "bg-clip-text text-transparent",
              "animate-gradient-x bg-[length:200%_auto]"
            )}
          >
            Um blog sobre{" "}
            <span className="text-balance">tecnologia e carreira</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Artigos, tutoriais e discussões sobre desenvolvimento web, boas
            práticas e tecnologias modernas.
          </p>
        </div>
      </div>
    </section>
  );
}
