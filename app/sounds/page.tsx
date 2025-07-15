import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import Configurator from "./components/Configurator";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Soothing Sleep Sounds | SleepWell",
  description:
    "Explore a calming collection of sleep sounds including rain, white noise, waves, and more. Designed to help you relax, focus, and fall asleep naturally.",
  keywords: [
    "sleep sounds",
    "relaxing sounds",
    "white noise",
    "rain sounds",
    "ambient sleep audio",
    "ocean waves",
    "focus music",
    "calming background sound",
    "SleepWell audio",
    "sounds for better sleep",
  ],
  openGraph: {
    title: "Soothing Sleep Sounds | SleepWell",
    description:
      "Choose from white noise, rain, waves, and more to create a personalized audio environment for sleep and focus.",
    url: "https://sleepwell.app/sounds",
    siteName: "SleepWell",
    images: [
      {
        url: "https://sleepwell.app/og-sounds.png", // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: "Sleep Sounds - SleepWell",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soothing Sleep Sounds | SleepWell",
    description:
      "Relax with calming soundscapes designed for sleep, focus, and stress relief.",
    images: ["https://sleepwell.app/og-sounds.png"], // Same as OG image
  },
  metadataBase: new URL("https://sleepwell.app"),
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function SoundsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "SleepWell Sounds",
            description:
              "A web-based sound tool offering ambient audio like rain, white noise, ocean, and more to help you sleep, focus, or relax.",
            applicationCategory: "HealthApplication",
            operatingSystem: "All",
            url: "https://sleepwell.app/sounds",
            image: "https://sleepwell.app/og-sounds.png", // Replace with your actual OG image
            author: {
              "@type": "Organization",
              name: "SleepWell",
              url: "https://sleepwell.app",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />

      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="flex items-center space-x-2 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-display font-bold text-primary">
              SleepWell
            </span>
          </div>

          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Soothing{" "}
            <span className="bg-gradient-to-r from-sleep-600 to-dream-600 bg-clip-text text-transparent">
              Sounds
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover calming sounds to help you relax, focus, and drift off to
            peaceful sleep.
          </p>
        </div>

        <Configurator />
      </div>
    </div>
  );
}
