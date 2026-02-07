"use client"

import { Sidebar } from "@/components/Sidebar"
import Link from "next/link"
import { useState } from "react"

export default function QuizGenerator() {
  const [inputType, setInputType] = useState<"topic" | "file">("topic")

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-4 sm:px-8 overflow-y-auto bg-background-light dark:bg-background-dark">
        <div className="w-full max-w-[800px] flex flex-col gap-6 animate-fade-in-up">
          {/* Header Text */}
          <div className="text-center space-y-2 mb-4">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">AI Quiz Generator</h1>
            <p className="text-slate-500 dark:text-text-secondary text-base md:text-lg">Create a personalized quiz in seconds from any topic or document.</p>
          </div>

          {/* Main Card */}
          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e2839] rounded-2xl shadow-xl dark:shadow-none p-6 md:p-8 flex flex-col gap-6">
            {/* Toggle Switch */}
            <div className="bg-slate-100 dark:bg-surface-dark-lighter p-1.5 rounded-xl flex w-full md:w-fit mx-auto md:mx-0">
              <button
                onClick={() => setInputType("topic")}
                className={`flex-1 md:flex-none px-6 py-2 rounded-lg shadow-sm text-sm font-semibold transition-all ${
                    inputType === "topic"
                    ? "bg-white dark:bg-[#131118] text-primary dark:text-white"
                    : "text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">edit_note</span>
                  Topic Input
                </span>
              </button>
              <button
                onClick={() => setInputType("file")}
                className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                    inputType === "file"
                    ? "bg-white dark:bg-[#131118] text-primary dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">upload_file</span>
                  Upload File
                </span>
              </button>
            </div>

            {/* Input Area */}
            {inputType === "topic" ? (
                <div className="flex flex-col gap-2">
                    <label className="text-slate-900 dark:text-white text-sm font-bold ml-1">Topic or Content</label>
                    <div className="relative group">
                        <textarea className="w-full h-40 bg-slate-50 dark:bg-[#131118] border border-slate-200 dark:border-[#2e2839] rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-text-secondary focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none text-base" placeholder="e.g., Quantum Physics, The History of Rome, or paste a summary..."></textarea>
                        <div className="absolute bottom-3 right-3 text-xs text-slate-400 dark:text-gray-600 font-medium bg-slate-50 dark:bg-[#131118] px-2 rounded">0/2000</div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <label className="text-slate-900 dark:text-white text-sm font-bold ml-1">Upload Source Material</label>
                    <div className="w-full h-40 border-2 border-dashed border-slate-300 dark:border-[#2e2839] hover:border-primary dark:hover:border-primary rounded-xl flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-[#131118] transition-colors cursor-pointer group">
                        <div className="p-3 bg-white dark:bg-surface-dark-lighter rounded-full shadow-sm group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-primary text-2xl">cloud_upload</span>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Click to upload or drag and drop</p>
                            <p className="text-xs text-slate-500 dark:text-text-secondary mt-1">PDF, DOCX, TXT (Max 10MB)</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Configuration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-white text-sm font-bold ml-1">Difficulty Level</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 dark:bg-[#131118] border border-slate-200 dark:border-[#2e2839] rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none cursor-pointer">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-white text-sm font-bold ml-1">Question Type</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 dark:bg-[#131118] border border-slate-200 dark:border-[#2e2839] rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none cursor-pointer">
                    <option>Multiple Choice</option>
                    <option>True / False</option>
                    <option>Short Answer</option>
                    <option>Mix of All</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-white text-sm font-bold ml-1">Number of Questions</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 dark:bg-[#131118] border border-slate-200 dark:border-[#2e2839] rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none cursor-pointer" defaultValue="10 Questions">
                    <option>5 Questions</option>
                    <option>10 Questions</option>
                    <option>15 Questions</option>
                    <option>20 Questions</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-white text-sm font-bold ml-1">Language</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 dark:bg-[#131118] border border-slate-200 dark:border-[#2e2839] rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none cursor-pointer">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <Link href="/quiz/1" className="group w-full bg-primary hover:bg-primary/90 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="material-symbols-outlined relative z-10 animate-bounce">auto_awesome</span>
                <span className="relative z-10">Generate Quiz</span>
              </Link>
              <p className="text-center text-xs text-slate-400 dark:text-gray-600 mt-3">Estimated time: ~15 seconds</p>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="w-full mt-4">
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Generations</h3>
              <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">View all</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e2839] p-4 rounded-xl flex items-start gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="bg-purple-100 dark:bg-primary/20 p-3 rounded-lg text-primary">
                  <span className="material-symbols-outlined">science</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-900 dark:text-white font-semibold truncate group-hover:text-primary transition-colors">Intro to Thermodynamics</h4>
                  <p className="text-slate-500 dark:text-text-secondary text-sm mt-0.5">10 Qs • Multiple Choice</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded font-medium">Completed</span>
                    <span className="text-xs text-slate-400 dark:text-gray-600">2h ago</span>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>

              {/* Card 2 */}
              <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e2839] p-4 rounded-xl flex items-start gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="bg-blue-100 dark:bg-blue-500/20 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                  <span className="material-symbols-outlined">history_edu</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-900 dark:text-white font-semibold truncate group-hover:text-primary transition-colors">European History 1900s</h4>
                  <p className="text-slate-500 dark:text-text-secondary text-sm mt-0.5">15 Qs • Mixed</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-slate-100 dark:bg-slate-700/30 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-medium">Draft</span>
                    <span className="text-xs text-slate-400 dark:text-gray-600">5h ago</span>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
