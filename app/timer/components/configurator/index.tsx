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
import { Switch } from "@/components/ui/switch";
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Music,
  Target,
  Clock,
  Coffee,
  Brain,
  Zap,
  CheckCircle,
  Eye,
} from "lucide-react";

let soundMap: Record<string, HTMLAudioElement> = {};

if (typeof window !== "undefined") {
  soundMap = {
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
}

// Focus color themes
const focusThemes = [
  {
    name: "Deep Focus",
    value: "#1e3a8a",
    description: "Deep blue for concentration",
  },
  {
    name: "Forest Green",
    value: "#166534",
    description: "Calming green for sustained focus",
  },
  {
    name: "Warm Orange",
    value: "#ea580c",
    description: "Energizing orange for creativity",
  },
  {
    name: "Purple Flow",
    value: "#7c3aed",
    description: "Purple for deep work sessions",
  },
  {
    name: "Charcoal",
    value: "#374151",
    description: "Neutral gray for minimal distraction",
  },
  {
    name: "Sunset Red",
    value: "#dc2626",
    description: "Warm red for intense focus",
  },
];

// Focus sounds
const focusSounds = [
  { id: "none", name: "None" },
  { id: "rain", name: "Rain" },
  { id: "ocean", name: "Ocean Waves" },
  { id: "forest", name: "Forest Sounds" },
  { id: "thunder", name: "Thunderstorm" },
  { id: "wind", name: "Wind" },
  { id: "fire", name: "Fireplace" },
  { id: "white-noise", name: "White Noise" },
  { id: "pink-noise", name: "Pink Noise" },
  { id: "brown-noise", name: "Brown Noise" },
  { id: "space", name: "Space Ambience" },
  { id: "meditation", name: "Meditation Music" },
  { id: "delta", name: "Delta Waves" },
  { id: "theta", name: "Theta Waves" },
  { id: "birds", name: "Morning Birds" },
  { id: "chimes", name: "Wind Chimes" },
  { id: "piano", name: "Gentle Piano" },
  { id: "bells", name: "Temple Bells" },
  { id: "awakening", name: "Gentle Awakening Melody" },
];

type SessionType = "work" | "shortBreak" | "longBreak";

interface PomodoroSettings {
  workDuration: number; // minutes
  shortBreakDuration: number; // minutes
  longBreakDuration: number; // minutes
  sessionsUntilLongBreak: number;
}

export default function FocusTimerPage() {
  // Timer settings
  const [settings, setSettings] = useState<PomodoroSettings>({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsUntilLongBreak: 4,
  });

  // Focus customization
  const [focusTheme, setFocusTheme] = useState(focusThemes[0].value);
  const [focusSound, setFocusSound] = useState("none");
  const [soundVolume, setSoundVolume] = useState(50);
  const [fullscreenMode, setFullscreenMode] = useState(true);
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);
  const [autoStartWork, setAutoStartWork] = useState(false);

  // Timer state
  const [currentSession, setCurrentSession] = useState<SessionType>("work");
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0); // minutes
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get current session duration
  const getCurrentDuration = () => {
    switch (currentSession) {
      case "work":
        return settings.workDuration * 60;
      case "shortBreak":
        return settings.shortBreakDuration * 60;
      case "longBreak":
        return settings.longBreakDuration * 60;
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Session completed
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  // Handle session completion
  const handleSessionComplete = () => {
    setIsRunning(false);
    setIsPaused(false);

    // Play completion sound
    playNotificationSound();

    // Show notification
    if (Notification.permission === "granted") {
      const sessionName = currentSession === "work" ? "Focus Session" : "Break";
      new Notification(`${sessionName} Complete!`, {
        body: getNextSessionMessage(),
        icon: "/favicon.ico",
      });
    }

    // Update stats
    if (currentSession === "work") {
      setCompletedSessions((prev) => prev + 1);
      setTotalFocusTime((prev) => prev + settings.workDuration);
    }

    // Auto-transition to next session
    const nextSession = getNextSession();
    setCurrentSession(nextSession);
    setTimeLeft(getNextSessionDuration());

    // Auto-start if enabled
    if (
      (nextSession !== "work" && autoStartBreaks) ||
      (nextSession === "work" && autoStartWork)
    ) {
      setTimeout(() => {
        setIsRunning(true);
        playFocusSound();
      }, 2000); // 2 second delay
    }
  };

  // Get next session type
  const getNextSession = (): SessionType => {
    if (currentSession === "work") {
      // Check if it's time for long break
      const isLongBreakTime =
        (completedSessions + 1) % settings.sessionsUntilLongBreak === 0;
      return isLongBreakTime ? "longBreak" : "shortBreak";
    }
    return "work";
  };

  // Get next session duration
  const getNextSessionDuration = () => {
    const nextSession = getNextSession();
    switch (nextSession) {
      case "work":
        return settings.workDuration * 60;
      case "shortBreak":
        return settings.shortBreakDuration * 60;
      case "longBreak":
        return settings.longBreakDuration * 60;
    }
  };

  // Get next session message
  const getNextSessionMessage = () => {
    const nextSession = getNextSession();
    switch (nextSession) {
      case "work":
        return "Time to get back to work!";
      case "shortBreak":
        return "Take a short break!";
      case "longBreak":
        return "Enjoy your long break!";
    }
  };

  // Sound management
  const playFocusSound = () => {
    if (focusSound === "none") return;

    const audio = soundMap[focusSound];
    if (!audio) return;

    audio.loop = true;
    audio.volume = soundVolume / 100;
    audioRef.current = audio;
    audio.play().catch(console.error);
  };

  const stopFocusSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const playNotificationSound = () => {
    // Play a simple notification beep
    const context = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.5);
  };

  // Update sound volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = soundVolume / 100;
    }
  }, [soundVolume]);

  // Fullscreen management
  const enterFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen();
    } else if ((el as any).msRequestFullscreen) {
      (el as any).msRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.error);
    }
    setIsFullscreen(false);
  };

  // Timer controls
  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    if (currentSession === "work" && focusSound !== "none") {
      playFocusSound();
    }
    if (fullscreenMode && currentSession === "work") {
      enterFullscreen();
    }
  };

  const pauseTimer = () => {
    setIsPaused(true);
    stopFocusSound();
  };

  const resumeTimer = () => {
    setIsPaused(false);
    if (currentSession === "work" && focusSound !== "none") {
      playFocusSound();
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(getCurrentDuration());
    stopFocusSound();
    if (isFullscreen) {
      exitFullscreen();
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(getCurrentDuration());
    stopFocusSound();
    if (isFullscreen) {
      exitFullscreen();
    }
  };

  const skipSession = () => {
    handleSessionComplete();
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate progress percentage
  const getProgress = () => {
    const totalDuration = getCurrentDuration();
    return ((totalDuration - timeLeft) / totalDuration) * 100;
  };

  // Get session info
  const getSessionInfo = () => {
    switch (currentSession) {
      case "work":
        return {
          title: "Focus Session",
          icon: Brain,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        };
      case "shortBreak":
        return {
          title: "Short Break",
          icon: Coffee,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        };
      case "longBreak":
        return {
          title: "Long Break",
          icon: Zap,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
        };
    }
  };

  const sessionInfo = getSessionInfo();

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Update timer when settings change
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(getCurrentDuration());
    }
  }, [settings, currentSession]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopFocusSound();
    };
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Timer Display */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Session */}
          <Card
            className={`border-dream-200 bg-gradient-to-r from-dream-50 to-sleep-50 dark:bg-none`}
          >
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-3">
                  <sessionInfo.icon
                    className={`h-8 w-8 ${sessionInfo.color}`}
                  />
                  <h2
                    className={`text-2xl font-display font-bold ${sessionInfo.color}`}
                  >
                    {sessionInfo.title}
                  </h2>
                </div>

                {/* Circular Progress Timer */}
                <div className="relative w-64 h-64 mx-auto">
                  <svg
                    className="w-64 h-64 transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-gray-200"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 45 * (1 - getProgress() / 100)
                      }`}
                      className={sessionInfo.color}
                      style={{
                        transition: "stroke-dashoffset 1s ease-in-out",
                      }}
                    />
                  </svg>
                  {/* Time display */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-display font-bold text-foreground">
                        {formatTime(timeLeft)}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {Math.round(getProgress())}% complete
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex justify-center space-x-4">
                  {!isRunning ? (
                    <Button onClick={startTimer} size="lg" className="px-8">
                      <Play className="mr-2 h-5 w-5" />
                      Start
                    </Button>
                  ) : isPaused ? (
                    <Button onClick={resumeTimer} size="lg" className="px-8">
                      <Play className="mr-2 h-5 w-5" />
                      Resume
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseTimer}
                      variant="outline"
                      size="lg"
                      className="px-8"
                    >
                      <Pause className="mr-2 h-5 w-5" />
                      Pause
                    </Button>
                  )}

                  <Button onClick={stopTimer} variant="outline" size="lg">
                    <Square className="mr-2 h-4 w-4" />
                    Stop
                  </Button>
                </div>

                {/* Session Controls */}
                <div className="flex justify-center space-x-2">
                  <Button
                    onClick={() => {
                      setCurrentSession("work");
                      resetTimer();
                    }}
                    variant={currentSession === "work" ? "default" : "outline"}
                    size="sm"
                  >
                    Work
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentSession("shortBreak");
                      resetTimer();
                    }}
                    variant={
                      currentSession === "shortBreak" ? "default" : "outline"
                    }
                    size="sm"
                  >
                    Short Break
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentSession("longBreak");
                      resetTimer();
                    }}
                    variant={
                      currentSession === "longBreak" ? "default" : "outline"
                    }
                    size="sm"
                  >
                    Long Break
                  </Button>
                  {isRunning && (
                    <Button onClick={skipSession} variant="outline" size="sm">
                      Skip
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Stats */}
          <Card className="border-dream-200">
            <CardHeader>
              <CardTitle className="font-display flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Session Stats
              </CardTitle>
              <CardDescription>Your productivity today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-display font-bold text-primary">
                    {completedSessions}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Completed Sessions
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-primary">
                    {totalFocusTime}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Focus Minutes
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-primary">
                    {Math.floor(
                      completedSessions / settings.sessionsUntilLongBreak
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Cycles Complete
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pomodoro Settings */}
          <Card className="border-sleep-200">
            <CardHeader>
              <CardTitle className="font-display flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Timer Settings
              </CardTitle>
              <CardDescription>
                Customize your Pomodoro intervals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Work Duration</label>
                    <span className="text-sm text-muted-foreground">
                      {settings.workDuration} min
                    </span>
                  </div>
                  <Slider
                    value={[settings.workDuration]}
                    onValueChange={(value) =>
                      setSettings((prev) => ({
                        ...prev,
                        workDuration: value[0],
                      }))
                    }
                    min={5}
                    max={60}
                    step={5}
                    className="py-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Short Break</label>
                    <span className="text-sm text-muted-foreground">
                      {settings.shortBreakDuration} min
                    </span>
                  </div>
                  <Slider
                    value={[settings.shortBreakDuration]}
                    onValueChange={(value) =>
                      setSettings((prev) => ({
                        ...prev,
                        shortBreakDuration: value[0],
                      }))
                    }
                    min={1}
                    max={15}
                    step={1}
                    className="py-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Long Break</label>
                    <span className="text-sm text-muted-foreground">
                      {settings.longBreakDuration} min
                    </span>
                  </div>
                  <Slider
                    value={[settings.longBreakDuration]}
                    onValueChange={(value) =>
                      setSettings((prev) => ({
                        ...prev,
                        longBreakDuration: value[0],
                      }))
                    }
                    min={10}
                    max={45}
                    step={5}
                    className="py-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">
                      Sessions Until Long Break
                    </label>
                    <span className="text-sm text-muted-foreground">
                      {settings.sessionsUntilLongBreak}
                    </span>
                  </div>
                  <Slider
                    value={[settings.sessionsUntilLongBreak]}
                    onValueChange={(value) =>
                      setSettings((prev) => ({
                        ...prev,
                        sessionsUntilLongBreak: value[0],
                      }))
                    }
                    min={2}
                    max={8}
                    step={1}
                    className="py-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Focus Customization */}
          <Card className="border-dream-200">
            <CardHeader>
              <CardTitle className="font-display">Focus Environment</CardTitle>
              <CardDescription>Customize your focus experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Focus Theme */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Focus Theme</label>
                <Select value={focusTheme} onValueChange={setFocusTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color Themes</SelectLabel>
                      {focusThemes.map((theme) => (
                        <SelectItem key={theme.value} value={theme.value}>
                          <div className="flex items-center">
                            <div
                              className="h-4 w-4 rounded-full mr-2 border"
                              style={{ backgroundColor: theme.value }}
                            />
                            {theme.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {
                    focusThemes.find((theme) => theme.value === focusTheme)
                      ?.description
                  }
                </p>
              </div>

              {/* Focus Sound */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Focus Sound</label>
                <Select value={focusSound} onValueChange={setFocusSound}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Background Sounds</SelectLabel>
                      {focusSounds.map((sound) => (
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

              {/* Sound Volume */}
              {focusSound !== "none" && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Sound Volume</label>
                    <span className="text-sm text-muted-foreground">
                      {soundVolume}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <VolumeX className="h-4 w-4" />
                    <Slider
                      value={[soundVolume]}
                      onValueChange={(value) => setSoundVolume(value[0])}
                      max={100}
                      className="flex-1"
                    />
                    <Volume2 className="h-4 w-4" />
                  </div>
                </div>
              )}

              {/* Preview */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Preview</label>
                <div
                  className="w-full h-20 rounded-lg flex items-center justify-center border"
                  style={{ backgroundColor: focusTheme }}
                >
                  <span className="text-sm font-medium text-white">
                    {focusSound === "none"
                      ? "Silent focus mode"
                      : `${
                          focusSounds.find((s) => s.id === focusSound)?.name
                        } + theme`}
                  </span>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">
                      Fullscreen Mode
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Immersive focus during work sessions
                    </p>
                  </div>
                  <Switch
                    checked={fullscreenMode}
                    onCheckedChange={setFullscreenMode}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-dream-200 sticky top-24">
            <CardHeader>
              <CardTitle className="font-display">
                The Pomodoro Technique
              </CardTitle>
              <CardDescription>
                Proven method for enhanced focus
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                    <Target className="h-5 w-5 text-dream-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Focused Work</h3>
                    <p className="text-sm text-muted-foreground">
                      25-minute focused work sessions help maintain
                      concentration and avoid burnout.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                    <Coffee className="h-5 w-5 text-dream-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Regular Breaks</h3>
                    <p className="text-sm text-muted-foreground">
                      Short breaks prevent mental fatigue and help maintain
                      productivity throughout the day.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                    <Brain className="h-5 w-5 text-dream-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Mental Clarity</h3>
                    <p className="text-sm text-muted-foreground">
                      Structured time blocks improve decision-making and reduce
                      procrastination.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-dream-100 rounded-lg flex items-center justify-center shrink-0">
                    <Zap className="h-5 w-5 text-dream-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Sustained Energy</h3>
                    <p className="text-sm text-muted-foreground">
                      Long breaks after every 4 sessions help restore energy and
                      maintain peak performance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fullscreen Focus Mode */}
      {isFullscreen && isRunning && currentSession === "work" && (
        <div
          className="fixed inset-0 z-[9999] transition-all duration-1000 ease-out"
          style={{ backgroundColor: focusTheme }}
        >
          {/* Minimal controls */}
          <div className="absolute top-6 right-6 flex gap-2 opacity-20 hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={() => setShowStats(!showStats)}
              size="sm"
              className="bg-black/20 hover:bg-black/40 text-white border-white/30"
              variant="outline"
            >
              <Eye className="h-4 w-4" />
            </Button>

            <Button
              onClick={pauseTimer}
              size="sm"
              className="bg-black/20 hover:bg-black/40 text-white border-white/30"
              variant="outline"
            >
              <Pause className="h-4 w-4" />
            </Button>

            <Button
              onClick={exitFullscreen}
              size="sm"
              className="bg-black/20 hover:bg-black/40 text-white border-white/30"
              variant="outline"
            >
              <Square className="h-4 w-4" />
            </Button>
          </div>

          {/* Center content */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-8xl font-light text-white/90 mb-4">
              {formatTime(timeLeft)}
            </div>
            <div className="text-2xl text-white/70 mb-2">Focus Session</div>
            {showStats && (
              <div className="text-lg text-white/60">
                Session {completedSessions + 1} • {Math.round(getProgress())}%
                Complete
              </div>
            )}
            {focusSound !== "none" && (
              <div className="text-sm text-white/50 mt-4">
                🎵 {focusSounds.find((s) => s.id === focusSound)?.name}
              </div>
            )}
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white/60 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
