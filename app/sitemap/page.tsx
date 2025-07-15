import { Metadata } from "next";
import Link from "next/link";
import ROUTES from "@/constants/ROUTES";
export const dynamic = "force-static";
export const revalidate = 86400;

// Generate Metadata
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Mappa del sito",
    alternates: {
      canonical: `${ROUTES.DEPLOYED_SITE}/sitemap`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

const Sitemap = async () => {
  return (
    <div>
      <Link href="/">
        <h1>Home</h1>
      </Link>
      <Link href="/alarm-clock">
        <h1>Alarm clock</h1>
      </Link>
      <Link href="/circadian-clock">
        <h1>Circadian clock</h1>
      </Link>
      <Link href="/sounds">
        <h1>Sounds</h1>
      </Link>
      <Link href="/lighting">
        <h1>Lighting</h1>
      </Link>
      <Link href="/timer">
        <h1>Timer</h1>
      </Link>
    </div>
  );
};

export default Sitemap;
