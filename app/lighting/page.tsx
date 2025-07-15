import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Moon, Sun, Clock, ArrowLeft, Music } from "lucide-react";
import Link from "next/link";
import Configurator from "./components/configurator";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Sleep Lighting | SleepWell",
  description:
    "Choose soothing red light colors and fade timers to help your body naturally prepare for restful sleep. Zero blue light. Science-backed.",
  keywords: [
    "sleep lighting",
    "red light therapy",
    "night light for sleep",
    "no blue light",
    "circadian lighting",
    "relaxing light",
    "sleep aid lighting",
    "bedtime light",
    "NASA sleep light",
    "SleepWell lighting tool",
  ],
  openGraph: {
    title: "Sleep Lighting | SleepWell",
    description:
      "Wind down with red light and relaxing colors to improve sleep quality and support melatonin production. No blue light disruption.",
    url: "https://sleepwell.app/lighting",
    siteName: "SleepWell",
    images: [
      {
        url: "https://sleepwell.app/og-lighting.png", // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: "Lighting Tool for Sleep by SleepWell",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleep Lighting | SleepWell",
    description:
      "Soothing red light designed for better sleep. Zero blue light. Combine with calming sounds for a perfect wind-down routine.",
    images: ["https://sleepwell.app/og-lighting.png"],
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

export default function LightingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Sleep Lighting Tool",
            description:
              "Red light sleep tool that helps you wind down using zero-blue light colors and fade timers. Developed by SleepWell.",
            applicationCategory: "HealthApplication",
            operatingSystem: "All",
            url: "https://sleepwell.app/lighting",
            image: "https://sleepwell.app/og-lighting.png", // Replace with actual image
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
            <Moon className="h-8 w-8 text-primary" />
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
            Lighting to{" "}
            <span className="bg-gradient-to-r from-sleep-600 to-dream-600 bg-clip-text text-transparent">
              Sleep
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose a soothing color and timer to help you wind down and prepare
            for sleep.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Configurator />

          <Card className="border-dream-200">
            <CardHeader>
              <CardTitle className="font-display">How It Works</CardTitle>
              <CardDescription>
                The science behind color and sleep
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                    <Moon className="h-5 w-5 text-dream-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Red Light Therapy</h3>
                    <p className="text-sm text-muted-foreground">
                      Red light (660-700nm) doesn't suppress melatonin
                      production and helps maintain your natural circadian
                      rhythm. It's used by NASA and sleep researchers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-dream-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Room Lighting</h3>
                    <p className="text-sm text-muted-foreground">
                      The bright overlay provides enough light to illuminate
                      your room while gradually fading to complete darkness,
                      mimicking a natural sunset.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                    <Sun className="h-5 w-5 text-dream-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Zero Blue Light</h3>
                    <p className="text-sm text-muted-foreground">
                      These colors contain no blue light wavelengths, allowing
                      your brain to naturally prepare for sleep without digital
                      disruption.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                    <Music className="h-5 w-5 text-dream-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Sound + Light Combo</h3>
                    <p className="text-sm text-muted-foreground">
                      Enhance your wind-down routine by pairing soothing ambient
                      sounds with relaxing lighting. Choose from rain, waves,
                      white noise, and more to play alongside your selected
                      color.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
