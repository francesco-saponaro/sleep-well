"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  onlyIcon?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onlyIcon }) => {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex gap-2"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {/* {!onlyIcon ? (isDark ? "Light Mode" : "Dark Mode") : null} */}
      {!onlyIcon ? (
        <span className="hidden md:inline">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      ) : null}
    </Button>
  );
};

export default ThemeToggle;
