import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Configurator from "./components/configurator";

export const metadata = {
  title: "Circadian Clock | SleepWell",
  description:
    "Understand and align with your circadian rhythm. Use the Circadian Clock to boost sleep, energy, and focus based on your internal body clock.",
  keywords: [
    "circadian rhythm",
    "body clock",
    "sleep cycles",
    "energy peaks",
    "blue light",
    "melatonin",
    "chronotype",
    "circadian health",
    "sleep improvement",
    "SleepWell circadian tool",
  ],
  openGraph: {
    title: "Circadian Clock | SleepWell",
    description:
      "Use SleepWell's Circadian Clock to align your sleep and energy with your natural rhythm. Backed by science for better rest and focus.",
    url: "https://sleepwell.app/circadian-clock",
    siteName: "SleepWell",
    images: [
      {
        url: "https://sleepwell.app/og-circadian-clock.png", // ✅ Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Circadian Clock by SleepWell",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Circadian Clock | SleepWell",
    description:
      "Align your sleep, energy, and alertness with your body's internal rhythm using SleepWell's Circadian Clock.",
    images: ["https://sleepwell.app/og-circadian-clock.png"],
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

export default function CircadianClockPage() {
  return (
    <div className="min-h-screen">
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Circadian Clock",
            description:
              "A science-based tool that helps align your sleep and energy with your natural circadian rhythm.",
            applicationCategory: "HealthApplication",
            operatingSystem: "All",
            url: "https://sleepwell.app/circadian-clock",
            image: "https://sleepwell.app/og-circadian-clock.png", // Replace with your real image
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
            Circadian{" "}
            <span className="bg-gradient-to-r from-sleep-600 to-dream-600 bg-clip-text text-transparent">
              Clock
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your circadian clock controls sleep, energy, and alertness across
            the 24-hour day. Align your lifestyle with your natural rhythm to
            improve focus, boost mood, and enhance sleep quality.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Configurator />
        </div>
      </div>

      {/* Circadian Science */}
      <div className="sr-only">
        <h1 className="font-display">Circadian Science</h1>
        <p>How light, timing, and behavior shape your internal clock</p>
        <div className="space-y-3">
          <div>
            <h3 className="font-medium text-sm">Light Exposure</h3>
            <p className="text-xs text-muted-foreground">
              Morning sunlight signals your brain to reset its internal clock,
              boosting cortisol and alertness. In contrast, light at night
              (especially blue light) delays melatonin release, making it harder
              to sleep.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-sm">Consistent Timing</h3>
            <p className="text-xs text-muted-foreground">
              Keeping regular sleep, wake, and meal times helps anchor your
              circadian rhythm. Irregular schedules — like social jet lag — can
              disrupt hormones, digestion, and energy balance.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-sm">Energy Peaks</h3>
            <p className="text-xs text-muted-foreground">
              Most people experience two natural peaks in energy: one in the
              mid-morning (9–11 AM), and another in the late afternoon (4–6 PM).
              Your chronotype may shift these slightly.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <h3 className="font-medium text-sm">Blue Light Impact</h3>
            <p className="text-xs text-muted-foreground">
              Blue light (from screens and LEDs) can suppress melatonin for up
              to 3 hours, delaying sleep onset. Use night mode filters or
              blue-light-blocking glasses in the evening.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <h3 className="font-medium text-sm">Sleep-Wake Hormones</h3>
          <p className="text-xs text-muted-foreground">
            Melatonin helps signal sleepiness, while cortisol drives alertness.
            Both follow a circadian pattern that’s easily disrupted by
            artificial light, stress, or inconsistent habits.
          </p>
        </div>
      </div>
    </div>
  );
}
