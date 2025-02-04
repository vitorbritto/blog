import { TracksPageContent } from "@/components/TracksPageContent";
import { getAllTracks } from "@/lib/content";

export default async function TracksPage() {
  const tracks = await getAllTracks();
  return <TracksPageContent tracks={tracks} />;
}
