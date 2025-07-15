import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Configurator from "./components/configurator";

export const metadata = {
  title: "Focus Timer | SleepWell",
  description:
    "Boost productivity with SleepWell's Focus Timer. Use the Pomodoro technique to stay focused with timed work sessions and restful breaks.",
  keywords: [
    "focus timer",
    "pomodoro timer",
    "productivity timer",
    "study timer",
    "work session timer",
    "relaxing break timer",
    "focus with sound",
    "timer with ambient sounds",
    "SleepWell Pomodoro",
    "deep work timer",
  ],
  openGraph: {
    title: "Focus Timer | SleepWell",
    description:
      "Stay productive using the Pomodoro method with SleepWell’s customizable focus timer and ambient sound support.",
    url: "https://sleepwell.app/timer",
    siteName: "SleepWell",
    images: [
      {
        url: "https://sleepwell.app/og-focus-timer.png", // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: "Focus Timer - SleepWell",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Focus Timer | SleepWell",
    description:
      "Enhance concentration and manage work sessions with a science-based Pomodoro timer.",
    images: ["https://sleepwell.app/og-focus-timer.png"], // Same image as above
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

export default function FocusTimerPage() {
  return (
    <div className="min-h-screen">
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Focus Timer by SleepWell",
            description:
              "Customizable Pomodoro timer to help you concentrate and take effective breaks. Built for productivity with ambient sound support.",
            applicationCategory: "ProductivityApplication",
            operatingSystem: "All",
            url: "https://sleepwell.app/timer",
            image: "https://sleepwell.app/og-focus-timer.png", // Replace with actual OG image
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
            <Clock className="h-8 w-8 text-primary" />
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
            Focus{" "}
            <span className="bg-gradient-to-r from-sleep-600 to-dream-600 bg-clip-text text-transparent">
              Timer
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Boost your productivity with the Pomodoro Technique. Focused work
            sessions with relaxing breaks.
          </p>
        </div>

        <Configurator />
      </div>
    </div>
  );
}
