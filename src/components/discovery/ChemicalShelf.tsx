import React, { useState, useMemo } from "react";
import { DiscoverySubstance, SubstanceCategory } from "../../types";
import { ALL_SUBSTANCES, SUBSTANCE_CATEGORIES } from "../../data/substances";
import { Search, Plus, Check, Shield, Flame, Droplet, Sparkles, Box, Atom, Eye, Droplets, FlaskConical, AlertTriangle } from "lucide-react";

interface ChemicalShelfProps {
  selectedIds: string[];
  onToggleSubstance: (id: string) => void;
  maxSelection?: number;
}

export const ChemicalShelf: React.FC<ChemicalShelfProps> = ({
  selectedIds,
  onToggleSubstance,
  maxSelection = 4
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    return ["All", ...SUBSTANCE_CATEGORIES.map((c) => c.label)];
  }, []);

  const filteredSubstances = useMemo(() => {
    return ALL_SUBSTANCES.filter((substance) => {
      const matchesSearch =
        substance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        substance.formula.toLowerCase().includes(searchQuery.toLowerCase());

      if (activeCategory === "All") return matchesSearch;

      const matchedCat = SUBSTANCE_CATEGORIES.find((c) => c.label === activeCategory);
      const matchesCategory = matchedCat ? substance.category === matchedCat.id : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "copy";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Metals":
        return <Shield className="w-3 h-3 text-amber-500" />;
      case "Non-metals":
        return <Flame className="w-3 h-3 text-orange-500" />;
      case "Acids":
        return <Droplet className="w-3 h-3 text-rose-500" />;
      case "Bases":
        return <Sparkles className="w-3 h-3 text-blue-500" />;
      case "Salts":
        return <Box className="w-3 h-3 text-emerald-500" />;
      case "Carbon compounds":
        return <Atom className="w-3 h-3 text-purple-500" />;
      case "Indicators":
        return <Eye className="w-3 h-3 text-indigo-500" />;
      case "Water":
        return <Droplets className="w-3 h-3 text-cyan-500" />;
      default:
        return <FlaskConical className="w-3 h-3 text-slate-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              🧴 Chemical Shelf
            </span>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
              {ALL_SUBSTANCES.length} NCERT Reagents
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {selectedIds.length}/{maxSelection} added
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name or formula (e.g. Fe, HCl)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-bold"
                  : "bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Reagent Grid */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[580px] select-none">
        {filteredSubstances.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No chemicals found matching &quot;{searchQuery}&quot; in {activeCategory}.
          </div>
        ) : (
          filteredSubstances.map((substance) => {
            const isSelected = selectedIds.includes(substance.id);
            const isMaxReached = !isSelected && selectedIds.length >= maxSelection;

            return (
              <div
                key={substance.id}
                draggable={!isMaxReached}
                onDragStart={(e) => handleDragStart(e, substance.id)}
                onClick={() => !isMaxReached && onToggleSubstance(substance.id)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${substance.name}, formula ${substance.formula}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!isMaxReached) onToggleSubstance(substance.id);
                  }
                }}
                className={`group relative p-3 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-500/50 shadow-sm ring-1 ring-blue-500/30"
                    : isMaxReached
                    ? "opacity-50 cursor-not-allowed bg-slate-50/40 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800"
                    : "bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800/80 border-slate-200/80 dark:border-slate-800 hover:border-blue-400"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                        {substance.name}
                      </span>
                      <span className="font-mono text-[11px] font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {substance.formula}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                      <span className="inline-flex items-center gap-1">
                        {getCategoryIcon(substance.category)}
                        <span>{substance.category}</span>
                      </span>
                      <span>•</span>
                      <span className="capitalize">{substance.state}</span>
                      {substance.phValue !== undefined && (
                        <>
                          <span>•</span>
                          <span className="font-mono">pH {substance.phValue.toFixed(1)}</span>
                        </>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {substance.description}
                    </p>

                    {substance.isHazardous && (
                      <div className="mt-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium bg-amber-500/10 text-amber-700 dark:text-amber-300">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        <span>Virtual Simulation Reagent</span>
                      </div>
                    )}
                  </div>

                  {/* Add / Check toggle button */}
                  <div className="shrink-0 mt-0.5">
                    <button
                      type="button"
                      disabled={isMaxReached}
                      className={`w-7 h-7 rounded-xl flex items-center justify-center transition-transform active:scale-90 ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-blue-500 group-hover:text-white"
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Drag instruction overlay badge on hover */}
                <div className="hidden sm:block absolute bottom-1 right-3 text-[9px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                  Click or drag to vessel
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
