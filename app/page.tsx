import { Hero } from "@/components/Hero";
import { Tracks } from "@/components/Tracks";
import { FeaturedPosts } from "@/components/FeaturedPosts";
import { Categories } from "@/components/Categories";

export default async function Home() {
  return (
    <main className="pt-6 min-h-screen">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_30%,transparent_100%)]" />
      </div>
      <Hero />
      <div className="px-6">
        <FeaturedPosts />
        <Tracks />
        <Categories />
      </div>
    </main>
  );
}
