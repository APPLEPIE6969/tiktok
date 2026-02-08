"use client"

import { Sidebar } from "@/components/Sidebar"

export default function Resources() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Resources Library</h1>
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e2839] rounded-xl hover:bg-slate-50 dark:hover:bg-[#252130] transition-colors cursor-pointer">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div>
                <div className="h-5 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-1 animate-pulse" />
                <div className="h-3 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
