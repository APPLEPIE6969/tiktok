"use client"

import Link from "next/link"
import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { QuizQuestion } from "@/lib/ai"

export default function QuizInterface({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params)
  const id = unwrappedParams.id
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [hint, setHint] = useState<string | null>(null)
  const [loadingHint, setLoadingHint] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const router = useRouter()

  useEffect(() => {
    // Retrieve from localStorage
    const data = localStorage.getItem(`quiz_${id}`)
    if (data) {
        try {
            setQuizQuestions(JSON.parse(data))
        } catch (e) {
            console.error("Failed to parse quiz data", e)
        }
    }
    setLoading(false)
  }, [id])

  const currentQuestion = quizQuestions[currentQuestionIndex]

  const handleHint = async () => {
    if (!currentQuestion || loadingHint) return;
    setLoadingHint(true);
    try {
        const response = await fetch("/api/quiz/hint", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                question: currentQuestion.question,
                context: currentQuestion.correctAnswer, // Using correct answer as context for hint
                provider: "gemini"
            })
        });
        const data = await response.json();
        setHint(data.hint);
    } catch (error) {
        console.error("Hint error", error);
    } finally {
        setLoadingHint(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedAnswer(null)
        setHint(null)
        setIsSubmitted(false)
    } else {
        // Finish quiz logic
        alert("Quiz Finished!");
        router.push("/dashboard");
    }
  }

  if (loading) return <div className="flex h-screen items-center justify-center bg-background-dark text-white">Loading Quiz...</div>
  if (!currentQuestion) return <div className="flex h-screen items-center justify-center bg-background-dark text-white">Quiz not found or empty. <Link href="/quiz/generator" className="text-primary ml-2 underline">Create one</Link></div>

  const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  return (
    <div className="flex h-screen w-full flex-row overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-80 bg-white dark:bg-[#131118] border-r border-slate-200 dark:border-white/5 h-full overflow-y-auto">
        <div className="p-6 flex flex-col h-full justify-between">
          {/* Top Section: User & Module Info */}
          <div className="flex flex-col gap-6">
            {/* User Profile */}
            <div className="flex gap-4 items-center">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 border-2 border-primary"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYdm1fMOj1yHdIlQ2ZXb3VKNUKa8KmE0G85ABHqNryga-2-X3V69xc6tjqDljdUtPEOMem6dwdFWPo59xVOJR-LSXDUx2ROlpheuVHrcQV5J3vgmmftX5eVDdhSK2fV-BI6wOWIkVnjGgPF7iZuIk_fG6VxXB-WR-xPZZron6EFSdsJj-ms7auZDLggFmricD9s-QO2z12TO1aWevFOsKKPI6ZLXEe7wnDdLpy2zmoACC4oePNLQQXG74yiA4u-lNxpvWb-AlGkz3h")' }}
              ></div>
              <div className="flex flex-col">
                <h2 className="text-slate-900 dark:text-white text-base font-semibold leading-tight">User</h2>
                <p className="text-slate-500 dark:text-[#a69db9] text-xs font-medium uppercase tracking-wide">Student</p>
              </div>
            </div>
            <div className="h-px w-full bg-slate-200 dark:bg-white/10"></div>
            {/* Module Info */}
            <div>
              <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-normal mb-1">Generated Quiz</h1>
              <p className="text-slate-500 dark:text-[#a69db9] text-sm">Custom Session</p>
            </div>
            {/* Timer (Static for now) */}
            <div className="rounded-xl bg-slate-100 dark:bg-[#2e2839] p-4 mt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-500 dark:text-[#a69db9] text-xs font-medium uppercase tracking-wider">Time Remaining</span>
                <span className="material-symbols-outlined text-slate-400 dark:text-white/40 text-[18px]">timer</span>
              </div>
              <div className="flex items-end gap-2">
                <div className="flex flex-col items-center bg-white dark:bg-black/20 rounded p-2 min-w-[3rem]">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">--</span>
                  <span className="text-[10px] text-slate-400 uppercase">Min</span>
                </div>
                <span className="text-xl font-bold text-slate-300 dark:text-white/20 pb-4">:</span>
                <div className="flex flex-col items-center bg-white dark:bg-black/20 rounded p-2 min-w-[3rem]">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">--</span>
                  <span className="text-[10px] text-slate-400 uppercase">Sec</span>
                </div>
              </div>
            </div>
            {/* Question Grid */}
            <div className="mt-2">
              <h3 className="text-slate-500 dark:text-[#a69db9] text-xs font-medium uppercase tracking-wider mb-4">Questions</h3>
              <div className="grid grid-cols-5 gap-3">
                {quizQuestions.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            if (!isSubmitted) { // Prevent skipping if strictly enforcing flow, but for now allow
                                setCurrentQuestionIndex(idx)
                                setSelectedAnswer(null)
                                setHint(null)
                                setIsSubmitted(false)
                            }
                        }}
                        className={`aspect-square rounded flex items-center justify-center text-sm font-medium transition-colors ${
                            idx === currentQuestionIndex
                            ? "bg-primary text-white shadow-lg shadow-primary/40 ring-2 ring-primary ring-offset-2 dark:ring-offset-[#131118] font-bold rounded-lg"
                            : idx < currentQuestionIndex
                                ? "bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30"
                                : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10"
                        }`}
                    >
                        {idx + 1}
                    </button>
                ))}
              </div>
            </div>
          </div>
          {/* Bottom Actions */}
          <div className="flex flex-col gap-3 mt-6">
            <Link href="/dashboard" className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 dark:bg-white/5 px-4 py-3 text-sm font-medium text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              Back to Dashboard
            </Link>
            <Link href="/dashboard" className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 text-red-600 dark:text-red-400 px-4 py-3 text-sm font-medium hover:bg-red-500/10 transition-colors">
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Exit Quiz
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative">
        {/* Mobile Header (Visible only on small screens) */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#131118] border-b border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">Q{currentQuestionIndex + 1}</span>
            <span className="text-sm text-slate-500">/ {quizQuestions.length}</span>
          </div>
          <button className="p-2 text-slate-500">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="sticky top-0 z-10 w-full bg-background-light dark:bg-background-dark pt-6 px-6 sm:px-12 lg:px-24">
          <div className="flex justify-between items-end mb-2">
            <p className="text-slate-900 dark:text-white text-sm font-medium">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
            <p className="text-primary text-sm font-bold">{Math.round(progressPercentage)}% Complete</p>
          </div>
          <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(108,43,238,0.5)]" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        {/* Quiz Content Container */}
        <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-6 sm:px-12 lg:px-24 py-8 sm:py-12">
          {/* Question Header */}
          <div className="flex items-start justify-between gap-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
              {currentQuestion.question}
            </h1>
            {/* AI Hint Button */}
            <button
                onClick={handleHint}
                disabled={loadingHint}
                className="group flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-indigo-50 dark:bg-white/5 border border-indigo-200 dark:border-primary/30 hover:border-primary hover:bg-indigo-100 dark:hover:bg-primary/20 transition-all shrink-0 cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-primary text-primary dark:text-white shadow-sm">
                {loadingHint ? <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span> : <span className="material-symbols-outlined text-[18px]">temp_preferences_custom</span>}
              </div>
              <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-200 group-hover:text-primary dark:group-hover:text-white transition-colors">Ask AI Hint</span>
            </button>
          </div>

          {hint && (
             <div className="mb-8 p-4 bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary rounded-r-lg animate-fade-in-up">
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-1">lightbulb</span>
                    <div>
                        <p className="text-sm text-slate-700 dark:text-indigo-100 font-medium">AI Hint:</p>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{hint}</p>
                    </div>
                </div>
            </div>
          )}

          {/* Answer Options */}
          <div className="grid gap-4 mt-2">
            {currentQuestion.options.map((option, idx) => {
                const letter = String.fromCharCode(65 + idx); // A, B, C, D
                const isSelected = selectedAnswer === option;

                return (
                    <label
                        key={idx}
                        className={`group relative flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                            isSelected
                            ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-[0_0_20px_rgba(108,43,238,0.15)]"
                            : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#1e1828] hover:border-primary/50 dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-white/5"
                        }`}
                        onClick={() => setSelectedAnswer(option)}
                    >
                        <input className="peer sr-only" name="answer" type="radio" checked={isSelected} readOnly />
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 mr-5 transition-colors ${
                            isSelected
                            ? "border-primary bg-primary text-white"
                            : "border-slate-300 dark:border-white/20 text-slate-500 dark:text-white/40 group-hover:border-primary group-hover:text-primary"
                        }`}>
                            <span className="text-sm font-bold">{letter}</span>
                        </div>
                        <div className="flex-1">
                            <p className={`text-lg font-medium ${
                                isSelected
                                ? "text-slate-900 dark:text-white"
                                : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
                            }`}>
                                {option}
                            </p>
                        </div>
                        {isSelected && (
                            <div className="opacity-100 text-primary scale-100 transition-all">
                                <span className="material-symbols-outlined text-[24px]">check_circle</span>
                            </div>
                        )}
                    </label>
                )
            })}
          </div>
        </div>

        {/* Footer Controls */}
        <div className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#131118]/80 backdrop-blur-md p-6 sticky bottom-0 z-20">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <button
                onClick={() => {
                    if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1)
                }}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Previous
            </button>
            <div className="flex gap-4">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 transition-all transform active:scale-95"
              >
                {currentQuestionIndex === quizQuestions.length - 1 ? "Finish" : "Next Question"}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
