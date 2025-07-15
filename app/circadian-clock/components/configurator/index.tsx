"use client";

import { useState, useEffect, useMemo } from "react";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Clock,
  Sun,
  Moon,
  Lightbulb,
  Coffee,
  Bed,
  Eye,
  Zap,
  Star,
  ArrowRight,
  Bell,
  X,
  ShoppingCart,
  Headphones,
} from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import EnergyChart from "@/components/EnergyChart";

const chronotypes = [
  {
    id: "lion",
    name: "Lion",
    description: "Early riser, productive in the morning",
    sleepWindow: { bedtime: "21:00", wakeup: "05:30" },
    // Lions typically hit peak energy ~30–60 minutes after waking
    // Early morning is their strongest time, with a second wind ~1–2 PM possible
    peakHours: [6, 7, 8, 9, 10],
    // Energy dips strongly in the evening; early bedtime required
    lowHours: [14, 20, 21],
  },
  {
    id: "bear",
    name: "Bear",
    description: "Follows the sun, sleeps well at night",
    sleepWindow: { bedtime: "22:00", wakeup: "07:00" },
    // Bears take ~1.5–2 hours to reach full alertness
    // Peak is mid-morning and again mid-afternoon
    peakHours: [9, 10, 11, 14],
    // Natural dip post-lunch, and slight fatigue before bedtime
    lowHours: [13, 15, 21],
  },
  {
    id: "wolf",
    name: "Wolf",
    description: "Night owl, creative in the evening",
    sleepWindow: { bedtime: "00:00", wakeup: "08:00" },
    // Wolves need ~3–4 hours to hit peak after waking
    // Peak is in late afternoon and evening
    peakHours: [12, 16, 17, 20, 21],
    // Early morning is hard for wolves
    lowHours: [6, 7, 8, 13],
  },
  {
    id: "dolphin",
    name: "Dolphin",
    description: "Light sleeper, erratic energy",
    sleepWindow: { bedtime: "23:30", wakeup: "07:00" },
    // Dolphins have scattered focus peaks due to inconsistent rhythms
    // Light peaks around late morning and again in the afternoon
    peakHours: [10, 12, 14, 16],
    // Afternoon slump is strong; also sensitive to overstimulation at night
    lowHours: [13, 15, 21],
  },
];

// Product recommendations for monetization
const sleepProducts = [
  {
    id: "blue-light-glasses",
    name: "Blue Light Blocking Glasses",
    price: "$29.99",
    originalPrice: "$49.99",
    discount: "40% off",
    rating: 4.8,
    reviews: 2847,
    image: "🕶️",
    description: "Block harmful blue light 2 hours before bed",
    affiliate: true,
  },
  {
    id: "melatonin-gummies",
    name: "Natural Melatonin Gummies",
    price: "$19.99",
    originalPrice: "$24.99",
    discount: "20% off",
    rating: 4.6,
    reviews: 1923,
    image: "🍯",
    description: "3mg melatonin with L-theanine for better sleep",
    affiliate: true,
  },
  {
    id: "sleep-ring",
    name: "Oura Ring Gen3",
    price: "$299.00",
    originalPrice: "$399.00",
    discount: "25% off",
    rating: 4.7,
    reviews: 5621,
    image: "💍",
    description: "Track sleep stages, HRV, and recovery",
    affiliate: true,
  },
  {
    id: "smart-bulbs",
    name: "Philips Hue Smart Bulbs",
    price: "$89.99",
    originalPrice: "$119.99",
    discount: "25% off",
    rating: 4.9,
    reviews: 8234,
    image: "💡",
    description: "Circadian lighting that adapts to your rhythm",
    affiliate: true,
  },
];

