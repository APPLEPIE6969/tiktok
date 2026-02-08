"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { getUserProfile } from "@/lib/userStore"

import { useLanguage } from "@/lib/i18n"

const sidebarItems = [
  { name: "nav.dashboard", href: "/dashboard", icon: "dashboard" },
  { name: "nav.courses", href: "/courses", icon: "menu_book" },
  { name: "nav.quizzes", href: "/quiz/generator", icon: "quiz" },
  { name: "nav.tutor", href: "/study/explanation", icon: "psychology" },
  { name: "nav.resources", href: "/resources", icon: "folder_open" },
]

const settingsItems = [
  { name: "nav.settings", href: "/profile", icon: "settings" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const userProfile = getUserProfile()
  const { t } = useLanguage()

  return (
    <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white dark:border-[#2e2839] dark:bg-[#131118] md:flex h-screen sticky top-0">
      <div className="flex h-16 items-center gap-3 px-6 border-b border-gray-200 dark:border-[#2e2839] shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
          <span className="material-symbols-outlined text-xl">school</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">StudyFlow</h1>
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${isActive
                  ? "bg-primary/10 text-primary"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-[#a69db9] dark:hover:bg-[#2e2839] dark:hover:text-white"
                  }`}
              >
                <span className={`material-symbols-outlined ${isActive ? "fill" : ""}`}>{item.icon}</span>
                <span className="text-sm font-medium">{t(item.name)}</span>
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-col gap-2 mt-auto">
          {settingsItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${isActive
                  ? "bg-primary/10 text-primary"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-[#a69db9] dark:hover:bg-[#2e2839] dark:hover:text-white"
                  }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm font-medium">{t(item.name)}</span>
              </Link>
            )
          })}

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-[#2e2839] dark:bg-[#1a1622]">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              {session?.user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt={session.user.name || "User"} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-primary to-purple-400"></div>
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{session?.user?.name || "Guest User"}</p>
              <p className="text-xs text-slate-500 dark:text-[#a69db9]">Level {userProfile?.stats?.currentLevel || 1} Apprentice</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
