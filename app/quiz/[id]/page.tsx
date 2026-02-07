"use client"

import Link from "next/link"
import { useState } from "react"

export default function QuizInterface() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>("A")

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
                <h2 className="text-slate-900 dark:text-white text-base font-semibold leading-tight">Alex Morgan</h2>
                <p className="text-slate-500 dark:text-[#a69db9] text-xs font-medium uppercase tracking-wide">Student</p>
              </div>
            </div>
            <div className="h-px w-full bg-slate-200 dark:bg-white/10"></div>
            {/* Module Info */}
            <div>
              <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-normal mb-1">Python Advanced</h1>
              <p className="text-slate-500 dark:text-[#a69db9] text-sm">Module 3: Data Structures</p>
              <div className="flex items-center gap-2 mt-4 text-primary text-sm font-medium">
                <span className="material-symbols-outlined text-[20px]">school</span>
                <span>Level 4 Assessment</span>
              </div>
            </div>
            {/* Timer */}
            <div className="rounded-xl bg-slate-100 dark:bg-[#2e2839] p-4 mt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-500 dark:text-[#a69db9] text-xs font-medium uppercase tracking-wider">Time Remaining</span>
                <span className="material-symbols-outlined text-slate-400 dark:text-white/40 text-[18px]">timer</span>
              </div>
              <div className="flex items-end gap-2">
                <div className="flex flex-col items-center bg-white dark:bg-black/20 rounded p-2 min-w-[3rem]">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">14</span>
                  <span className="text-[10px] text-slate-400 uppercase">Min</span>
                </div>
                <span className="text-xl font-bold text-slate-300 dark:text-white/20 pb-4">:</span>
                <div className="flex flex-col items-center bg-white dark:bg-black/20 rounded p-2 min-w-[3rem]">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">32</span>
                  <span className="text-[10px] text-slate-400 uppercase">Sec</span>
                </div>
              </div>
            </div>
            {/* Question Grid */}
            <div className="mt-2">
              <h3 className="text-slate-500 dark:text-[#a69db9] text-xs font-medium uppercase tracking-wider mb-4">Questions</h3>
              <div className="grid grid-cols-5 gap-3">
                {/* Answered */}
                <button className="aspect-square rounded flex items-center justify-center text-sm font-medium bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30">1</button>
                <button className="aspect-square rounded flex items-center justify-center text-sm font-medium bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30">2</button>
                <button className="aspect-square rounded flex items-center justify-center text-sm font-medium bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30">3</button>
                {/* Current */}
                <button className="aspect-square rounded-lg flex items-center justify-center text-sm font-bold bg-primary text-white shadow-lg shadow-primary/40 ring-2 ring-primary ring-offset-2 dark:ring-offset-[#131118]">4</button>
                {/* Unanswered */}
                <button className="aspect-square rounded flex items-center justify-center text-sm font-medium bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">5</button>
                <button className="aspect-square rounded flex items-center justify-center text-sm font-medium bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">6</button>
                <button className="aspect-square rounded flex items-center justify-center text-sm font-medium bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">7</button>
                <button className="aspect-square rounded flex items-center justify-center text-sm font-medium bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">8</button>
                <button className="aspect-square rounded flex items-center justify-center text-sm font-medium bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">9</button>
                <button className="aspect-square rounded flex items-center justify-center text-sm font-medium bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">10</button>
                {/* Skipped */}
                <button className="aspect-square rounded flex items-center justify-center text-sm font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 relative">
                  11
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
                </button>
                <button className="aspect-square rounded flex items-center justify-center text-sm font-medium bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40">...</button>
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
            <span className="font-bold text-slate-900 dark:text-white">Q4</span>
            <span className="text-sm text-slate-500">/ 20</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-slate-500 text-[18px]">timer</span>
            <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">14:32</span>
          </div>
          <button className="p-2 text-slate-500">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="sticky top-0 z-10 w-full bg-background-light dark:bg-background-dark pt-6 px-6 sm:px-12 lg:px-24">
          <div className="flex justify-between items-end mb-2">
            <p className="text-slate-900 dark:text-white text-sm font-medium">Question 4 of 20</p>
            <p className="text-primary text-sm font-bold">20% Complete</p>
          </div>
          <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(108,43,238,0.5)]" style={{ width: '20%' }}></div>
          </div>
        </div>

        {/* Quiz Content Container */}
        <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-6 sm:px-12 lg:px-24 py-8 sm:py-12">
          {/* Question Header */}
          <div className="flex items-start justify-between gap-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
              What is the primary difference between a list and a tuple in Python?
            </h1>
            {/* AI Hint Button */}
            <button className="group flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-indigo-50 dark:bg-white/5 border border-indigo-200 dark:border-primary/30 hover:border-primary hover:bg-indigo-100 dark:hover:bg-primary/20 transition-all shrink-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-primary text-primary dark:text-white shadow-sm">
                <span className="material-symbols-outlined text-[18px]">temp_preferences_custom</span>
              </div>
              <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-200 group-hover:text-primary dark:group-hover:text-white transition-colors">Ask AI Hint</span>
            </button>
          </div>

          {/* Answer Options */}
          <div className="grid gap-4 mt-2">
            {/* Option A (Active/Selected) */}
            <label className={`group relative flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === "A" ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-[0_0_20px_rgba(108,43,238,0.15)]" : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#1e1828] hover:border-primary/50 dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-white/5"}`} onClick={() => setSelectedAnswer("A")}>
              <input className="peer sr-only" name="answer" type="radio" checked={selectedAnswer === "A"} readOnly />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 mr-5 transition-colors ${selectedAnswer === "A" ? "border-primary bg-primary text-white" : "border-slate-300 dark:border-white/20 text-slate-500 dark:text-white/40 group-hover:border-primary group-hover:text-primary"}`}>
                <span className="text-sm font-bold">A</span>
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium text-slate-900 dark:text-white">Lists are mutable, tuples are immutable.</p>
              </div>
              {selectedAnswer === "A" && (
                <div className="opacity-100 text-primary scale-100 transition-all">
                    <span className="material-symbols-outlined text-[24px]">check_circle</span>
                </div>
              )}
            </label>

            {/* Option B */}
            <label className={`group relative flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === "B" ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-[0_0_20px_rgba(108,43,238,0.15)]" : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#1e1828] hover:border-primary/50 dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-white/5"}`} onClick={() => setSelectedAnswer("B")}>
              <input className="peer sr-only" name="answer" type="radio" checked={selectedAnswer === "B"} readOnly />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 mr-5 transition-colors ${selectedAnswer === "B" ? "border-primary bg-primary text-white" : "border-slate-300 dark:border-white/20 text-slate-500 dark:text-white/40 group-hover:border-primary group-hover:text-primary"}`}>
                <span className="text-sm font-bold">B</span>
              </div>
              <div className="flex-1">
                <p className={`text-lg font-medium ${selectedAnswer === "B" ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"}`}>Tuples are mutable, lists are immutable.</p>
              </div>
              {selectedAnswer === "B" && (
                <div className="opacity-100 text-primary scale-100 transition-all">
                    <span className="material-symbols-outlined text-[24px]">check_circle</span>
                </div>
              )}
            </label>

            {/* Option C */}
            <label className={`group relative flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === "C" ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-[0_0_20px_rgba(108,43,238,0.15)]" : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#1e1828] hover:border-primary/50 dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-white/5"}`} onClick={() => setSelectedAnswer("C")}>
              <input className="peer sr-only" name="answer" type="radio" checked={selectedAnswer === "C"} readOnly />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 mr-5 transition-colors ${selectedAnswer === "C" ? "border-primary bg-primary text-white" : "border-slate-300 dark:border-white/20 text-slate-500 dark:text-white/40 group-hover:border-primary group-hover:text-primary"}`}>
                <span className="text-sm font-bold">C</span>
              </div>
              <div className="flex-1">
                <p className={`text-lg font-medium ${selectedAnswer === "C" ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"}`}>There is no difference.</p>
              </div>
              {selectedAnswer === "C" && (
                <div className="opacity-100 text-primary scale-100 transition-all">
                    <span className="material-symbols-outlined text-[24px]">check_circle</span>
                </div>
              )}
            </label>

            {/* Option D */}
            <label className={`group relative flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === "D" ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-[0_0_20px_rgba(108,43,238,0.15)]" : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#1e1828] hover:border-primary/50 dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-white/5"}`} onClick={() => setSelectedAnswer("D")}>
              <input className="peer sr-only" name="answer" type="radio" checked={selectedAnswer === "D"} readOnly />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 mr-5 transition-colors ${selectedAnswer === "D" ? "border-primary bg-primary text-white" : "border-slate-300 dark:border-white/20 text-slate-500 dark:text-white/40 group-hover:border-primary group-hover:text-primary"}`}>
                <span className="text-sm font-bold">D</span>
              </div>
              <div className="flex-1">
                <p className={`text-lg font-medium ${selectedAnswer === "D" ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"}`}>Lists can only store strings.</p>
              </div>
              {selectedAnswer === "D" && (
                <div className="opacity-100 text-primary scale-100 transition-all">
                    <span className="material-symbols-outlined text-[24px]">check_circle</span>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#131118]/80 backdrop-blur-md p-6 sticky bottom-0 z-20">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
              Previous
            </button>
            <div className="flex gap-4">
              <button className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">flag</span>
                Mark for Review
              </button>
              <button className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 transition-all transform active:scale-95">
                Next Question
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
