import React, { useState } from "react";
import { DailyStreakInfo } from "../types";
import {
  FlaskConical,
  BookOpen,
  Layers,
  Sparkles,
  Award,
  CreditCard,
  Sun,
  Moon,
  Star,
  Menu,
  X,
  GitCompare,
  CheckCircle2,
  Flame,
  Globe
} from "lucide-react";

export type NavTab = "home" | "chapters" | "explorer" | "lab" | "exam" | "applications" | "flashcards" | "compare" | "progress";

interface NavbarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  ncertMode: boolean;
  onToggleNcertMode: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  completedCount: number;
  totalCount: number;
  streakInfo?: DailyStreakInfo;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  ncertMode,
  onToggleNcertMode,
  isDarkMode,
  onToggleTheme,
  completedCount,
  totalCount,
  streakInfo
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showStreakTooltip, setShowStreakTooltip] = useState(false);

  const navItems: { id: NavTab; label: string; icon: any }[] = [
    { id: "home", label: "Home", icon: BookOpen },
    { id: "chapters", label: "Chapters", icon: Layers },
    { id: "explorer", label: "Reactions", icon: Sparkles },
    { id: "lab", label: "Virtual Lab", icon: FlaskConical },
    { id: "exam", label: "Exam Zone", icon: Award },
    { id: "applications", label: "Real-World", icon: Globe },
    { id: "flashcards", label: "Flashcards", icon: CreditCard },
    { id: "compare", label: "Compare", icon: GitCompare },
    { id: "progress", label: "Progress", icon: CheckCircle2 }
  ];

  const handleItemClick = (tab: NavTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <div
          onClick={() => handleItemClick("home")}
          className="cursor-pointer flex items-center gap-2.5 group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight leading-none">
                Chemistry Lab
              </span>
              <span className="text-[10px] font-mono font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded leading-none">
                CLASS 10
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 leading-none mt-1">
              NCERT CBSE Science Simulator
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                    : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Streak Counter, NCERT Mode, Dark Mode, Student Progress Badge & Mobile Hamburger */}
        <div className="flex items-center gap-2">
          {/* Daily Learning Streak Counter Badge */}
          <div className="relative">
            <button
              onClick={() => setShowStreakTooltip(!showStreakTooltip)}
              onMouseEnter={() => setShowStreakTooltip(true)}
              onMouseLeave={() => setShowStreakTooltip(false)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/15 text-amber-700 dark:text-amber-300 hover:border-amber-500/60 shadow-sm"
              title="Daily Learning Streak"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
              <span className="font-mono font-black text-sm text-orange-600 dark:text-orange-400">
                {streakInfo?.currentStreak ?? 3}
              </span>
              <span className="hidden sm:inline text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                Day Streak
              </span>
            </button>

            {/* Streak Hover / Click Popover HUD */}
            {showStreakTooltip && (
              <div className="absolute right-0 top-full mt-2 w-64 p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-amber-500/30 text-white shadow-2xl z-50 text-xs space-y-2 font-sans">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400">
                    <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                    <span>Daily Learning Streak</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    {streakInfo?.todayCompleted ? "Active Today ✓" : "Due Today"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center py-1">
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Current</div>
                    <div className="text-base font-black text-orange-400 font-mono">
                      {streakInfo?.currentStreak ?? 3} Days
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Best Record</div>
                    <div className="text-base font-black text-amber-300 font-mono">
                      {streakInfo?.longestStreak ?? 5} Days
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 leading-tight">
                  Study a reaction, run a virtual experiment, balance an equation, or complete a quiz each day to keep your streak burning!
                </p>
              </div>
            )}
          </div>

          {/* NCERT Mode Toggle */}
          <button
            onClick={onToggleNcertMode}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              ncertMode
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40 shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
            }`}
            title="Toggle NCERT Board Exam Focus Mode"
          >
            <Star className={`w-3.5 h-3.5 ${ncertMode ? "fill-amber-500 text-amber-500" : ""}`} />
            <span className="hidden sm:inline">NCERT Mode</span>
            <span className="text-[10px] px-1 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono">
              {ncertMode ? "ON" : "OFF"}
            </span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Dark / Light theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
