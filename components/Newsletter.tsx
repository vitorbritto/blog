import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error();

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12 bg-zinc-900/50 rounded-lg border border-zinc-800">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">Inscreva-se na Newsletter</h3>
        <p className="text-zinc-400 mb-8">
          Receba artigos, tutoriais e dicas diretamente no seu email. Sem spam,
          apenas conteúdo relevante.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor email"
            required
            className="flex-1 px-4 py-3 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Inscrevendo..." : "Inscrever"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-emerald-400">
            Inscrição realizada com sucesso!
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-400">Ocorreu um erro. Tente novamente.</p>
        )}
      </div>
    </div>
  );
}
