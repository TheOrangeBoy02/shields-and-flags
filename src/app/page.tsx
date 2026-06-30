import HomeClient from "@/components/HomeClient";
import { getBanners } from "@/lib/banners";

// Banners are read from public/banners/ at build time. To add one, drop the
// file in that folder and redeploy. Reading at request time doesn't work on
// Vercel because public/ assets aren't in the serverless filesystem at runtime.

export default function Home() {
  const banners = getBanners();
  return <HomeClient banners={banners} />;
}
