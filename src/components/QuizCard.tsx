import React, { useState } from "react";
import { QuizQuestion } from "../types";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface QuizCardProps {
  questions: QuizQuestion[];
  quizTitle?: string;
  onComplete?: (score: number, total: number) => void;
  className?: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  questions,
  quizTitle = "NCERT Chemistry Quiz",
  onComplete,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (opt: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.answer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      const finalScore = selectedOption === currentQ.answer ? score : score;
      if (onComplete) {
        onComplete(finalScore, questions.length);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  if (!currentQ) {
    return (
      <div className="p-6 text-center text-slate-500">
        No quiz questions available for this module.
      </div>
    );
  }

  return (
    <div
      id="ncert-quiz-card"
      className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-md ${className}`}
    >
      {/* Quiz Progress Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {quizTitle}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Question {currentIndex + 1} of {questions.length}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
          <span>Score:</span>
          <span className="text-blue-600 dark:text-blue-400">{score}</span>
          <span>/</span>
          <span>{questions.length}</span>
        </div>
      </div>

      {!isFinished ? (
        <div>
          {/* Question Text */}
          <div className="mb-6">
            <p className="text-base sm:text-lg text-slate-800 dark:text-slate-100 font-medium leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5 mb-6">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQ.answer;

              let btnClass = "border-slate-200 dark:border-slate-700 hover:border-blue-400 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200";

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnClass = "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/30";
                } else if (isSelected && !isCorrect) {
                  btnClass = "border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-300 ring-2 ring-rose-500/30";
                } else {
                  btnClass = "opacity-50 border-slate-200 dark:border-slate-800 bg-transparent text-slate-400";
                }
              } else if (isSelected) {
                btnClass = "border-blue-500 bg-blue-500/10 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/30";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-3.5 rounded-xl border font-medium text-sm sm:text-base flex items-center justify-between gap-3 transition-all ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-mono text-xs shrink-0 font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner when answered */}
          <AnimatePresence>
            {isAnswerSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border mb-6 text-sm leading-relaxed ${
                  selectedOption === currentQ.answer
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
                    : "bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200"
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {selectedOption === currentQ.answer ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Correct Answer!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-500" />
                      <span>Incorrect — Correct is: {currentQ.answer}</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm">{currentQ.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions Footer */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOption}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all"
              >
                <span>{currentIndex < questions.length - 1 ? "Next Question" : "View Results"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Screen */
        <div className="py-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
            <Award className="w-9 h-9" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            Quiz Completed!
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            You scored <strong className="text-blue-600 dark:text-blue-400 font-mono text-lg">{score}</strong> out of <strong className="font-mono text-lg">{questions.length}</strong> ({Math.round((score / questions.length) * 100)}%)
          </p>

          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
};
