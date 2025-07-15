import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Moon,
  Brain,
  Star,
  ArrowRight,
  Sun,
  Music2,
  AlarmClock,
  Timer,
  Globe,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import SleepQuizButton from "@/components/SleepQuizButton";

// ✅ SEO Metadata for Next.js App Router
export const metadata = {
  title: "SleepWell – Sleep Better, Live Better",
  description:
    "Personalized tools to help you sleep deeper, focus sharper, and wake refreshed. Use circadian lighting, smart alarms, sleep sounds, and more.",
  keywords: [
    "sleep",
    "circadian rhythm",
    "focus timer",
    "sleep tools",
    "ambient lighting",
    "sleep sounds",
    "smart alarm",
    "sleep optimization",
    "melatonin",
    "wind down routine",
  ],
  openGraph: {
    title: "SleepWell – Sleep Better, Live Better",
    description:
      "Design your perfect sleep environment with circadian lighting, sleep sounds, and smart alarm tools backed by science.",
    url: "https://sleepwell.app",
    siteName: "SleepWell",
    images: [
      {
        url: "https://sleepwell.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "SleepWell - Sleep Better, Live Better",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SleepWell – Sleep Better, Live Better",
    description:
      "Personalized sleep tools designed to help you fall asleep faster, stay asleep longer, and wake up refreshed.",
    images: ["https://sleepwell.app/og-image.png"],
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background ">
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "SleepWell",
            url: "https://sleepwell.app",
            description:
              "Science-backed tools to improve your sleep using light, sound, alarms, and circadian rhythm optimization.",
            publisher: {
              "@type": "Organization",
              name: "SleepWell",
              logo: {
                "@type": "ImageObject",
                url: "https://sleepwell.app/logo.png",
              },
            },
            potentialAction: [
              {
                "@type": "ViewAction",
                name: "Lighting Tools",
                target: "https://sleepwell.app/lighting",
              },
              {
                "@type": "ViewAction",
                name: "Soothing Sounds",
                target: "https://sleepwell.app/sounds",
              },
              {
                "@type": "ViewAction",
                name: "Smart Alarm Clock",
                target: "https://sleepwell.app/alarm-clock",
              },
              {
                "@type": "ViewAction",
                name: "Focus Timer",
                target: "https://sleepwell.app/timer",
              },
              {
                "@type": "ViewAction",
                name: "Circadian Clock",
                target: "https://sleepwell.app/circadian-clock",
              },
            ],
          }),
        }}
      />

      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50 relative">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Moon className="h-8 w-8 text-primary" />
            <span className="text-2xl font-display font-bold text-primary">
              SleepWell
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/lighting"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Lighting
            </Link>
            <Link
              href="/sounds"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Sounds
            </Link>
            <Link
              href="/alarm-clock"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Alarm clock
            </Link>
            <Link
              href="/timer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Focus timer
            </Link>
            <Link
              href="/circadian-clock"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Circadian clock
            </Link>
          </nav>

          {/* Desktop Theme Toggle */}
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-[1200px] mx-auto text-center px-4">
          <Badge variant="secondary" className="mb-6 animate-fade-in">
            <Star className="h-3 w-3 mr-1" />
            Transform Your Sleep Tonight
          </Badge>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-slide-up">
            Sleep Well,{" "}
            <span className="bg-gradient-to-r from-sleep-600 to-dream-600 bg-clip-text text-transparent">
              Live Better
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
            Create your perfect sleep and focus environment. Wind down with
            calming lights, soothing sounds, smart alarms, and science-backed
            tools designed to help you sleep deeper, focus better, and wake up
            refreshed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="#features">
                Explore All Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <SleepQuizButton />
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-4 pt-20">
          <Card className="gradient-dream border-0 text-center p-12"></Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-background">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              Everything You Need for Better Sleep
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you understand, improve,
              and optimize your sleep patterns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="cursor-pointer group hover:shadow-lg transition-all duration-300 border-sleep-200 hover:border-sleep-300">
              <CardHeader>
                <div className="h-12 w-12 bg-sleep-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sleep-200 transition-colors">
                  <Sun className="h-6 w-6 text-sleep-600" />
                </div>
                <CardTitle className="font-display">Ambient Lighting</CardTitle>
                <CardDescription>
                  Fill your space with calming colors designed to help you relax
                  and fall asleep naturally.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer group hover:shadow-lg transition-all duration-300 border-dream-200 hover:border-dream-300">
              <CardHeader>
                <div className="h-12 w-12 bg-dream-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-dream-200 transition-colors">
                  <Music2 className="h-6 w-6 text-dream-600" />
                </div>
                <CardTitle className="font-display">Soothing Sounds</CardTitle>
                <CardDescription>
                  Curated sleep sounds and nature ambience to help you drift off
                  and stay asleep.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer group hover:shadow-lg transition-all duration-300 border-sleep-200 hover:border-sleep-300">
              <CardHeader>
                <div className="h-12 w-12 bg-sleep-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sleep-200 transition-colors">
                  <AlarmClock className="h-6 w-6 text-sleep-600" />
                </div>
                <CardTitle className="font-display">
                  Smart Alarm Clock
                </CardTitle>
                <CardDescription>
                  Fall asleep with light and sound, and wake gently with sunrise
                  alarms synced to your rhythm.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer group hover:shadow-lg transition-all duration-300 border-dream-200 hover:border-dream-300">
              <CardHeader>
                <div className="h-12 w-12 bg-dream-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-dream-200 transition-colors">
                  <Timer className="h-6 w-6 text-dream-600" />
                </div>
                <CardTitle className="font-display">Focus Timer</CardTitle>
                <CardDescription>
                  Stay productive with custom Pomodoro sessions, ambient sounds,
                  and focus-enhancing lighting.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer group hover:shadow-lg transition-all duration-300 border-sleep-200 hover:border-sleep-300">
              <CardHeader>
                <div className="h-12 w-12 bg-sleep-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sleep-200 transition-colors">
                  <Globe className="h-6 w-6 text-sleep-600" />
                </div>
                <CardTitle className="font-display">Circadian Clock</CardTitle>
                <CardDescription>
                  Align your sleep schedule with your internal body clock for
                  better rest and energy.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer group hover:shadow-lg transition-all duration-300 border-dream-200 hover:border-dream-300">
              <CardHeader>
                <div className="h-12 w-12 bg-dream-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-dream-200 transition-colors">
                  <BookOpen className="h-6 w-6 text-dream-600" />
                </div>
                <CardTitle className="font-display">Sleep Stories</CardTitle>
                <CardDescription>
                  Listen to calming bedtime stories and narrated tales crafted
                  to help you unwind and sleep deeply.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Sponsored Product Card */}
          <Card className="cursor-pointer mt-20 group hover:shadow-lg transition-all duration-300 border-amber-200 hover:border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Badge
                variant="secondary"
                className="text-xs bg-amber-100 text-amber-800 border-amber-200"
              >
                Sponsored
              </Badge>
            </div>
            <CardHeader>
              <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                <Star className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="font-display text-amber-900">
                DreamCloud Mattress
              </CardTitle>
              <CardDescription className="text-amber-700">
                Premium hybrid mattress designed for optimal sleep comfort.
                365-night trial with free shipping.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                Shop Now - 40% Off
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/80 backdrop-blur-sm py-12 px-4">
        <div className="max-w-[1200px] mx-auto text-center px-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Moon className="h-6 w-6 text-primary" />
            <span className="text-xl font-display font-bold text-primary">
              SleepWell
            </span>
          </div>
          <p className="text-muted-foreground">
            © 2024 SleepWell. Sweet dreams and better mornings.
          </p>
        </div>
      </footer>
    </div>
  );
}
