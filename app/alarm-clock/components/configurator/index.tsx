"use client";
import { useState, useEffect, useRef } from "react";
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
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Music,
  Bell,
  Star,
  ArrowRight,
  X,
  Play,
  Pause,
  Square,
  Eye,
} from "lucide-react";

const soundMap: Record<string, HTMLAudioElement> = {
  rain: new Audio("/rain.mp3"),
  ocean: new Audio("/waves.mp3"),
  forest: new Audio("/forest.mp3"),
  thunder: new Audio("/thunder.mp3"),
  wind: new Audio("/wind.mp3"),
  fire: new Audio("/fireplace.mp3"),
  "white-noise": new Audio("/white-noise.mp3"),
  "pink-noise": new Audio("/pink-noise.mp3"),
  "brown-noise": new Audio("/brown-noise.mp3"),
  space: new Audio("/space.mp3"),
  meditation: new Audio("/meditation.mp3"),
  delta: new Audio("/delta.mp3"),
  theta: new Audio("/theta.mp3"),
  birds: new Audio("/morning-birds.mp3"),
  chimes: new Audio("/wind-chimes.mp3"),
  piano: new Audio("/gentle-piano.mp3"),
  bells: new Audio("/temple-bell.mp3"),
  awakening: new Audio("/awakening-melody.mp3"),
};

// Color presets for sleep and wake-up
const sleepColors = [
  {
    name: "Deep Red",
    value: "#CC0000",
    description: "Preserves night vision and melatonin production",
  },
  {
    name: "Warm Amber",
    value: "#FF8000",
    description: "Blocks blue light while providing warm illumination",
  },
  {
    name: "Sunset Orange",
    value: "#FF4500",
    description: "Mimics natural sunset to trigger sleepiness",
  },
  {
    name: "Candlelight",
    value: "#FF9500",
    description: "Soft warm glow like candlelight",
  },
  {
    name: "Fire Red",
    value: "#B22222",
    description: "Deep red used by astronomers to preserve night vision",
  },
  {
    name: "Ember Glow",
    value: "#DC143C",
    description: "Warm red ember-like glow",
  },
  {
    name: "Soft Coral",
    value: "#FF6B6B",
    description: "Gentle coral for sensitive eyes",
  },
  {
    name: "Dim Orange",
    value: "#FF7F00",
    description: "Low-intensity orange for gradual wind-down",
  },
];

const wakeUpColors = [
  {
    name: "Sunrise Orange",
    value: "#FF6B35",
    description: "Natural sunrise simulation",
  },
  {
    name: "Warm Yellow",
    value: "#FFD700",
    description: "Gentle morning light",
  },
  { name: "Soft White", value: "#F5F5DC", description: "Daylight simulation" },
  { name: "Sky Blue", value: "#87CEEB", description: "Clear morning sky" },
  { name: "Energizing Blue", value: "#4169E1", description: "Alertness boost" },
];

// Sound options
const sleepSounds = [
  { id: "none", name: "No Sound", description: "Silent wind-down" },
  { id: "rain", name: "Gentle Rain", description: "Soft rainfall" },
  { id: "ocean", name: "Ocean Waves", description: "Rhythmic waves" },
  { id: "forest", name: "Forest Ambience", description: "Nature sounds" },
  { id: "fire", name: "Crackling Fire", description: "Fireplace sounds" },
  { id: "white-noise", name: "White Noise", description: "Pure white noise" },
  { id: "meditation", name: "Meditation Bell", description: "Singing bowls" },
  { id: "delta", name: "Delta Waves", description: "Deep sleep frequencies" },
];

const wakeUpSounds = [
  { id: "birds", name: "Morning Birds", description: "Gentle bird songs" },
  { id: "chimes", name: "Wind Chimes", description: "Soft chimes" },
  { id: "piano", name: "Gentle Piano", description: "Peaceful melodies" },
  { id: "bells", name: "Temple Bells", description: "Gradual bell sounds" },
  { id: "awakening", name: "Awakening Melody", description: "Soft orchestral" },
];

