import HomeClient from "@/components/HomeClient";
import { getBanners } from "@/lib/banners";

// Re-read the banners folder on every request so newly added files show up.
export const dynamic = "force-dynamic";

export default function Home() {
  const banners = getBanners();
  return <HomeClient banners={banners} />;
}
