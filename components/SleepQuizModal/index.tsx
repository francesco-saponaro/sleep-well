"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  Brain,
  Heart,
  Zap,
  Moon,
  Star,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Target,
  Sun,
} from "lucide-react";

interface QuizAnswers {
  sleepHours: number;
  bedtime: string;
  fallAsleepTime: number;
  nightWakeups: number;
  feelRested: string;
  sleepSchedule: string;
  roomDarkness: string;
  roomTemperature: string;
  roomQuietness: string;
  mattressComfort: string;
  caffeineTime: string;
  screenTime: string;
  exercise: string;
  mealTiming: string;
  stressLevel: number;
  mainConcern: string;
}

interface SleepQuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SleepQuizModal({
  open,
  onOpenChange,
}: SleepQuizModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 6;

  const calculateSleepScore = (answers: Partial<QuizAnswers>): number => {
    let score = 0;

    // Sleep Duration (25 points)
    const hours = answers.sleepHours || 0;
    if (hours >= 7 && hours <= 9) score += 25;
    else if ((hours >= 6 && hours < 7) || (hours > 9 && hours <= 10))
      score += 20;
    else if ((hours >= 5 && hours < 6) || (hours > 10 && hours <= 11))
      score += 15;
    else score += 5;

    // Sleep Quality (25 points)
    if ((answers.fallAsleepTime || 0) <= 15) score += 8;
    if ((answers.nightWakeups || 0) <= 1) score += 8;
    if (answers.feelRested === "yes") score += 9;

    // Sleep Consistency (20 points)
    if (answers.sleepSchedule === "very-consistent") score += 20;
    else if (answers.sleepSchedule === "somewhat-consistent") score += 15;
    else if (answers.sleepSchedule === "inconsistent") score += 5;

    // Sleep Environment (15 points)
    if (answers.roomDarkness === "very-dark") score += 4;
    else if (answers.roomDarkness === "somewhat-dark") score += 2;

    if (answers.roomTemperature === "cool") score += 4;
    else if (answers.roomTemperature === "comfortable") score += 2;

    if (answers.roomQuietness === "very-quiet") score += 4;
    else if (answers.roomQuietness === "somewhat-quiet") score += 2;

    if (answers.mattressComfort === "very-comfortable") score += 3;
    else if (answers.mattressComfort === "comfortable") score += 2;

    // Sleep Hygiene (15 points)
    if (
      answers.caffeineTime === "none" ||
      answers.caffeineTime === "morning-only"
    )
      score += 4;
    else if (answers.caffeineTime === "afternoon") score += 2;

    if (answers.screenTime === "none" || answers.screenTime === "1-hour-before")
      score += 4;
    else if (answers.screenTime === "30-min-before") score += 2;

    if (
      answers.exercise === "regular-morning" ||
      answers.exercise === "regular-afternoon"
    )
      score += 4;
    else if (answers.exercise === "irregular") score += 2;

    if (
      answers.mealTiming === "3-hours-before" ||
      answers.mealTiming === "light-snack"
    )
      score += 3;
    else if (answers.mealTiming === "2-hours-before") score += 1;

    return Math.min(score, 100);
  };

  const getRecommendations = (answers: Partial<QuizAnswers>, score: number) => {
    const recommendations = [];

    // Based on main concerns and low scores
    if (
      answers.mainConcern === "falling-asleep" ||
      (answers.fallAsleepTime || 0) > 30
    ) {
      recommendations.push({
        tool: "Soothing Sounds",
        icon: Heart,
        reason:
          " Curated sleep sounds and nature ambience to help you drift offand stay asleep.",
        priority: "high",
      });
    }

    if (
      answers.mainConcern === "staying-asleep" ||
      (answers.nightWakeups || 0) > 2
    ) {
      recommendations.push({
        tool: "Smart Alarm Clock",
        icon: Moon,
        reason:
          "Fall asleep with light and sound, and wake gently with sunrise alarms synced to your rhythm.",
        priority: "high",
      });
    }

    if (answers.mainConcern === "waking-up" || answers.feelRested === "no") {
      recommendations.push({
        tool: "Ambient Lighting",
        icon: Sun,
        reason:
          "Fill your space with calming colors designed to help you relax and fall asleep naturally.",
        priority: "medium",
      });
    }

    if (answers.sleepSchedule === "inconsistent" || score < 75) {
      recommendations.push({
        tool: "Circadian Clock",
        icon: Clock,
        reason:
          "Align your sleep schedule with your internal body clock for better rest and energy.",
        priority: "medium",
      });
    }

    // if (score < 75) {
    //   recommendations.push({
    //     tool: "Circadian Clock",
    //     icon: Clock,
    //     reason:
    //       "Align your sleep schedule with your internal body clock for better rest and energy.",
    //     priority: "medium",
    //   });
    // }

    // Ensure we always have at least 2-3 recommendations
    // if (recommendations.length < 2) {
    //   recommendations.push(
    //     {
    //       tool: "Soothing Sounds",
    //       icon: Heart,
    //       reason:
    //         " Curated sleep sounds and nature ambience to help you drift offand stay asleep.",
    //       priority: "high",
    //     },
    //     {
    //       tool: "Ambient Lighting",
    //       icon: Sun,
    //       reason:
    //         "Fill your space with calming colors designed to help you relax and fall asleep naturally.",
    //       priority: "medium",
    //     }
    //   );
    // }

    return recommendations.slice(0, 3); // Return top 3 recommendations
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const updateAnswer = (key: keyof QuizAnswers, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    if (score >= 45) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    if (score >= 45) return "Poor";
    return "Needs Attention";
  };

  const score = showResults ? calculateSleepScore(answers) : 0;
  const recommendations = showResults ? getRecommendations(answers, score) : [];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-display font-semibold mb-2">
                Sleep Duration & Schedule
              </h3>
              <p className="text-muted-foreground">
                Let's start with your basic sleep patterns
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  How many hours of sleep do you get per night?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[4, 5, 6, 7, 8, 9, 10, 11].map((hours) => (
                    <Button
                      key={hours}
                      variant={
                        answers.sleepHours === hours ? "default" : "outline"
                      }
                      onClick={() => updateAnswer("sleepHours", hours)}
                      className="h-12"
                    >
                      {hours} hours
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  How consistent is your sleep schedule?
                </label>
                <div className="space-y-2">
                  {[
                    {
                      value: "very-consistent",
                      label: "Very consistent (same time ±30 min)",
                    },
                    {
                      value: "somewhat-consistent",
                      label: "Somewhat consistent (±1 hour)",
                    },
                    {
                      value: "inconsistent",
                      label: "Inconsistent (varies significantly)",
                    },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        answers.sleepSchedule === option.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        updateAnswer("sleepSchedule", option.value)
                      }
                      className="w-full justify-start h-auto py-3 px-4"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-display font-semibold mb-2">
                Sleep Quality
              </h3>
              <p className="text-muted-foreground">
                Tell us about your sleep quality
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  How long does it take you to fall asleep?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 5, label: "< 5 min" },
                    { value: 15, label: "5-15 min" },
                    { value: 30, label: "15-30 min" },
                    { value: 60, label: "30+ min" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        answers.fallAsleepTime === option.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        updateAnswer("fallAsleepTime", option.value)
                      }
                      className="h-12"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  How many times do you wake up during the night?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 0, label: "Never" },
                    { value: 1, label: "1 time" },
                    { value: 2, label: "2 times" },
                    { value: 4, label: "3+ times" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        answers.nightWakeups === option.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() => updateAnswer("nightWakeups", option.value)}
                      className="h-12"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Do you feel rested when you wake up?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "yes", label: "Yes, usually" },
                    { value: "no", label: "No, rarely" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        answers.feelRested === option.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() => updateAnswer("feelRested", option.value)}
                      className="h-12"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-display font-semibold mb-2">
                Sleep Environment
              </h3>
              <p className="text-muted-foreground">How's your bedroom setup?</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  How dark is your bedroom?
                </label>
                <div className="space-y-2">
                  {[
                    {
                      value: "very-dark",
                      label: "Very dark (blackout curtains)",
                    },
                    { value: "somewhat-dark", label: "Somewhat dark" },
                    { value: "bright", label: "Bright/light leaks in" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        answers.roomDarkness === option.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() => updateAnswer("roomDarkness", option.value)}
                      className="w-full justify-start h-auto py-3 px-4"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  What's your bedroom temperature like?
                </label>
                <div className="space-y-2">
                  {[
                    { value: "cool", label: "Cool (60-67°F)" },
                    { value: "comfortable", label: "Comfortable (68-72°F)" },
                    { value: "warm", label: "Warm (73°F+)" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        answers.roomTemperature === option.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        updateAnswer("roomTemperature", option.value)
                      }
                      className="w-full justify-start h-auto py-3 px-4"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  How quiet is your sleeping space?
                </label>
                <div className="space-y-2">
                  {[
                    { value: "very-quiet", label: "Very quiet" },
                    { value: "somewhat-quiet", label: "Some background noise" },
                    { value: "noisy", label: "Noisy/disruptive sounds" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        answers.roomQuietness === option.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        updateAnswer("roomQuietness", option.value)
                      }
                      className="w-full justify-start h-auto py-3 px-4"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-display font-semibold mb-2">
                Sleep Hygiene
              </h3>
              <p className="text-muted-foreground">Your pre-sleep habits</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  When do you have your last caffeine?
                </label>
                <div className="space-y-2">
                  {[
                    { value: "none", label: "I don't drink caffeine" },
                    { value: "morning-only", label: "Morning only" },
                    { value: "afternoon", label: "Afternoon (2-6 PM)" },
                    { value: "evening", label: "Evening (after 6 PM)" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        answers.caffeineTime === option.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() => updateAnswer("caffeineTime", option.value)}
                      className="w-full justify-start h-auto py-3 px-4"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  When do you stop using screens before bed?
                </label>
                <div className="space-y-2">
                  {[
                    { value: "none", label: "No screens in bedroom" },
                    { value: "1-hour-before", label: "1+ hours before bed" },
                    { value: "30-min-before", label: "30 minutes before bed" },
                    { value: "until-sleep", label: "Right until I sleep" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        answers.screenTime === option.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() => updateAnswer("screenTime", option.value)}
                      className="w-full justify-start h-auto py-3 px-4"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  When do you eat your last large meal?
                </label>
                <div className="space-y-2">
                  {[
                    { value: "3-hours-before", label: "3+ hours before bed" },
                    { value: "2-hours-before", label: "2 hours before bed" },
                    { value: "light-snack", label: "Light snack only" },
                    { value: "close-to-bed", label: "Close to bedtime" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        answers.mealTiming === option.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() => updateAnswer("mealTiming", option.value)}
                      className="w-full justify-start h-auto py-3 px-4"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-display font-semibold mb-2">
                Lifestyle Factors
              </h3>
              <p className="text-muted-foreground">
                Exercise and stress levels
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  How would you describe your exercise routine?
                </label>
                <div className="space-y-2">
                  {[
                    {
                      value: "regular-morning",
                      label: "Regular exercise (morning)",
                    },
                    {
                      value: "regular-afternoon",
                      label: "Regular exercise (afternoon)",
                    },
                    {
                      value: "regular-evening",
                      label: "Regular exercise (evening)",
                    },
                    { value: "irregular", label: "Irregular exercise" },
                    { value: "none", label: "No regular exercise" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={
                        answers.exercise === option.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() => updateAnswer("exercise", option.value)}
                      className="w-full justify-start h-auto py-3 px-4"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  How stressed do you feel daily? (1-10)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <Button
                      key={level}
                      variant={
                        answers.stressLevel === level ? "default" : "outline"
                      }
                      onClick={() => updateAnswer("stressLevel", level)}
                      className="h-12"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Low stress</span>
                  <span>High stress</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-display font-semibold mb-2">
                Main Sleep Challenge
              </h3>
              <p className="text-muted-foreground">
                What's your biggest sleep concern?
              </p>
            </div>

            <div className="space-y-2">
              {[
                { value: "falling-asleep", label: "Trouble falling asleep" },
                {
                  value: "staying-asleep",
                  label: "Waking up during the night",
                },
                {
                  value: "waking-up",
                  label: "Difficulty waking up/feeling tired",
                },
                { value: "schedule", label: "Inconsistent sleep schedule" },
                { value: "quality", label: "Poor sleep quality overall" },
                { value: "none", label: "No major issues" },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={
                    answers.mainConcern === option.value ? "default" : "outline"
                  }
                  onClick={() => updateAnswer("mainConcern", option.value)}
                  className="w-full justify-start h-auto py-3 px-4"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showResults) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-center">
              Your Sleep Assessment Results
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Sleep Score */}
            <Card className="text-center p-6 bg-gradient-to-br from-sleep-50 to-dream-50">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="h-8 w-8 text-sleep-600" />
                  <span className="text-3xl font-display font-bold">
                    Sleep Score
                  </span>
                </div>
                <div
                  className={`text-6xl font-display font-bold ${getScoreColor(
                    score
                  )}`}
                >
                  {score}
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {getScoreLabel(score)}
                </Badge>
                <Progress value={score} className="w-full h-3" />
              </div>
            </Card>

            {/* Ad Banner Space */}
            <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 text-center">
              <div className="space-y-3">
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800 border-amber-200"
                >
                  Sponsored
                </Badge>
                <div className="h-24 bg-amber-100/50 rounded-lg flex items-center justify-center border-2 border-dashed border-amber-300">
                  <div className="text-center text-amber-700">
                    <Star className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                    <p className="text-sm font-medium">
                      Premium Sleep Products
                    </p>
                    <p className="text-xs">Advertisement space</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            <div>
              <h3 className="text-xl font-display font-semibold mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                Recommended Tools for You
              </h3>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <Card
                    key={index}
                    className="p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          rec.priority === "high"
                            ? "bg-sleep-100"
                            : "bg-dream-100"
                        }`}
                      >
                        <rec.icon
                          className={`h-5 w-5 ${
                            rec.priority === "high"
                              ? "text-sleep-600"
                              : "text-dream-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-display font-semibold">
                            {rec.tool}
                          </h4>
                          {rec.priority === "high" && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-sleep-100 text-sleep-800"
                            >
                              Priority
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {rec.reason}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button onClick={() => onOpenChange(false)} className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Explore Recommended Tools
              </Button>
              <Button
                variant="outline"
                onClick={handleRestart}
                className="flex-1"
              >
                Retake Quiz
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-center">
            Sleep Quality Assessment
          </DialogTitle>
          <DialogDescription className="text-center">
            Answer a few questions to get personalized sleep improvement
            recommendations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Step {currentStep + 1} of {totalSteps}
              </span>
              <span>
                {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
              </span>
            </div>
            <Progress
              value={((currentStep + 1) / totalSteps) * 100}
              className="w-full"
            />
          </div>

          {/* Current Step Content */}
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 0 &&
                  (!answers.sleepHours || !answers.sleepSchedule)) ||
                (currentStep === 1 &&
                  (!answers.fallAsleepTime ||
                    answers.nightWakeups === undefined ||
                    !answers.feelRested)) ||
                (currentStep === 2 &&
                  (!answers.roomDarkness ||
                    !answers.roomTemperature ||
                    !answers.roomQuietness)) ||
                (currentStep === 3 &&
                  (!answers.caffeineTime ||
                    !answers.screenTime ||
                    !answers.mealTiming)) ||
                (currentStep === 4 &&
                  (!answers.exercise || !answers.stressLevel)) ||
                (currentStep === 5 && !answers.mainConcern)
              }
              className="flex items-center"
            >
              {currentStep === totalSteps - 1 ? "Get Results" : "Next"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
