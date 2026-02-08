"use client"

import { Sidebar } from "@/components/Sidebar"

export default function Courses() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">My Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e2839] rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-40 bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="p-4">
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-2 animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
