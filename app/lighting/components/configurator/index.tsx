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
  Play,
  Pause,
  Square,
  Eye,
  Volume2,
  VolumeX,
  Music,
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
};

// Define color presets with names and hex values
const colorPresets = [
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

// Sound options for the lighting experience
const soundOptions = [
  { id: "none", name: "No Sound", description: "Silent wind-down" },
  { id: "rain", name: "Gentle Rain", description: "Soft rainfall on leaves" },
  { id: "ocean", name: "Ocean Waves", description: "Rhythmic ocean waves" },
  {
    id: "forest",
    name: "Forest Ambience",
    description: "Birds and rustling leaves",
  },
  { id: "thunder", name: "Thunderstorm", description: "Distant thunder" },
  { id: "wind", name: "Gentle Wind", description: "Soft wind through trees" },
  { id: "fire", name: "Crackling Fire", description: "Cozy fireplace sounds" },
  { id: "white-noise", name: "White Noise", description: "Pure white noise" },
  {
    id: "pink-noise",
    name: "Pink Noise",
    description: "Softer than white noise",
  },
  { id: "space", name: "Space Ambience", description: "Cosmic background hum" },
  {
    id: "brown-noise",
    name: "Brown Noise",
    description: "Deep, soothing sound",
  },
  {
    id: "meditation",
    name: "Meditation Bell",
    description: "Tibetan singing bowls",
  },
  { id: "delta", name: "Delta Waves", description: "0.5-4 Hz for deep sleep" },
  { id: "theta", name: "Theta Waves", description: "4-8 Hz for relaxation" },
];

export default function LightingPage() {
  const [color, setColor] = useState(colorPresets[0].value);
  const [duration, setDuration] = useState(15); // in minutes
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [showTimeLeft, setShowTimeLeft] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState<number | null>(null);
  const [brightness, setBrightness] = useState(1);

  // Sound controls
  const [selectedSound, setSelectedSound] = useState("none");
  const [soundVolume, setSoundVolume] = useState(50);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Get text color based on background for contrast
  const getTextColor = (bgColor: string): string => {
    const r = Number.parseInt(bgColor.slice(1, 3), 16);
    const g = Number.parseInt(bgColor.slice(3, 5), 16);
    const b = Number.parseInt(bgColor.slice(5, 7), 16);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 186 ? "#111" : "#fff";
  };

  // Fade effect
  useEffect(() => {
    let animationFrame: number;

    const fade = () => {
      if (!startTime || isPaused) return;
      const elapsed = (Date.now() - startTime) / 1000 / 60; // minutes
      const progress = Math.min(elapsed / duration, 1);
      setBrightness(1 - progress);

      setTimeLeft(Math.max(duration - elapsed, 0));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(fade);
      } else {
        // setIsActive(false);
        setTimeLeft(0);
        stopSound();
        // setOpacity(0);
      }
    };

    if (isActive && !isPaused) {
      if (!startTime) {
        setStartTime(Date.now());
      }
      animationFrame = requestAnimationFrame(fade);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isActive, duration, startTime, isPaused]);

  // Sound management
  const playSound = () => {
    if (selectedSound === "none") return;

    const audio = soundMap[selectedSound];
    if (!audio) return;

    audio.loop = true;
    audio.volume = soundVolume / 100;
    audioRef.current = audio;
    audio.play().catch(console.error);
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const pauseSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const resumeSound = () => {
    if (audioRef.current && selectedSound !== "none") {
      audioRef.current.play().catch(console.error);
    }
  };

  // Update sound volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = soundVolume / 100;
    }
  }, [soundVolume]);

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
      resumeSound();
    } else {
      // Pause
      setIsPaused(true);
      setPausedTime(Date.now());
      pauseSound();
    }
  };

  // Start wind down
  const startWindDown = () => {
    enterFullscreen();
    setIsActive(true);
    setStartTime(Date.now());
    setIsPaused(false);
    setPausedTime(null);
    playSound();
  };

  // Stop wind down
  const stopWindDown = () => {
    exitFullscreen();
    setIsActive(false);
    setStartTime(null);
    setIsPaused(false);
    setPausedTime(null);
    stopSound();
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  // Format time left
  const formatTimeLeft = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const selectedSoundInfo = soundOptions.find(
    (sound) => sound.id === selectedSound
  );

  return (
    <>
      <Card className="border-sleep-200">
        <CardHeader>
          <CardTitle className="font-display">Choose Your Settings</CardTitle>
          <CardDescription>
            Select a color and set your fade-out timer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Soothing Color</label>
            <Select
              value={color}
              onValueChange={(value) => {
                setColor(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Preset Colors</SelectLabel>
                  {colorPresets.map((preset) => (
                    <SelectItem key={preset.value} value={preset.value}>
                      <div className="flex items-center">
                        <div
                          className="h-4 w-4 rounded-full mr-2 border"
                          style={{ backgroundColor: preset.value }}
                        ></div>
                        {preset.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {
                colorPresets.find((preset) => preset.value === color)
                  ?.description
              }
            </p>
          </div>

          {/* Sound Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Relaxing Sound</label>
            <Select
              value={selectedSound}
              onValueChange={(value) => setSelectedSound(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a sound" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sound Options</SelectLabel>
                  {soundOptions.map((sound) => (
                    <SelectItem key={sound.id} value={sound.id}>
                      <div className="flex items-center">
                        {sound.id === "none" ? (
                          <VolumeX className="h-4 w-4 mr-2 text-muted-foreground" />
                        ) : (
                          <Music className="h-4 w-4 mr-2 text-primary" />
                        )}
                        {sound.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {selectedSoundInfo?.description}
            </p>
          </div>

          {/* Sound Volume */}
          {selectedSound !== "none" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Sound Volume</label>
                <span className="text-sm text-muted-foreground">
                  {soundVolume}%
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <VolumeX className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[soundVolume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setSoundVolume(value[0])}
                  className="flex-1"
                />
                <Volume2 className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          )}

          {/* Duration Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Fade Duration</label>
              <span className="text-sm text-muted-foreground">
                {duration} minutes
              </span>
            </div>
            <Slider
              value={[duration]}
              min={1}
              max={60}
              step={1}
              onValueChange={(value) => setDuration(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 min</span>
              <span>15 min</span>
              <span>30 min</span>
              <span>60 min</span>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Preview</label>
            <div
              className="w-full h-20 rounded-lg flex items-center justify-center border"
              style={{
                backgroundColor: color,
                filter: `brightness(${isActive ? brightness : 1})`,
              }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: getTextColor(color) }}
              >
                Room lighting preview
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {!isActive ? (
              <Button onClick={startWindDown} className="w-full h-12 text-lg">
                <Play className="mr-2 h-5 w-5" />
                Start Wind Down
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
                  onClick={stopWindDown}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  <Square className="mr-2 h-4 w-4" />
                  Stop
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Full-screen overlay */}
      {isActive && (
        <div
          className="fixed inset-0 z-[9999] transition-opacity duration-1000 ease-out"
          style={{
            backgroundColor: color,
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
              onClick={stopWindDown}
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
            </div>
          )}

          {/* Breathing indicator - subtle pulsing dot */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </>
  );
}
