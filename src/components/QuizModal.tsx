"use client";

import { useState, useEffect, useCallback } from "react";
import { RotateCcw, Flag, Trophy, Timer, Brain } from "lucide-react";

type Country = {
  name: string;
  code: string;
  flagUrl: string;
  capital: string;
  population: string;
  region: string;
};

type QuizMode = "flags" | "capitals" | "facts";

export default function QuizModal({
  countries,
  initialMode = "flags",
  onClose,
}: {
  countries: { name: string; code: string; flagUrl: string; capital: string; population: number; region: string }[];
  initialMode?: QuizMode;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<QuizMode>(initialMode);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState<Country[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<Country | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(15);
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [lives, setLives] = useState(3);

  const generateQuestion = useCallback(() => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimer(15);

    const shuffled = [...countries].sort(() => Math.random() - 0.5);
    const correct = shuffled[0];
    const wrongOptions = shuffled.slice(1, 4);

    setCorrectAnswer(correct);
    setOptions([correct, ...wrongOptions].sort(() => Math.random() - 0.5));
    setTotalQuestions((prev) => prev + 1);
  }, [countries]);

  useEffect(() => {
    generateQuestion();
  }, [mode, generateQuestion]);

  useEffect(() => {
    if (!showResult && isAnswered) return;
    if (timer <= 0) {
      handleAnswer(null);
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, showResult, isAnswered]);

  const handleAnswer = (answer: Country | null) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(answer?.code || null);
    setShowResult(true);

    if (answer && answer.code === correctAnswer?.code) {
      setScore((prev) => prev + 1);
    } else if (!answer) {
      setLives((prev) => prev - 1);
    } else {
      setLives((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    const nextQ = questionIndex + 1;
    if (nextQ >= 10 || lives <= 0) {
      // Quiz over
      return;
    }
    setQuestionIndex(nextQ);
    generateQuestion();
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionIndex(0);
    setTotalQuestions(0);
    setLives(3);
    generateQuestion();
  };

  const isGameOver = lives <= 0 || questionIndex >= 9;

  const getQuestionText = () => {
    switch (mode) {
      case "flags":
        return `Which country does this flag belong to?`;
      case "capitals":
        return `What is the capital of ${correctAnswer?.name}?`;
      case "facts":
        return `Which country has a population of ${correctAnswer?.population}?`;
      default:
        return "";
    }
  };

  const getOptionLabel = (option: Country) => {
    switch (mode) {
      case "flags":
        return option.name;
      case "capitals":
        return option.capital;
      case "facts":
        return option.name;
      default:
        return "";
    }
  };

  if (isGameOver && questionIndex > 0) {
    const grade = Math.round((score / totalQuestions) * 100);
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Complete!</h2>
          <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 my-4">{score}/10</p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {grade >= 80 ? "🌟 Excellent! You're a geography expert!" : grade >= 50 ? "👏 Good job! Keep learning!" : "📚 Keep practicing, you'll get better!"}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-semibold text-gray-500">Question {questionIndex + 1}/10</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: lives }).map((_, i) => (
                <span key={i} className="text-red-500">❤️</span>
              ))}
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex gap-2 mb-6">
          {[
            { m: "flags" as QuizMode, label: "🗺️ Flags", icon: Flag },
            { m: "capitals" as QuizMode, label: "🏛️ Capitals", icon: Trophy },
            { m: "facts" as QuizMode, label: "📊 Facts", icon: Brain },
          ].map((t) => (
            <button
              key={t.m}
              onClick={() => setMode(t.m)}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                mode === t.m
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Score */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-500">Score: {score}</span>
          <Timer className="w-5 h-5 text-gray-400" />
          <span className={`text-sm font-bold ${timer <= 5 ? "text-red-500" : "text-gray-500"}`}>{timer}s</span>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{getQuestionText()}</h3>

          {mode === "flags" && correctAnswer && (
            <div className="flex justify-center my-6">
              <img
                src={correctAnswer.flagUrl}
                alt="Flag to guess"
                className="w-48 h-32 rounded-xl shadow-lg border-4 border-gray-200 dark:border-gray-700"
              />
            </div>
          )}

          {mode === "capitals" && correctAnswer && (
            <div className="flex justify-center my-6">
              <img
                src={correctAnswer.flagUrl}
                alt={correctAnswer.name}
                className="w-16 h-10 rounded shadow border"
              />
              <span className="text-2xl mx-4 font-bold text-gray-400">→</span>
              <div className="text-center">
                <p className="text-gray-500 text-sm">What is the capital?</p>
                <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">{correctAnswer.name}</p>
              </div>
            </div>
          )}

          {mode === "facts" && correctAnswer && (
            <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-4 my-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Population to identify:</p>
              <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{correctAnswer.population}</p>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {options.map((option) => {
            const isCorrect = option.code === correctAnswer?.code;
            const isSelected = selectedAnswer === option.code;
            const isWrong = isSelected && !isCorrect;
            const isCorrectAnswer = !isSelected && showResult && isCorrect;

            return (
              <button
                key={option.code}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  isCorrectAnswer
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : isWrong
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : isAnswered
                    ? "border-gray-200 dark:border-gray-700 opacity-50"
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 active:scale-95"
                }`}
              >
                <div className="flex items-center gap-3">
                  {mode === "flags" && (
                    <img src={option.flagUrl} alt={option.name} className="w-8 h-5 rounded shadow-sm" loading="lazy" />
                  )}
                  <span className={`text-sm font-medium ${isCorrectAnswer ? "text-green-700 dark:text-green-400" : isWrong ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"}`}>
                    {getOptionLabel(option)}
                  </span>
                </div>
                {isCorrectAnswer && <span className="text-lg">✅</span>}
                {isWrong && <span className="text-lg">❌</span>}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        {showResult && (
          <button
            onClick={handleNext}
            className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            {questionIndex < 9 ? "Next Question →" : "See Results"}
          </button>
        )}

        {lives <= 0 && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl text-center">
            <p className="text-red-600 dark:text-red-400 font-bold">No lives remaining!</p>
            <button onClick={handleRestart} className="text-blue-600 dark:text-blue-400 underline mt-2">Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}