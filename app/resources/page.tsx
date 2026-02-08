"use client"

import { Sidebar } from "@/components/Sidebar"

const resources = [
  {
    title: "AI Quiz Generation Guide",
    description: "Learn how to get the most accurate quizzes from the AI by using better document summaries.",
    icon: "psychology",
    type: "Guide",
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-500/10"
  },
  {
    title: "Effective Memory Techniques",
    description: "A summary of active recall and spaced repetition methods for students.",
    icon: "brain",
    type: "Article",
    color: "text-emerald-500",
    bgColor: "bg-emerald-100 dark:bg-emerald-500/10"
  },
  {
    title: "StudyFlow Shortcuts",
    description: "Master the keyboard shortcuts and productivity features within StudyFlow.",
    icon: "bolt",
    type: "Tool",
    color: "text-orange-500",
    bgColor: "bg-orange-100 dark:bg-orange-500/10"
  },
  {
    title: "Focus Music Playlists",
    description: "Curated Lo-Fi and classical music lists to help you stay in the flow.",
    icon: "music_note",
    type: "Media",
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-500/10"
  }
]

export default function Resources() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-background-dark">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Resources Library</h1>
          <p className="text-slate-500 dark:text-text-secondary mb-8">Curated guides and tools to supercharge your learning experience.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((res, i) => (
              <div
                key={i}
                className="group flex flex-col p-6 bg-white dark:bg-surface-dark-lighter border border-slate-200 dark:border-surface-dark-lighter/50 rounded-2xl hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
              >
                <div className={`size-12 rounded-xl ${res.bgColor} flex items-center justify-center ${res.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-2xl">{res.icon}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${res.bgColor} ${res.color}`}>
                    {res.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {res.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-text-secondary leading-relaxed">
                  {res.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
