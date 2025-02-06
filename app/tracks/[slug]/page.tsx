import { getArticlesByTrack } from "@/lib/content";
import { TrackTimeline } from "@/components/TrackTimeline";
import { NotFound } from "@/components/NotFound";

const tracks: Record<string, string> = {
  "front-end": "front-end",
  "back-end": "back-end",
  "system-design": "system-design",
  "design-patterns": "design-patterns",
  "react-design-patterns": "react-design-patterns",
};

interface TrackPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { slug } = await params;
  const articles = await getArticlesByTrack(slug);
  const track = tracks[slug];
  const trackTitle = {
    "front-end": "Front-end",
    "back-end": "Back-end",
    "system-design": "System Design",
    "design-patterns": "Design Patterns",
    "react-design-patterns": "React Design Patterns",
  }[slug];

  if (!track) {
    return (
      <NotFound
        title={`Trilha não encontrada: ${trackTitle}`}
        description="Desculpe, mas não conseguimos encontrar a trilha que você está procurando."
        backTo={{
          href: "/tracks",
          label: "Voltar para as trilhas",
        }}
      />
    );
  }

  const trackArticles = articles.filter((article) =>
    article.tracks?.includes(track)
  );

  if (trackArticles.length === 0) {
    return (
      <NotFound
        title={`Nenhum artigo encontrado para a trilha ${trackTitle}`}
        description="Desculpe, mas não conseguimos encontrar artigos para esta trilha."
        backTo={{
          href: "/tracks",
          label: "Voltar para as trilhas",
        }}
      />
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-24">
      <div className="max-w-2xl mb-16">
        <h1 className="text-4xl font-bold mb-4">Trilha {trackTitle}</h1>
        <p className="text-zinc-400">
          Aprenda de forma estruturada com nossa trilha de conteúdo
          cuidadosamente organizada.
        </p>
      </div>

      <TrackTimeline articles={trackArticles} />
    </main>
  );
}

// Gera as rotas estáticas para cada trilha
export function generateStaticParams() {
  return Object.keys(tracks).map((slug) => ({
    slug,
  }));
}
