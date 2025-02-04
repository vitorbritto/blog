import { getAllTracks } from "@/lib/content";
import { TracksContent } from "./TracksContent";

export async function Tracks() {
  const tracks = await getAllTracks();
  return <TracksContent tracks={tracks} />;
}
