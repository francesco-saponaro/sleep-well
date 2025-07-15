"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../ThemeToggle";

const MobileNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="flex md:hidden items-center space-x-2">
        {/* Mobile Theme Toggle - Icon Only */}
        <div className="flex md:hidden">
          <ThemeToggle onlyIcon={true} />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="flex flex-col space-y-1">
            <div
              className={`w-4 h-0.5 bg-current transition-transform duration-200 ${
                mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></div>
            <div
              className={`w-4 h-0.5 bg-current transition-opacity duration-200 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-4 h-0.5 bg-current transition-transform duration-200 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></div>
          </div>
          <span className="text-sm font-medium">Tools</span>
        </Button>
      </div>
      {/* Mobile Menu Dropdown - Full width overlay */}
      <div
        className={`md:hidden absolute left-0 right-0 top-full bg-background/95 backdrop-blur-sm border-b shadow-lg transition-all duration-300 ease-in-out z-40 ${
          mobileMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-4">
          <Link
            href="/lighting"
            className="block text-lg text-muted-foreground hover:text-primary transition-colors py-3 border-b border-border/30 hover:bg-accent/50 rounded-md px-3"
          >
            Lighting
          </Link>
          <Link
            href="/sounds"
            className="block text-lg text-muted-foreground hover:text-primary transition-colors py-3 border-b border-border/30 hover:bg-accent/50 rounded-md px-3"
          >
            Sounds
          </Link>
          <Link
            href="/alarm-clock"
            className="block text-lg text-muted-foreground hover:text-primary transition-colors py-3 border-b border-border/30 hover:bg-accent/50 rounded-md px-3"
          >
            Alarm clock
          </Link>
          <Link
            href="/focus-timer"
            className="block text-lg text-muted-foreground hover:text-primary transition-colors py-3 border-b border-border/30 hover:bg-accent/50 rounded-md px-3"
          >
            Focus timer
          </Link>
          <Link
            href="/circadian-clock"
            className="block text-lg text-muted-foreground hover:text-primary transition-colors py-3 hover:bg-accent/50 rounded-md px-3"
          >
            Circadian clock
          </Link>
          <Link
            href="/stories"
            className="block text-lg text-muted-foreground hover:text-primary transition-colors py-3 hover:bg-accent/50 rounded-md px-3"
          >
            Stories
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
