"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getUserProfile, type UserStats } from "@/lib/userStore"
import { useLanguage } from "@/lib/i18n"
import { Sidebar } from "@/components/Sidebar"
import Link from "next/link"
import {
  BookOpen,
  Brain,
  Clock,
  Flame,
  Layout,
  Plus,
  Search,
  Settings,
  Trophy,
  Zap,
  Calendar,
  ArrowRight
} from "lucide-react"

export default function Dashboard() {
  const { data: session } = useSession()
  const { t } = useLanguage()
  const [userStats, setUserStats] = useState<UserStats>({
    totalQuizzes: 0,
    accuracyScore: 0,
    hoursStudied: 0,
    dailyStreak: 0,
    currentLevel: 1,
    xpEarned: 0,
    xpToNextLevel: 100
  })
  const [showTutorial, setShowTutorial] = useState(false)

  useEffect(() => {
    // Load user stats
    const profile = getUserProfile()
    if (profile && profile.stats) {
      setUserStats(profile.stats)
    }

    // Check if first visit for tutorial
    const hasSeenTutorial = localStorage.getItem("hasSeenDashboardTutorial")
    if (!hasSeenTutorial) {
      setShowTutorial(true)
      localStorage.setItem("hasSeenDashboardTutorial", "true")
    }
  }, [])

  const displayName = session?.user?.name || "Student"

  // Mock data for display
  const recentCourses = [
    { id: 1, title: "Biology 101", progress: 75, lastStudied: "2 hours ago", color: "bg-emerald-500" },
    { id: 2, title: "European History", progress: 30, lastStudied: "Yesterday", color: "bg-blue-500" },
    { id: 3, title: "Intro to Psychology", progress: 0, lastStudied: "Not started", color: "bg-purple-500" },
  ]

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-background-dark">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto p-4 lg:p-8">
        <div className="max-w-7xl mx-auto w-full space-y-8">

          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in-up">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
                {t("dashboard.welcome", displayName)} 👋
              </h1>
              <p className="text-slate-500 dark:text-text-secondary mt-2">
                {userStats.hoursStudied > 0
                  ? <span dangerouslySetInnerHTML={{ __html: t("dashboard.learned_minutes", Math.round(userStats.hoursStudied * 60)) }} />
                  : t("dashboard.start_learning")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white dark:bg-surface-dark-lighter px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-shadow dark:text-white">
                <Calendar className="w-4 h-4 text-slate-500 dark:text-text-secondary" />
                <span className="text-sm font-medium">{new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Streak */}
            <div className="bg-white dark:bg-surface-dark-lighter p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Flame className="w-16 h-16 text-orange-500" />
              </div>
              <div className="flex flex-col text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-500 dark:text-text-secondary">
                    {t("stats.streak")}
                  </p>
                </div>
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{userStats.dailyStreak}</span>
                <span className="text-xs text-slate-400 mt-1">{t("stats.days")}</span>
              </div>
            </div>

            {/* Level */}
            <div className="bg-white dark:bg-surface-dark-lighter p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="w-16 h-16 text-yellow-500" />
              </div>
              <div className="flex flex-col text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-500/20 rounded-lg">
                    <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-500 dark:text-text-secondary">
                    {t("stats.level")}
                  </p>
                </div>
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{userStats.currentLevel}</span>
                <span className="text-xs text-slate-400 mt-1">{t("sidebar.apprentice")}</span>
              </div>
            </div>


            {/* XP */}
            <div className="bg-white dark:bg-surface-dark-lighter p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-16 h-16 text-purple-500" />
              </div>
              <div className="flex flex-col text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg">
                    <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-500 dark:text-text-secondary">
                    {t("stats.xp")}
                  </p>
                </div>
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{userStats.xpEarned}</span>
                <span className="text-xs text-slate-400 mt-1">Total</span>
              </div>
            </div>

            {/* Hours (Optional, simplified) */}
            <div className="bg-white dark:bg-surface-dark-lighter p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Clock className="w-16 h-16 text-blue-500" />
              </div>
              <div className="flex flex-col text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-500 dark:text-text-secondary">Hours</span>
                </div>
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{userStats.hoursStudied.toFixed(1)}</span>
                <span className="text-xs text-slate-400 mt-1">Lifetime</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t("dashboard.quick_actions")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/create" className="group bg-linear-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-colors"></div>
                <Brain className="w-8 h-8 mb-4" />
                <span className="block text-lg font-bold">{t("actions.generate_quiz")}</span>
                <span className="text-sm text-purple-100 opacity-90">{t("actions.generate_quiz_desc")}</span>
              </Link>
              <button className="group bg-white dark:bg-surface-dark-lighter rounded-2xl p-6 border border-slate-100 dark:border-white/5 hover:border-purple-500/30 dark:hover:border-purple-400/30 shadow-sm hover:shadow-md transition-all text-left">
                <div className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Search className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                </div>
                <span className="block text-lg font-bold text-slate-900 dark:text-white mb-1">{t("actions.explain")}</span>
                <span className="text-sm text-slate-500 dark:text-text-secondary">{t("actions.explain_desc")}</span>
              </button>
              <button className="group bg-white dark:bg-surface-dark-lighter rounded-2xl p-6 border border-slate-100 dark:border-white/5 hover:border-purple-500/30 dark:hover:border-purple-400/30 shadow-sm hover:shadow-md transition-all text-left">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="block text-lg font-bold text-slate-900 dark:text-white mb-1">{t("actions.new_note")}</span>
                <span className="text-sm text-slate-500 dark:text-text-secondary">{t("actions.new_note_desc")}</span>
              </button>
            </div>
          </div>

          {/* Content Section - 2 Columns */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content (Courses) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t("dashboard.courses")}</h2>
                <button className="text-sm text-primary font-medium hover:underline">{t("common.view_all")}</button>
              </div>

              {recentCourses.length > 0 ? (
                <div className="space-y-4">
                  {recentCourses.map(course => (
                    <div key={course.id} className="bg-white dark:bg-surface-dark-lighter p-4 rounded-xl border border-slate-100 dark:border-white/5 flex items-center gap-4 hover:shadow-sm transition-shadow cursor-pointer group">
                      <div className={`w-12 h-12 rounded-lg ${course.color} flex items-center justify-center text-white font-bold shrink-0`}>
                        {course.title.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">{course.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-1.5 flex-1 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${course.progress}%` }}></div>
                          </div>
                          <span className="text-xs text-slate-500 dark:text-text-secondary w-8 text-right">{course.progress}%</span>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-surface-dark-lighter p-8 rounded-2xl border border-slate-100 dark:border-white/5 text-center">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{t("dashboard.no_courses")}</h3>
                  <p className="text-slate-500 dark:text-text-secondary mb-4 max-w-sm mx-auto">{t("dashboard.no_courses_desc")}</p>
                  <button className="text-primary font-medium hover:underline">{t("dashboard.browse_courses")}</button>
                </div>
              )}
            </div>

            {/* Sidebar Stats / Activity */}
            <div className="space-y-6">
              {/* Activity Chart Placeholder */}
              <div className="bg-white dark:bg-surface-dark-lighter p-6 rounded-2xl border border-slate-100 dark:border-white/5">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">{t("dashboard.activity")}</h3>
                <div className="h-40 flex items-center justify-center bg-slate-50 dark:bg-surface-dark rounded-xl border border-dashed border-slate-200 dark:border-white/10">
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-400">{t("dashboard.no_activity")}</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-[150px] mx-auto">{t("dashboard.no_activity_desc")}</p>
                  </div>
                </div>
                <div className="flex justify-between mt-4 text-xs text-slate-400">
                  <span>{t("common.this_week")}</span>
                  <span>{t("common.this_month")}</span>
                </div>
              </div>

              {/* Upcoming */}
              <div className="bg-white dark:bg-surface-dark-lighter p-6 rounded-2xl border border-slate-100 dark:border-white/5">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">{t("dashboard.up_next")}</h3>
                <div className="space-y-4">
                  <div className="text-center py-6">
                    <p className="text-slate-400 text-sm mb-2">{t("dashboard.no_events")}</p>
                    <p className="text-xs text-slate-500 mb-4">{t("dashboard.no_events_desc")}</p>
                    <button className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-medium hover:bg-primary/20 transition-colors">
                      {t("dashboard.schedule_event")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-dark-lighter border-t border-slate-200 dark:border-white/5 block lg:hidden z-50">
        <div className="flex justify-around items-center h-16">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 p-2 text-primary">
            <Layout className="w-5 h-5" />
            <span className="text-[10px] font-medium">{t("nav.dashboard")}</span>
          </Link>
          <Link href="/courses" className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] font-medium">{t("nav.courses")}</span>
          </Link>
          <Link href="/create" className="flex flex-col items-center gap-1 p-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center -mt-6 shadow-lg shadow-primary/30">
              <Plus className="w-6 h-6 text-white" />
            </div>
          </Link>
          <Link href="/tutor" className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <Brain className="w-5 h-5" />
            <span className="text-[10px] font-medium">{t("nav.tutor")}</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <Settings className="w-5 h-5" />
            <span className="text-[10px] font-medium">{t("nav.settings")}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