export default function CircadianClockPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedChronotype, setSelectedChronotype] = useState(
    chronotypes[0].id
  );

  const [showFloatingAd, setShowFloatingAd] = useState(true);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get current chronotype data
  const chronotype =
    chronotypes.find((c) => c.id === selectedChronotype) || chronotypes[1];

  // Get current hour for calculations
  const currentHour = currentTime.getHours();

  const getBiologicalAdvice = () => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const nowMinutes = hour * 60 + minute;

    const {
      sleepWindow: { bedtime, wakeup },
      peakHours,
      lowHours,
    } = chronotype;

    const [bedHour, bedMin] = bedtime.split(":").map(Number);
    const [wakeHour, wakeMin] = wakeup.split(":").map(Number);
    const bedtimeMinutes = bedHour * 60 + bedMin;
    const wakeupMinutes = wakeHour * 60 + wakeMin;

    const isSleepTime = () => {
      if (bedtimeMinutes < wakeupMinutes) {
        return nowMinutes >= bedtimeMinutes && nowMinutes < wakeupMinutes;
      } else {
        // Overnight sleep
        return nowMinutes >= bedtimeMinutes || nowMinutes < wakeupMinutes;
      }
    };

    if (
      (nowMinutes >= wakeupMinutes && nowMinutes < wakeupMinutes + 120) ||
      (wakeupMinutes > 1320 && nowMinutes < 120) // handles 22:00+ wakeups
    ) {
      return {
        title: "Morning Light Exposure",
        advice:
          "Get bright light exposure to kickstart your circadian rhythm. Open curtains or step outside.",
        icon: Sun,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
      };
    }

    if (peakHours.includes(hour)) {
      return {
        title: "Peak Alertness",
        advice:
          "This is your optimal time for focused work and important decisions. Tackle challenging tasks now.",
        icon: Zap,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      };
    }

    if (lowHours.includes(hour)) {
      return {
        title: "Energy Dip",
        advice:
          "Your energy may be low. Consider rest, light activity, or low-stimulus tasks.",
        icon: Coffee,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      };
    }

    if (
      nowMinutes >= bedtimeMinutes - 120 &&
      nowMinutes < bedtimeMinutes &&
      !isSleepTime()
    ) {
      return {
        title: "Wind Down Begins",
        advice:
          "Start reducing stimulation. Dim lights, avoid heavy meals, and begin relaxing activities.",
        icon: Moon,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
      };
    }

    if (isSleepTime()) {
      return {
        title: "Sleep Time",
        advice:
          "Your body is producing melatonin. Keep lights dim and prepare for restorative sleep.",
        icon: Moon,
        color: "text-slate-600",
        bgColor: "bg-slate-50",
      };
    }

    return {
      title: "Neutral Zone",
      advice:
        "This time may not be especially productive or low — do routine tasks or recharge.",
      icon: Clock,
      color: "text-muted-foreground",
      bgColor: "bg-muted/10",
    };
  };

  const getLightingSuggestions = () => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const nowMinutes = hour * 60 + minute;

    const {
      sleepWindow: { bedtime, wakeup },
    } = chronotype;

    const [bedHour, bedMin] = bedtime.split(":").map(Number);
    const [wakeHour, wakeMin] = wakeup.split(":").map(Number);
    const bedtimeMinutes = bedHour * 60 + bedMin;
    const wakeupMinutes = wakeHour * 60 + wakeMin;

    const isSleepTime = () => {
      if (bedtimeMinutes < wakeupMinutes) {
        return nowMinutes >= bedtimeMinutes && nowMinutes < wakeupMinutes;
      } else {
        // Overnight sleep
        return nowMinutes >= bedtimeMinutes || nowMinutes < wakeupMinutes;
      }
    };

    // Bright Light: 0–2h after waking
    if (
      (nowMinutes >= wakeupMinutes && nowMinutes < wakeupMinutes + 120) ||
      (wakeupMinutes > 1320 && nowMinutes < 120) // handles very late wakeups
    ) {
      return {
        title: "Bright Morning Light",
        suggestion:
          "Expose yourself to bright light (10,000 lux) within 2 hours of waking. Natural sunlight is ideal.",
        color: "text-yellow-600",
      };
    }

    // Natural Daylight: 2–6h after waking
    if (nowMinutes >= wakeupMinutes + 120 && nowMinutes < wakeupMinutes + 360) {
      return {
        title: "Natural Daylight",
        suggestion:
          "Maintain a bright environment. Let sunlight in or work near a window.",
        color: "text-blue-600",
      };
    }

    // Warm Light Transition: 4–2h before bedtime
    if (
      nowMinutes >= bedtimeMinutes - 240 &&
      nowMinutes < bedtimeMinutes - 120
    ) {
      return {
        title: "Warm Afternoon Light",
        suggestion:
          "Begin transitioning to warmer light (3000K–4000K). Avoid harsh overhead lighting.",
        color: "text-orange-600",
      };
    }

    // Dim Light: 2h before bedtime
    if (nowMinutes >= bedtimeMinutes - 120 && nowMinutes < bedtimeMinutes) {
      return {
        title: "Dim Warm Light",
        suggestion:
          "Use warm white lighting (2700K). Reduce screen use and lower overall brightness.",
        color: "text-amber-600",
      };
    }

    // Sleep time
    if (isSleepTime()) {
      return {
        title: "Minimal Red Light",
        suggestion:
          "If you need light, use dim red lighting. Ideally, sleep in full darkness.",
        color: "text-red-800",
      };
    }

    return {
      title: "Neutral Lighting",
      suggestion: "Adjust lighting based on comfort and task needs.",
      color: "text-muted-foreground",
    };
  };

  const getQuickActions = () => {
    const { title } = advice;

    const actions = [];

    if (title === "Morning Light Exposure") {
      actions.push({
        label: "Start Morning Sounds",
        href: "/sounds",
        icon: Sun,
      });
      actions.push({
        label: "Open Lighting Tool",
        href: "/lighting",
        icon: Lightbulb,
      });
    }

    if (title === "Peak Alertness") {
      actions.push({
        label: "Start Focus Timer",
        href: "/timer",
        icon: Zap,
      });
      actions.push({
        label: "Use Focus Sounds",
        href: "/sounds",
        icon: Headphones,
      });
    }

    if (title === "Energy Dip") {
      actions.push({
        label: "Play Refreshing Sound",
        href: "/sounds",
        icon: Coffee,
      });
      actions.push({
        label: "Take a Break",
        href: "/timer",
        icon: Clock,
      });
    }

    if (title === "Wind Down Begins") {
      actions.push({
        label: "Start Wind-Down Sounds",
        href: "/sounds",
        icon: Moon,
      });
      actions.push({
        label: "Dim Lighting",
        href: "/lighting",
        icon: Lightbulb,
      });
    }

    if (title === "Sleep Time") {
      actions.push({
        label: "Set Alarm Clock",
        href: "/alarm-clock",
        icon: Bell,
      });
      actions.push({
        label: "Play Sleep Sounds",
        href: "/sounds",
        icon: Bed,
      });
    }

    // Fallback
    if (actions.length === 0) {
      actions.push({
        label: "Open Lighting Tool",
        href: "/lighting",
        icon: Lightbulb,
      });
      actions.push({
        label: "Try a Focus Timer",
        href: "/timer",
        icon: Zap,
      });
    }

    return actions;
  };

  // Generate 24-hour energy data
  const generateEnergyData = () => {
    const baseEnergy = [
      30, 25, 20, 15, 20, 40, 60, 80, 90, 85, 80, 75, 60, 50, 65, 75, 80, 75,
      65, 50, 40, 35, 30, 25,
    ];

    // Adjust based on chronotype
    if (selectedChronotype === "lion") {
      return baseEnergy.map((energy, hour) => {
        if (hour >= 6 && hour <= 10) return Math.min(100, energy + 15);
        if (hour >= 20 || hour < 6) return Math.max(10, energy - 20);
        return energy;
      });
    } else if (selectedChronotype === "bear") {
      return baseEnergy.map((energy, hour) => {
        if ([9, 10, 11, 14].includes(hour)) return Math.min(100, energy + 10);
        if ([13, 15, 21].includes(hour)) return Math.max(10, energy - 10);
        return energy;
      });
    } else if (selectedChronotype === "wolf") {
      return baseEnergy.map((energy, hour) => {
        if ([16, 17, 20, 21].includes(hour)) return Math.min(100, energy + 20);
        if ([6, 7, 8].includes(hour)) return Math.max(10, energy - 20);
        return energy;
      });
    } else if (selectedChronotype === "dolphin") {
      return baseEnergy.map((energy, hour) => {
        if ([10, 12, 14, 16].includes(hour)) return Math.min(100, energy + 10);
        if ([13, 15, 21].includes(hour)) return Math.max(10, energy - 15);
        return energy;
      });
    }

    return baseEnergy;
  };

  const energyData = useMemo(() => generateEnergyData(), [selectedChronotype]);
  const advice = getBiologicalAdvice();
  const lighting = getLightingSuggestions();

  // Format time display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        {/* Current Time & Biological Advice */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Current Time */}
          <Card className="border-sleep-200">
            <CardHeader>
              <CardTitle className="font-display flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Current Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-4xl font-display font-bold text-primary">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(currentTime)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Biological Advice */}
          <Card
            className={`${advice.bgColor} border-sleep-200 dark:bg-opacity-20`}
          >
            <CardHeader>
              <CardTitle className="font-display flex items-center">
                <advice.icon className={`h-5 w-5 mr-2 ${advice.color}`} />
                {advice.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{advice.advice}</p>
            </CardContent>
          </Card>
        </div>

        {/* Chronotype Selector */}
        <Card className="border-dream-200">
          <CardHeader>
            <CardTitle className="font-display">Your Chronotype</CardTitle>
            <CardDescription>
              Select your natural sleep-wake preference
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              value={selectedChronotype}
              onValueChange={setSelectedChronotype}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Chronotypes</SelectLabel>
                  {chronotypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center">
                        {type.id === "lark" && (
                          <Sun className="h-4 w-4 mr-2 text-yellow-600" />
                        )}
                        {type.id === "intermediate" && (
                          <Clock className="h-4 w-4 mr-2 text-blue-600" />
                        )}
                        {type.id === "owl" && (
                          <Moon className="h-4 w-4 mr-2 text-purple-600" />
                        )}
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {type.description}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Ideal Sleep Window */}
            <div className="p-4 bg-background/50 rounded-lg">
              <h3 className="font-medium mb-2">Your Ideal Sleep Window</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bed className="h-4 w-4 text-sleep-600" />
                  <span className="text-sm">
                    Bedtime: {chronotype.sleepWindow.bedtime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">
                    Wake up: {chronotype.sleepWindow.wakeup}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground leading-relaxed mt-4">
              <p className="mb-2 font-medium">About the {chronotype.name}:</p>
              {selectedChronotype === "lion" && (
                <p>
                  Lions are early risers with energy that peaks in the morning.
                  They thrive on routine, but tend to crash in the evening.
                  Ideal for early workouts, deep work, and early meals.
                </p>
              )}
              {selectedChronotype === "bear" && (
                <p>
                  Bears follow the sun and have a steady rhythm. Their energy
                  peaks mid-morning and dips after lunch. Great for aligning
                  with standard work hours and steady routines.
                </p>
              )}
              {selectedChronotype === "wolf" && (
                <p>
                  Wolves are night owls who feel most alert in the late
                  afternoon or evening. They often struggle with traditional 9–5
                  schedules but excel at creative and solo work late in the day.
                </p>
              )}
              {selectedChronotype === "dolphin" && (
                <p>
                  Dolphins are light sleepers with scattered energy peaks.
                  They’re often alert at night but prone to daytime fatigue.
                  Best to structure the day around short bursts of focus and
                  flexible sleep.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 24-Hour Energy Graph */}
        <Card className="border-sleep-200">
          <CardHeader>
            <CardTitle className="font-display">24-Hour Energy Curve</CardTitle>
            <CardDescription>
              Your predicted energy levels throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Simple bar chart representation */}
            <EnergyChart energyData={energyData} currentHour={currentHour} />
          </CardContent>
        </Card>

        {/* Sleep Optimization Tools Carousel - Monetization - Desktop */}
        <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 hidden lg:block">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-display text-amber-900">
                  Sleep Better With These Tools
                </CardTitle>
                <CardDescription className="text-amber-700">
                  Recommended products to optimize your circadian rhythm
                </CardDescription>
              </div>
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-800"
              >
                Sponsored
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sleepProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/70 rounded-lg p-4 hover:bg-white/90 transition-colors"
                >
                  <div className="text-center space-y-2">
                    <div className="text-3xl">{product.image}</div>
                    <h3 className="font-medium text-sm text-amber-900">
                      {product.name}
                    </h3>
                    <p className="text-xs text-amber-700">
                      {product.description}
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="font-bold text-amber-900">
                          {product.price}
                        </span>
                        <span className="text-xs line-through text-amber-600">
                          {product.originalPrice}
                        </span>
                      </div>
                      <div className="text-xs text-amber-700">
                        {product.discount}
                      </div>
                      <div className="flex items-center justify-center space-x-1 text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                        <span className="text-amber-600">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <ShoppingCart className="mr-1 h-3 w-3" />
                      Shop Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        {/* Lighting Suggestions */}
        <Card className="border-dream-200">
          <CardHeader>
            <CardTitle className="font-display flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Lighting Guidance
            </CardTitle>
            <CardDescription>
              Optimize your light exposure right now
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h3 className={`font-medium ${lighting.color}`}>
                  {lighting.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {lighting.suggestion}
                </p>
              </div>

              <div className="p-3 bg-background/50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  {getQuickActions().map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href={action.href}>
                        <action.icon className="mr-2 h-4 w-4" />
                        {action.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sleep Optimization Tools Carousel - Monetization - Desktop */}
        <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 block lg:hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-display text-amber-900">
                  Sleep Better With These Tools
                </CardTitle>
                <CardDescription className="text-amber-700">
                  Recommended products to optimize your circadian rhythm
                </CardDescription>
              </div>
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-800"
              >
                Sponsored
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sleepProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/70 rounded-lg p-4 hover:bg-white/90 transition-colors"
                >
                  <div className="text-center space-y-2">
                    <div className="text-3xl">{product.image}</div>
                    <h3 className="font-medium text-sm text-amber-900">
                      {product.name}
                    </h3>
                    <p className="text-xs text-amber-700">
                      {product.description}
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="font-bold text-amber-900">
                          {product.price}
                        </span>
                        <span className="text-xs line-through text-amber-600">
                          {product.originalPrice}
                        </span>
                      </div>
                      <div className="text-xs text-amber-700">
                        {product.discount}
                      </div>
                      <div className="flex items-center justify-center space-x-1 text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                        <span className="text-amber-600">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <ShoppingCart className="mr-1 h-3 w-3" />
                      Shop Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Circadian Science */}
        <Card className="border-sleep-200">
          <CardHeader>
            <CardTitle className="font-display">Circadian Science</CardTitle>
            <CardDescription>
              How light, timing, and behavior shape your internal clock
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                  <Sun className="h-5 w-5 text-dream-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Light Exposure</h3>
                  <p className="text-xs text-muted-foreground">
                    Morning sunlight signals your brain to reset its internal
                    clock, boosting cortisol and alertness. In contrast, light
                    at night (especially blue light) delays melatonin release,
                    making it harder to sleep.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-dream-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Consistent Timing</h3>
                  <p className="text-xs text-muted-foreground">
                    Keeping regular sleep, wake, and meal times helps anchor
                    your circadian rhythm. Irregular schedules — like social jet
                    lag — can disrupt hormones, digestion, and energy balance.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-dream-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Energy Peaks</h3>
                  <p className="text-xs text-muted-foreground">
                    Most people experience two natural peaks in energy: one in
                    the mid-morning (9–11 AM), and another in the late afternoon
                    (4–6 PM). Your chronotype may shift these slightly.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                  <Eye className="h-5 w-5 text-dream-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Blue Light Impact</h3>
                  <p className="text-xs text-muted-foreground">
                    Blue light (from screens and LEDs) can suppress melatonin
                    for up to 3 hours, delaying sleep onset. Use night mode
                    filters or blue-light-blocking glasses in the evening.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                  <Moon className="h-5 w-5 text-dream-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Sleep-Wake Hormones</h3>
                  <p className="text-xs text-muted-foreground">
                    Melatonin helps signal sleepiness, while cortisol drives
                    alertness. Both follow a circadian pattern that’s easily
                    disrupted by artificial light, stress, or inconsistent
                    habits.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Smart Light Bulbs CTA */}
      {showFloatingAd && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm">
          <Card className="border-amber-200 bg-gradient-to-r from-amber-100 to-orange-100 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 bg-amber-200 rounded-lg flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm text-amber-900">
                      Smart Circadian Lighting
                    </h3>
                    <p className="text-xs text-amber-700 mt-1">
                      Philips Hue bulbs automatically adjust to your rhythm
                    </p>
                    <Button
                      size="sm"
                      className="mt-2 bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Try Now - 25% Off
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowFloatingAd(false)}
                  className="text-amber-700 hover:bg-amber-200 p-1"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
