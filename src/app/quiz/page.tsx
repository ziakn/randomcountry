"use client";

import { useState, useEffect, useRef } from "react";
import { Flag, CircleDot, Trophy, Timer, RotateCcw, Brain, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
import countriesData from "@/data/countries";

const getAllCountries = () => countriesData;
const getRandomCountry = (excludeCode?: string) => {
  const all = countriesData;
  let idx = Math.floor(Math.random() * all.length);
  let c = all[idx];
  while (excludeCode && c.code === excludeCode.toLowerCase()) {
    idx = Math.floor(Math.random() * all.length);
    c = all[idx];
  }
  return c;
};

type QuizMode = "flags" | "capitals" | "population" | "region";

const QUIZ_MODES = [
  { id: "flags" as QuizMode, label: "Guess the Flag", icon: <Flag className="w-5 h-5" />, color: "from-red-500 to-red-600" },
  { id: "capitals" as QuizMode, label: "Guess the Capital", icon: <CircleDot className="w-5 h-5" />, color: "from-blue-500 to-blue-600" },
  { id: "population" as QuizMode, label: "Guess by Population", icon: <Layers className="w-5 h-5" />, color: "from-green-500 to-green-600" },
  { id: "region" as QuizMode, label: "Guess the Region", icon: <Brain className="w-5 h-5" />, color: "from-purple-500 to-purple-600" },
];

export default function QuizPage() {
  const allCountries = getAllCountries();
  const [mode, setMode] = useState<QuizMode>("flags");
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [lives, setLives] = useState(3);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const generateQuestions = (mode: QuizMode) => {
    const shuffled = [...allCountries].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10).map((country) => {
      let question = "";
      let correctAnswer = "";
      const wrongOptions = [...allCountries]
        .filter((c) => c.code !== country.code)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      switch (mode) {
        case "flags":
          question = country.name;
          correctAnswer = country.flagUrl;
          break;
        case "capitals":
          question = country.name;
          correctAnswer = country.capital;
          break;
        case "population":
          question = `${country.population}`;
          correctAnswer = country.name;
          break;
        case "region":
          question = country.name;
          correctAnswer = country.region;
          break;
      }

      const options = [...wrongOptions.map((c) => {
        switch (mode) {
          case "flags": return c.flagUrl;
          case "capitals": return c.capital;
          case "population": return c.name;
          case "region": return c.region;
        }
      }), correctAnswer].sort(() => Math.random() - 0.5);

      return { country, question, correctAnswer, options, mode };
    });
  };

  const startQuiz = (quizMode: QuizMode) => {
    setMode(quizMode);
    setScore(0);
    setCurrentQ(0);
    setLives(3);
    setStarted(true);
    setSelected(null);
    setShowAnswer(false);
    const qs = generateQuestions(quizMode);
    setQuestions(qs);
    setTimeLeft(15);
    startTimer();
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(null);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswer = (answer: string | null) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelected(answer);
    setShowAnswer(true);
    if (answer === questions[currentQ]?.correctAnswer) {
      setScore((prev) => prev + 1);
    } else {
      setLives((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQ >= questions.length - 1 || lives <= 0) {
      setStarted(false);
      return;
    }
    setCurrentQ((prev) => prev + 1);
    setSelected(null);
    setShowAnswer(false);
    setTimeLeft(15);
    startTimer();
  };

  const handleRestart = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStarted(false);
    setCurrentQ(0);
    setScore(0);
    setLives(3);
  };

  const progress = ((currentQ + (showAnswer ? 1 : 0)) / questions.length) * 100;
  const grade = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!started ? (
        // Quiz Mode Selection
        <section className="animate-fade-in-down text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            🧠 Geography Quiz
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Test your knowledge of world geography! Choose a quiz category and see how you rank.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {QUIZ_MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => startQuiz(m.id)}
                className={`p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-left hover:shadow-lg transition-all hover:scale-[1.02] bg-gradient-to-br ${m.color} bg-opacity-10 hover:bg-opacity-20 dark:bg-opacity-20 dark:hover:bg-opacity-30`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {m.icon}
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{m.label}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">
                  {m.id === "flags" && "Identify countries from their flags"}
                  {m.id === "capitals" && "Match countries to their capitals"}
                  {m.id === "population" && "Guess which country has the given population"}
                  {m.id === "region" && "Identify the region of a country"}
                </p>
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800 inline-block">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm text-gray-700 dark:text-gray-300">10 questions per round • 15 seconds per question • 3 lives</p>
          </div>
        </section>
      ) : (
        // Quiz Active
        <section className="animate-fade-in">
          {/* Progress Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-500">Q{currentQ + 1}/{questions.length}</span>
                <div className="w-40 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-green-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <Timer className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm font-bold ${timeLeft <= 5 ? "text-red-500" : "text-gray-600 dark:text-gray-300"}`}>{timeLeft}s</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{score}</span>
                </div>
                <div className="flex">
                  {Array.from({ length: lives }).map((_, i) => (
                    <span key={i} className="text-red-500">❤️</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {questions[currentQ] && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm animate-fade-in-up">
              {/* Question */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                  {mode === "flags" ? "Which country does this flag belong to?" : 
                   mode === "capitals" ? `What is the capital of ${questions[currentQ].question}?` :
                   mode === "population" ? `Which country has a population of approximately ${questions[currentQ].question}?` :
                   `Which region is ${questions[currentQ].question} located in?`}
                </h3>
                
                {mode === "flags" && (
                  <div className="flex justify-center my-6">
                    <img
                      src={questions[currentQ].correctAnswer}
                      alt="Country flag"
                      className="w-48 h-32 rounded-xl shadow-lg border-4 border-gray-200 dark:border-gray-700"
                    />
                  </div>
                )}

                {mode === "population" && (
                  <div className="flex justify-center my-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl px-8 py-4 text-white text-center">
                      <div className="text-4xl font-black">{questions[currentQ].question}</div>
                      <div className="text-sm opacity-75">population</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3">
                {questions[currentQ].options.map((option: string, i: number) => {
                  const isCorrect = option === questions[currentQ].correctAnswer;
                  const isSelected = selected === option;

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(option)}
                      disabled={showAnswer}
                      className={`p-4 rounded-xl border-2 text-left transition-all text-sm font-medium ${
                        showAnswer
                          ? isCorrect
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                            : isSelected
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                            : "border-gray-200 dark:border-gray-700 opacity-50 text-gray-400"
                          : "border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 active:scale-95"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {mode === "flags" && <img src={option} alt="option" className="w-6 h-4 rounded shadow-sm" loading="lazy" />}
                        <span>{option}</span>
                        {showAnswer && isCorrect && <span>✅</span>}
                        {showAnswer && isSelected && !isCorrect && <span>❌</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              {showAnswer && (
                <div className="mt-6 text-center">
                  {currentQ < questions.length - 1 && lives > 0 ? (
                    <button
                      onClick={handleNext}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-lg transition-all inline-flex items-center gap-2"
                    >
                      Next Question <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleRestart}
                      className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all inline-flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" /> Play Again
                    </button>
                  )}
                </div>
              )}

              {/* Game Over */}
              {lives <= 0 && !showAnswer && (
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl text-center">
                  <p className="text-red-600 dark:text-red-400 font-bold">Game Over! All lives lost.</p>
                  <button onClick={handleRestart} className="text-blue-600 dark:text-blue-400 underline mt-2">Try Again</button>
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
}