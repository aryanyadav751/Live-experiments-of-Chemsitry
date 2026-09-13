import React from "react";
import { DiscoveryHistoryItem } from "../../types";
import { BookmarkCheck, X, ArrowRight, Box, Scale, Calendar, Sparkles } from "lucide-react";

interface MyDiscoveriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  discoveries: DiscoveryHistoryItem[];
  onLoadReaction: (item: DiscoveryHistoryItem) => void;
  onOpen3D: (reactionId: string) => void;
  onOpenBalancer: (equation: string) => void;
}

export const MyDiscoveriesModal: React.FC<MyDiscoveriesModalProps> = ({
  isOpen,
  onClose,
  discoveries,
  onLoadReaction,
  onOpen3D,
  onOpenBalancer
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                📖 My Chemical Discoveries
              </h2>
              <p className="text-xs text-slate-500">
                {discoveries.length} reactions discovered and archived in your laboratory journal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {discoveries.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <Sparkles className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                No discoveries logged yet
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Combine chemicals in the Discovery Lab and click &quot;Save Discovery&quot; to archive them.
              </p>
            </div>
          ) : (
            discoveries.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-blue-400 transition-all shadow-xs"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {item.chapter}
                      </span>
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {item.title}
                      </span>
                    </div>
                    <div className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-lg inline-block">
                      {item.balancedEquation || item.equation}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-slate-400 shrink-0">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-500 font-medium">
                    Type: <span className="font-bold text-slate-700 dark:text-slate-300">{item.reactionType}</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        onOpen3D(item.reactionId);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 text-xs font-bold flex items-center gap-1"
                    >
                      <Box className="w-3 h-3" />
                      <span>3D</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenBalancer(item.balancedEquation || item.equation);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold flex items-center gap-1"
                    >
                      <Scale className="w-3 h-3 text-amber-500" />
                      <span>Balance</span>
                    </button>

                    <button
                      onClick={() => {
                        onLoadReaction(item);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-500 text-xs font-bold flex items-center gap-1 shadow-xs"
                    >
                      <span>Load Lab</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
