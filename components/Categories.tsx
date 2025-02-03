import Link from "next/link";
import {
  Code2,
  Layout,
  Network,
  Cloud,
  Terminal,
  Database,
  Lock,
  Cpu,
} from "lucide-react";

const categories = [
  {
    name: "Front-end",
    slug: "front-end",
    description: "UI/UX, frameworks e bibliotecas",
    count: 12,
    icon: Layout,
    gradient: "from-blue-400/10 to-indigo-400/10",
    hover: "hover:border-indigo-400/50",
  },
  {
    name: "Back-end",
    slug: "back-end",
    description: "APIs, bancos de dados e servidores",
    count: 15,
    icon: Terminal,
    gradient: "from-emerald-400/10 to-green-400/10",
    hover: "hover:border-emerald-400/50",
  },
  {
    name: "Arquitetura",
    slug: "arquitetura",
    description: "Design patterns e boas práticas",
    count: 8,
    icon: Network,
    gradient: "from-orange-400/10 to-amber-400/10",
    hover: "hover:border-orange-400/50",
  },
  {
    name: "DevOps",
    slug: "devops",
    description: "CI/CD, containers e cloud",
    count: 10,
    icon: Cloud,
    gradient: "from-purple-400/10 to-pink-400/10",
    hover: "hover:border-purple-400/50",
  },
  {
    name: "Banco de Dados",
    slug: "databases",
    description: "SQL, NoSQL e performance",
    count: 7,
    icon: Database,
    gradient: "from-cyan-400/10 to-blue-400/10",
    hover: "hover:border-cyan-400/50",
  },
  {
    name: "Segurança",
    slug: "security",
    description: "Auth, HTTPS e boas práticas",
    count: 6,
    icon: Lock,
    gradient: "from-red-400/10 to-rose-400/10",
    hover: "hover:border-red-400/50",
  },
  {
    name: "Performance",
    slug: "performance",
    description: "Otimização e métricas",
    count: 5,
    icon: Cpu,
    gradient: "from-yellow-400/10 to-amber-400/10",
    hover: "hover:border-yellow-400/50",
  },
  {
    name: "Algoritmos",
    slug: "algorithms",
    description: "Estruturas de dados e lógica",
    count: 9,
    icon: Code2,
    gradient: "from-teal-400/10 to-emerald-400/10",
    hover: "hover:border-teal-400/50",
  },
];

export function Categories() {
  return (
    <section id="categories" className="max-w-6xl mx-auto mb-32">
      <h2 className="text-2xl font-bold mb-12">Categorias</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className={`group relative overflow-hidden rounded-lg border border-zinc-800 bg-gradient-to-br ${category.gradient} p-6 transition-all duration-300 ${category.hover}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    <h3 className="text-lg font-bold group-hover:text-white transition-colors">
                      {category.name}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">
                    {category.description}
                  </p>
                </div>
                <span className="text-sm font-mono text-zinc-400">
                  {category.count}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