export default function Configurator() {
  // Alarm settings
  const [alarmTime, setAlarmTime] = useState("07:00");
  const [sleepColor, setSleepColor] = useState(sleepColors[0].value);
  const [sleepSound, setSleepSound] = useState("none");
  const [sleepVolume, setSleepVolume] = useState(50);
  const [wakeUpColor, setWakeUpColor] = useState(wakeUpColors[0].value);
  const [wakeUpSound, setWakeUpSound] = useState("birds");
  const [wakeUpVolume, setWakeUpVolume] = useState(70);
  const [fadeOutDuration, setFadeOutDuration] = useState(15);
  const [fullscreen, setFullscreen] = useState(true);
  const [wakeUpSoundPlaying, setWakeUpSoundPlaying] = useState(false);

  // Sleep mode state
  const [sleepModeActive, setSleepModeActive] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showStickyAd, setShowStickyAd] = useState(false);
  const [sleepModeModal, setSleepModeModal] = useState(false);

  // Lighting state
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showTimeLeft, setShowTimeLeft] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState<number | null>(null);
  const [brightness, setBrightness] = useState(1);

  // Audio refs
  const sleepAudioRef = useRef<HTMLAudioElement | null>(null);
  const wakeUpAudioRef = useRef<HTMLAudioElement | null>(null);

  // Show monetization after alarm is set
  useEffect(() => {
    if (alarmTime && (sleepColor || wakeUpColor)) {
      setShowSuggestions(true);
      setShowStickyAd(true);
    }
  }, [alarmTime, sleepColor, wakeUpColor]);

  const enterFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen();
    } else if ((el as any).msRequestFullscreen) {
      (el as any).msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.warn("Failed to exit fullscreen:", err);
      });
    }
  };

  // Fade effect for sleep mode
  useEffect(() => {
    let animationFrame: number;

    const fade = () => {
      if (!startTime || isPaused) return;
      const elapsed = (Date.now() - startTime) / 1000 / 60; // minutes
      const progress = Math.min(elapsed / fadeOutDuration, 1);
      setBrightness(1 - progress);
      setTimeLeft(Math.max(fadeOutDuration - elapsed, 0));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(fade);
      } else {
        // Fade complete - stop everything
        setTimeLeft(0);
        stopSleepSound();
        // Keep sleep mode active but screen goes black
      }
    };

    if (sleepModeActive && !isPaused) {
      if (!startTime) {
        setStartTime(Date.now());
      }
      animationFrame = requestAnimationFrame(fade);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [sleepModeActive, fadeOutDuration, startTime, isPaused]);

  // Sound management
  const playSleepSound = () => {
    if (sleepSound === "none") return;

    const audio = soundMap[sleepSound];
    if (!audio) return;

    audio.loop = true;
    audio.volume = sleepVolume / 100;
    sleepAudioRef.current = audio;
    audio.play().catch(console.error);
  };

  const stopSleepSound = () => {
    if (sleepAudioRef.current) {
      sleepAudioRef.current.pause();
      sleepAudioRef.current.currentTime = 0;
    }
  };

  const pauseSleepSound = () => {
    if (sleepAudioRef.current) {
      sleepAudioRef.current.pause();
    }
  };

  const resumeSleepSound = () => {
    if (sleepAudioRef.current && sleepSound !== "none") {
      sleepAudioRef.current.play().catch(console.error);
    }
  };

  const stopWakeUpSound = () => {
    if (wakeUpAudioRef.current) {
      wakeUpAudioRef.current.pause();
      wakeUpAudioRef.current.currentTime = 0;
    }

    setWakeUpSoundPlaying(false);
  };

  const handleWakeUpSoundChange = (newSound: string) => {
    stopWakeUpSound(); // stop any currently playing sound
    setWakeUpSound(newSound);
  };

  // Update sound volume
  useEffect(() => {
    if (sleepAudioRef.current) {
      sleepAudioRef.current.volume = sleepVolume / 100;
    }
  }, [sleepVolume]);

  // Handle pause/resume
  const togglePause = () => {
    if (isPaused) {
      // Resume - adjust start time to account for paused duration
      if (pausedTime && startTime) {
        const pauseDuration = Date.now() - pausedTime;
        setStartTime(startTime + pauseDuration);
      }
      setIsPaused(false);
      setPausedTime(null);
      resumeSleepSound();
    } else {
      // Pause
      setIsPaused(true);
      setPausedTime(Date.now());
      pauseSleepSound();
    }
  };

  const startSleepMode = () => {
    if (fullscreen) {
      enterFullscreen();
    }
    setSleepModeActive(true);
    setSleepModeModal(false);
    setStartTime(Date.now());
    setIsPaused(false);
    setPausedTime(null);
    setBrightness(1);
    playSleepSound();
  };

  const stopSleepMode = () => {
    if (fullscreen) {
      exitFullscreen();
    }
    setSleepModeActive(false);
    setSleepModeModal(false);
    setStartTime(null);
    setIsPaused(false);
    setPausedTime(null);
    setBrightness(1);
    stopSleepSound();
  };

  const openSleepModeModal = () => {
    setSleepModeModal(true);
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      stopSleepSound();
      stopWakeUpSound();
    };
  }, []);

  // Format time left
  const formatTimeLeft = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = Number.parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Add alarm status indicator
  const [alarmStatus, setAlarmStatus] = useState<
    "inactive" | "active" | "triggered"
  >("inactive");

  // New alarm checking with multiple safeguards
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let wakeLock: any = null;

    const checkAlarm = () => {
      if (alarmStatus === "triggered") return; // ⛔ Prevent retriggering

      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"
      if (currentTime === alarmTime) {
        triggerAlarm();
      }
    };

    const startAlarmChecker = async () => {
      // Request wake lock to prevent device from sleeping
      try {
        if ("wakeLock" in navigator) {
          wakeLock = await (navigator as any).wakeLock.request("screen");
          console.log("Wake lock acquired for alarm");
        }
      } catch (err) {
        console.warn("Wake lock failed:", err);
      }

      // Set up interval with error handling
      interval = setInterval(() => {
        try {
          checkAlarm();
        } catch (error) {
          console.error("Alarm check failed:", error);
          // Restart the interval if it fails
          clearInterval(interval);
          startAlarmChecker();
        }
      }, 1000);

      // Additional backup check every 30 seconds with more precise timing
      const backupInterval = setInterval(() => {
        try {
          if (alarmStatus === "triggered") return; // ⛔ Prevent retriggering

          const now = new Date();
          const [alarmHours, alarmMinutes] = alarmTime.split(":").map(Number);
          const alarmDate = new Date();
          alarmDate.setHours(alarmHours, alarmMinutes, 0, 0);

          // If alarm time has passed today, set for tomorrow
          if (alarmDate <= now) {
            alarmDate.setDate(alarmDate.getDate() + 1);
          }

          const timeDiff = alarmDate.getTime() - now.getTime();

          // Trigger if within 30 seconds of alarm time
          if (timeDiff <= 30000 && timeDiff >= 0) {
            triggerAlarm();
          }
        } catch (error) {
          console.error("Backup alarm check failed:", error);
        }
      }, 30000);

      return () => {
        clearInterval(interval);
        clearInterval(backupInterval);
        if (wakeLock) {
          wakeLock.release();
        }
      };
    };

    // Visibility change handler to restart timer when tab becomes active
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("Tab became active, checking alarm...");
        checkAlarm(); // Immediate check when tab becomes visible
      }
    };

    // Page focus handler
    const handleFocus = () => {
      console.log("Page focused, checking alarm...");
      checkAlarm();
    };

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    // Start the alarm checker
    const cleanup = startAlarmChecker();

    // Cleanup function
    return () => {
      cleanup.then((cleanupFn) => cleanupFn?.());
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [alarmTime, alarmStatus]); // Removed wakeUpSound and wakeUpVolume to prevent unnecessary restarts

  // Add a separate effect for wake-up sound changes that doesn't restart the alarm timer
  useEffect(() => {
    // This effect only handles wake-up sound/volume changes without affecting the alarm timer
  }, [wakeUpSound, wakeUpVolume]);

  // Update the triggerAlarm function to set status
  const triggerAlarm = () => {
    setAlarmStatus("triggered");

    // Exit fullscreen
    exitFullscreen();

    // Play alarm sound
    const audio = soundMap[wakeUpSound];
    if (audio) {
      audio.loop = true;
      audio.volume = wakeUpVolume / 100;
      wakeUpAudioRef.current = audio;
      audio
        .play()
        .then(() => setWakeUpSoundPlaying(true))
        .catch(console.error);
    }

    // Optional: stop sleep mode if still active
    stopSleepMode();

    // Show notification if permission granted
    if (Notification.permission === "granted") {
      new Notification("SleepWell Alarm", {
        body: `Wake up! It's ${formatTime(alarmTime)}`,
        icon: "/favicon.ico",
        requireInteraction: true,
      });
    }
  };

  // Add notification permission request
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Set alarm status when alarm time is set
  useEffect(() => {
    if (alarmTime) {
      setAlarmStatus("active");
    } else {
      setAlarmStatus("inactive");
    }
  }, [alarmTime]);

  return (
    <>
      {/* Main Settings */}
      <div className="lg:col-span-2 space-y-6">
        {/* Alarm Time */}
        <Card className="border-sleep-200">
          <CardHeader>
            <CardTitle className="font-display flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Alarm Time
            </CardTitle>
            <CardDescription>Set your wake-up time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <input
                type="time"
                value={alarmTime}
                onChange={(e) => setAlarmTime(e.target.value)}
                className="text-4xl font-display font-bold bg-transparent border-2 border-sleep-200 rounded-lg p-4 text-center focus:outline-none focus:border-sleep-400"
              />
            </div>
            <div className="text-center mt-4">
              <p className="text-lg text-muted-foreground">
                Wake up at {formatTime(alarmTime)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sleep Settings */}
        <Card className="border-sleep-200">
          <CardHeader>
            <CardTitle className="font-display flex items-center">
              <Moon className="h-5 w-5 mr-2" />
              Sleep Settings
            </CardTitle>
            <CardDescription>
              Configure your wind-down experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sleep Color */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sleep Lighting</label>
              <Select value={sleepColor} onValueChange={setSleepColor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sleep Colors</SelectLabel>
                    {sleepColors.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center">
                          <div
                            className="h-4 w-4 rounded-full mr-2 border"
                            style={{ backgroundColor: color.value }}
                          />
                          {color.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Sleep Sound */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sleep Sound</label>
              <Select value={sleepSound} onValueChange={setSleepSound}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sleep Sounds</SelectLabel>
                    {sleepSounds.map((sound) => (
                      <SelectItem key={sound.id} value={sound.id}>
                        <div className="flex items-center">
                          {sound.id === "none" ? (
                            <VolumeX className="h-4 w-4 mr-2" />
                          ) : (
                            <Music className="h-4 w-4 mr-2" />
                          )}
                          {sound.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Sleep Volume */}
            {sleepSound !== "none" && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Sleep Volume</label>
                  <span className="text-sm text-muted-foreground">
                    {sleepVolume}%
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <VolumeX className="h-4 w-4" />
                  <Slider
                    value={[sleepVolume]}
                    onValueChange={(value) => setSleepVolume(value[0])}
                    max={100}
                    className="flex-1"
                  />
                  <Volume2 className="h-4 w-4" />
                </div>
              </div>
            )}

            {/* Fade Out Duration */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Fade-out Duration</label>
                <span className="text-sm text-muted-foreground">
                  {fadeOutDuration} min
                </span>
              </div>
              <Slider
                value={[fadeOutDuration]}
                onValueChange={(value) => setFadeOutDuration(value[0])}
                min={1}
                max={60}
                className="py-2"
              />
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Preview</label>
              <div
                className="w-full h-20 rounded-lg flex items-center justify-center border"
                style={{
                  backgroundColor: sleepColor,
                  filter: `brightness(${sleepModeActive ? brightness : 1})`,
                }}
              >
                <span className="text-sm font-medium text-white">
                  {sleepSound === "none"
                    ? "Silent room lighting"
                    : `${
                        sleepSounds.find((s) => s.id === sleepSound)?.name
                      } + lighting`}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wake-up Settings */}
        <Card className="border-dream-200">
          <CardHeader>
            <CardTitle className="font-display flex items-center">
              <Sun className="h-5 w-5 mr-2" />
              Wake-up Settings
            </CardTitle>
            <CardDescription>Configure your morning experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Wake-up Sound */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Wake-up Sound</label>
              <Select
                value={wakeUpSound}
                onValueChange={handleWakeUpSoundChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Wake-up Sounds</SelectLabel>
                    {wakeUpSounds.map((sound) => (
                      <SelectItem key={sound.id} value={sound.id}>
                        <div className="flex items-center">
                          <Music className="h-4 w-4 mr-2" />
                          {sound.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Wake-up Volume */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Wake-up Volume</label>
                <span className="text-sm text-muted-foreground">
                  {wakeUpVolume}%
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <VolumeX className="h-4 w-4" />
                <Slider
                  value={[wakeUpVolume]}
                  onValueChange={(value) => setWakeUpVolume(value[0])}
                  max={100}
                  className="flex-1"
                />
                <Volume2 className="h-4 w-4" />
              </div>
            </div>

            {wakeUpSoundPlaying && (
              <Button
                variant="outline"
                onClick={stopWakeUpSound}
                className="w-full mt-2"
              >
                <Square className="mr-2 h-4 w-4" />
                Stop Wake-up Sound
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Start Sleep Mode Button */}
        <Card className="border-dream-200 bg-gradient-to-r from-dream-50 to-sleep-50 dark:bg-none">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-display font-bold">
                Ready for Sleep?
              </h3>
              <p className="text-muted-foreground">
                Start your wind-down routine with {formatTime(alarmTime)}{" "}
                wake-up time
              </p>
              {!sleepModeActive ? (
                <Button
                  onClick={openSleepModeModal}
                  size="lg"
                  className="w-full h-12 text-lg"
                >
                  <Moon className="mr-2 h-5 w-5" />
                  Start Sleep Mode
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={togglePause}
                    variant="outline"
                    className="flex-1 h-12"
                  >
                    {isPaused ? (
                      <Play className="mr-2 h-4 w-4" />
                    ) : (
                      <Pause className="mr-2 h-4 w-4" />
                    )}
                    {isPaused ? "Resume" : "Pause"}
                  </Button>
                  <Button
                    onClick={stopSleepMode}
                    variant="outline"
                    className="flex-1 h-12"
                  >
                    <Square className="mr-2 h-4 w-4" />
                    Stop Sleep Mode
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Suggestions Panel - Show after alarm is set */}
        {showSuggestions && (
          <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:bg-zinc-900 dark:border-zinc-700 dark:bg-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-display text-amber-900 dark:text-zinc-100">
                    Suggestions for Better Sleep
                  </CardTitle>
                  <CardDescription className="text-amber-700 dark:text-zinc-400">
                    Recommended products to enhance your sleep experience
                  </CardDescription>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  Sponsored
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-zinc-800 rounded-lg">
                  <div className="h-12 w-12 bg-amber-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                    <Sun className="h-6 w-6 text-amber-600 dark:text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-amber-900 dark:text-zinc-100">
                      Philips Wake-Up Light
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-zinc-400">
                      Sunrise simulation alarm clock
                    </p>
                    <p className="text-xs text-amber-600 dark:text-zinc-500">
                      $129.99 - 30% off
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-zinc-800 rounded-lg">
                  <div className="h-12 w-12 bg-amber-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-amber-600 dark:text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-amber-900 dark:text-zinc-100">
                      Oura Ring Gen3
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-zinc-400">
                      Sleep & recovery tracking
                    </p>
                    <p className="text-xs text-amber-600 dark:text-zinc-500">
                      $299 - Free sizing kit
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full bg-white/50 text-amber-800 border-amber-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-600"
              >
                View All Recommendations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sleep Mode Modal */}
      <Dialog open={sleepModeModal} onOpenChange={setSleepModeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Sleep Mode Ready</DialogTitle>
            <DialogDescription>
              Your wind-down routine is about to start
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-display font-bold">
                Wake up at {formatTime(alarmTime)}
              </div>
              <div className="text-sm text-muted-foreground">
                Sleep lighting and sounds will fade out over {fadeOutDuration}{" "}
                minutes
              </div>
              {fullscreen && (
                <div className="text-xs text-muted-foreground bg-sleep-50 p-2 rounded">
                  💡 Fullscreen mode will activate for immersive lighting
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setSleepModeModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={startSleepMode} className="flex-1">
                <Moon className="mr-2 h-4 w-4" />
                Start Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full-screen sleep lighting overlay */}
      {sleepModeActive && (
        <div
          className="fixed inset-0 z-[9999] transition-opacity duration-1000 ease-out"
          style={{
            backgroundColor: sleepColor,
            filter: `brightness(${brightness})`,
          }}
        >
          {/* Minimal control buttons - only show on hover */}
          <div className="absolute top-6 right-6 flex gap-2 opacity-20 hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={() => setShowTimeLeft(!showTimeLeft)}
              size="sm"
              className="bg-black/20 hover:bg-black/40 text-white border-white/30"
              variant="outline"
            >
              <Eye className="h-4 w-4" />
            </Button>

            <Button
              onClick={togglePause}
              size="sm"
              className="bg-black/20 hover:bg-black/40 text-white border-white/30"
              variant="outline"
            >
              {isPaused ? (
                <Play className="h-4 w-4" />
              ) : (
                <Pause className="h-4 w-4" />
              )}
            </Button>

            <Button
              onClick={stopSleepMode}
              size="sm"
              className="bg-black/20 hover:bg-black/40 text-white border-white/30"
              variant="outline"
            >
              <Square className="h-4 w-4" />
            </Button>
          </div>

          {/* Time display - minimal and unobtrusive */}
          {showTimeLeft && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-6xl font-light text-white/80 mb-2">
                {formatTimeLeft(timeLeft)}
              </div>
              {isPaused && <div className="text-lg text-white/60">Paused</div>}
              <div className="text-sm text-white/60 mt-2">
                Wake up at {formatTime(alarmTime)}
              </div>
              {sleepSound !== "none" && (
                <div className="text-sm text-white/60 mt-1">
                  🎵 {sleepSounds.find((s) => s.id === sleepSound)?.name}
                </div>
              )}
            </div>
          )}

          {/* Breathing indicator - subtle pulsing dot */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Sticky Footer Ad */}
      {showStickyAd && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:bg-zinc-900 dark:border-zinc-700 dark:bg-none p-3">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-amber-200 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <div className="font-medium text-amber-900">
                  Sponsored by Hatch Restore 2
                </div>
                <div className="text-sm text-amber-700">
                  The ultimate sunrise alarm clock
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                Learn More
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowStickyAd(false)}
                className="text-amber-700 hover:bg-amber-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
