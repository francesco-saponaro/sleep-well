import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Moon, Clock, ArrowLeft, Music, Bell } from "lucide-react";
import Link from "next/link";
import Configurator from "./components/configurator";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Smart Alarm Clock | SleepWell",
  description:
    "Design your ideal sleep-wake routine with SleepWell’s Smart Alarm Clock. Wake gently with light and sound synced to your circadian rhythm.",
  keywords: [
    "smart alarm clock",
    "sleep alarm",
    "gentle wake up",
    "circadian alarm",
    "bedtime routine",
    "wake up light",
    "sleepwell alarm",
    "calming alarm",
    "morning routine",
  ],
  openGraph: {
    title: "Smart Alarm Clock | SleepWell",
    description:
      "Set a science-backed wake-up routine with sound and lighting. Designed to improve mornings and sleep quality.",
    url: "https://sleepwell.app/alarm-clock",
    siteName: "SleepWell",
    images: [
      {
        url: "https://sleepwell.app/og-alarm-clock.png", // Your actual OG image
        width: 1200,
        height: 630,
        alt: "Smart Alarm Clock by SleepWell",
      },
    ],
    locale: "en_US",
    type: "website", // ✅ Fixed here
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Alarm Clock | SleepWell",
    description:
      "Wake up better with synchronized light and sound routines tailored to your natural rhythm.",
    images: ["https://sleepwell.app/og-alarm-clock.png"],
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

export default function AlarmClockPage() {
  return (
    <div className="min-h-screen">
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Smart Alarm Clock",
            description:
              "A personalized alarm clock that combines sound and light to help you fall asleep naturally and wake up refreshed.",
            url: "https://sleepwell.app/alarm-clock",
            brand: {
              "@type": "Brand",
              name: "SleepWell",
            },
            image: "https://sleepwell.app/og-alarm-clock.png", // Update to your real image
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
            Smart{" "}
            <span className="bg-gradient-to-r from-sleep-600 to-dream-600 bg-clip-text text-transparent">
              Alarm Clock
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Set up your perfect sleep and wake routine with synchronized
            lighting, sounds, and gentle transitions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configurator */}
          <Configurator />

          {/* Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-dream-200 sticky top-24">
              <CardHeader>
                <CardTitle className="font-display">
                  How Smart Alarms Work
                </CardTitle>
                <CardDescription>
                  The science behind better mornings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                      <Moon className="h-5 w-5 text-dream-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Sleep Preparation</h3>
                      <p className="text-sm text-muted-foreground">
                        Red light and calming sounds help your body produce
                        melatonin naturally.
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
                        Enhance your wind-down routine by pairing soothing
                        ambient sounds with relaxing lighting. Choose from rain,
                        waves, white noise, and more to play alongside your
                        selected color.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                      <Bell className="h-5 w-5 text-dream-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Gentle Wake-Up Sound</h3>
                      <p className="text-sm text-muted-foreground">
                        Wake up gradually with a gentle sound of your choice—
                        such as birdsong, soft piano, or temple bells—at your
                        selected volume for a smoother start to the day.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-dream-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Circadian Rhythm</h3>
                      <p className="text-sm text-muted-foreground">
                        Consistent timing helps regulate your body's internal
                        clock.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
