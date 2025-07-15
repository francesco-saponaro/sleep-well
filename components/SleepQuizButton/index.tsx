"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import SleepQuizModal from "@/components/SleepQuizModal";

const SleepQuizButton = () => {
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        className="text-lg px-8 py-6"
        onClick={() => setQuizModalOpen(true)}
      >
        <Brain className="mr-2 h-5 w-5" />
        Take Sleep Quiz
      </Button>

      {/* Sleep Quiz Modal */}
      <SleepQuizModal open={quizModalOpen} onOpenChange={setQuizModalOpen} />
    </>
  );
};

export default SleepQuizButton;
