"use client"

import { Sidebar } from "@/components/Sidebar"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { isOnboardingComplete, getUserProfile, isTutorialComplete, type UserStats } from "@/lib/userStore"
import { EmptyState } from "@/components/EmptyState"
import { TutorialOverlay } from "@/components/TutorialOverlay"
import { AnimatedDropdown } from "@/components/AnimatedDropdown"

const defaultStats: UserStats = {
  totalQuizzes: 0,
  accuracyScore: 0,
  hoursStudied: 0,
  dailyStreak: 0,
  currentLevel: 1,
  xpEarned: 0,
  xpToNextLevel: 100,
}

// User's actual data (empty for new users)
interface UserData {
  courses: Array<{
    id: string
    title: string
    subject: string
    progress: number
    image: string
    status: "continue" | "suggested" | "almost-done"
  }>
  upcomingEvents: Array<{
    id: string
    title: string
    date: string
    type: "quiz" | "group" | "deadline"
  }>
  weeklyActivity: number[] // 7 days of activity data
}

const emptyUserData: UserData = {
  courses: [],
  upcomingEvents: [],
  weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userStats, setUserStats] = useState<UserStats>(defaultStats)
  const [userData, setUserData] = useState<UserData>(emptyUserData)
  const [isLoading, setIsLoading] = useState(true)
  const [showTutorial, setShowTutorial] = useState(false)
  const [activityPeriod, setActivityPeriod] = useState("week")

  // Check authentication and onboarding
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    if (status === "authenticated" && session?.user?.email) {
      // Check if user has completed onboarding
      if (!isOnboardingComplete(session.user.email)) {
        router.push("/onboarding")
        return
      }

      // Load user stats
      const profile = getUserProfile()
      if (profile?.stats) {
        setUserStats(profile.stats)
      }

      // Check if tutorial should be shown
      if (!isTutorialComplete(session.user.email)) {
        setShowTutorial(true)
      }

      // Load user data (empty for new users)
      // In a real app, this would fetch from an API
      setUserData(emptyUserData)
      setIsLoading(false)
    }
  }, [status, session, router])

  // Get display name from session or profile
  const displayName = session?.user?.name?.split(" ")[0] || "Learner"

  // Check if user has any data
  const hasCourses = userData.courses.length > 0
  const hasActivity = userData.weeklyActivity.some(v => v > 0)
  const hasEvents = userData.upcomingEvents.length > 0

  if (status === "loading" || isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-white/60">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Tutorial Overlay */}
      {showTutorial && session?.user?.email && (
        <TutorialOverlay
          userEmail={session.user.email}
          onComplete={() => setShowTutorial(false)}
        />
      )}

      <Sidebar />

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-y-auto bg-background-light dark:bg-background-dark">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur-md dark:border-[#2e2839] dark:bg-[#131118]/80">
          <div className="flex items-center gap-4 md:hidden">
            <button className="text-slate-500 hover:text-slate-900 dark:text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <span className="text-lg font-bold text-slate-900 dark:text-white">LearnAI</span>
          </div>

          {/* Search */}
          <div className="hidden flex-1 md:flex max-w-md">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="h-10 w-full rounded-xl border-none bg-slate-100 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary dark:bg-[#2e2839] dark:text-white dark:placeholder-[#a69db9]" placeholder="Search for courses, topics, or quizzes..." type="text" />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 hover:scale-105 dark:bg-[#2e2839] dark:text-white dark:hover:bg-[#3a3347]">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            {/* Dark Mode Toggle Simulation */}
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 hover:scale-105 dark:bg-[#2e2839] dark:text-white dark:hover:bg-[#3a3347]">
              <span className="material-symbols-outlined">dark_mode</span>
            </button>
            <div className="h-8 w-8 overflow-hidden rounded-full md:hidden">
              <div className="h-full w-full bg-gradient-to-br from-primary to-purple-400"></div>
            </div>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-10">
          {/* Welcome Section + Stats */}
          <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between animate-fade-in" data-tutorial="welcome">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">Welcome back, {displayName}! 👋</h2>
              <p className="text-slate-500 dark:text-[#a69db9]">
                {userStats.hoursStudied > 0
                  ? <>You&apos;ve learned for <span className="font-medium text-primary">{Math.round(userStats.hoursStudied * 60)} minutes</span> today. Keep it up!</>
                  : <>Start your learning journey today!</>
                }
              </p>
            </div>

            {/* Quick Stats Cards */}
            <div className="flex flex-wrap gap-4">
              {/* Streak */}
              <div className="flex min-w-[140px] flex-col gap-1 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-900/5 dark:bg-[#2e2839] dark:ring-white/10 animate-slide-up stagger-1 transition-all hover:scale-105 hover:shadow-lg">
                <div className="flex items-center gap-2 text-slate-500 dark:text-[#a69db9]">
                  <span className="material-symbols-outlined text-orange-500 fill">local_fire_department</span>
                  <span className="text-xs font-semibold uppercase tracking-wider">Daily Streak</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">{userStats.dailyStreak}</span>
                  <span className="text-sm font-medium text-slate-500 dark:text-[#a69db9]">Days</span>
                </div>
              </div>

              {/* Level */}
              <div className="flex min-w-[200px] flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-900/5 dark:bg-[#2e2839] dark:ring-white/10 animate-slide-up stagger-2 transition-all hover:scale-105 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-[#a69db9]">
                    <span className="material-symbols-outlined text-primary">military_tech</span>
                    <span className="text-xs font-semibold uppercase tracking-wider">Current Level</span>
                  </div>
                  <span className="text-xs font-bold text-primary">Lvl {userStats.currentLevel}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-[#a69db9]">
                    <span>XP Earned</span>
                    <span>{userStats.xpEarned} / {userStats.xpToNextLevel}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-[#1a1622]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-purple-400 transition-all duration-500"
                      style={{ width: `${(userStats.xpEarned / userStats.xpToNextLevel) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section data-tutorial="quick-actions" className="animate-fade-in-up stagger-1">
            <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Quick Actions</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/quiz/generator" className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl bg-primary p-6 text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] animate-scale-in stagger-1">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                </div>
                <div className="relative z-10 text-left">
                  <span className="block text-lg font-bold">Generate Quiz</span>
                  <span className="text-sm text-purple-100 opacity-90">Create a custom test from your notes instantly.</span>
                </div>
                {/* Decorational circle */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
              </Link>

              <Link href="/study/explanation" className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl bg-[#2e2839] p-6 text-white ring-1 ring-white/10 transition-all hover:bg-[#3a3347] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] animate-scale-in stagger-2">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6c2bee]/20 text-[#bf94ff] transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl">lightbulb</span>
                </div>
                <div className="relative z-10 text-left">
                  <span className="block text-lg font-bold">Explain Concept</span>
                  <span className="text-sm text-[#a69db9]">Stuck? Let AI simplify complex topics for you.</span>
                </div>
              </Link>

              <Link href="/create" className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl bg-[#2e2839] p-6 text-white ring-1 ring-white/10 transition-all hover:bg-[#3a3347] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] animate-scale-in stagger-3">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl">add_notes</span>
                </div>
                <div className="relative z-10 text-left">
                  <span className="block text-lg font-bold">New Note</span>
                  <span className="text-sm text-[#a69db9]">Start a fresh page for your lecture or study session.</span>
                </div>
              </Link>

              <Link href="/profile" className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl bg-[#2e2839] p-6 text-white ring-1 ring-white/10 transition-all hover:bg-[#3a3347] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] animate-scale-in stagger-4">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl">history</span>
                </div>
                <div className="relative z-10 text-left">
                  <span className="block text-lg font-bold">Review History</span>
                  <span className="text-sm text-[#a69db9]">Look back at what you covered yesterday.</span>
                </div>
              </Link>
            </div>
          </section>

          {/* Recommendations Grid */}
          <section data-tutorial="courses" className="animate-fade-in-up stagger-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Your Courses</h3>
              {hasCourses && (
                <Link className="text-sm font-medium text-primary hover:text-primary/80 transition-colors" href="/courses">View all</Link>
              )}
            </div>

            {hasCourses ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {userData.courses.map((course, index) => (
                  <div key={course.id} className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md hover:scale-[1.02] dark:bg-[#2e2839] dark:ring-white/10 animate-fade-in-up stagger-${index + 1}`}>
                    <div
                      className="h-32 w-full bg-cover bg-center"
                      style={{ backgroundImage: `url("${course.image}")` }}
                    >
                      <div className="flex h-full w-full items-start justify-between bg-black/40 p-4 backdrop-blur-[2px]">
                        <span className="rounded-lg bg-black/60 px-2 py-1 text-xs font-bold text-white backdrop-blur-md">{course.subject}</span>
                        <button className="rounded-full bg-white/20 p-1.5 text-white hover:bg-white/40 transition-colors">
                          <span className="material-symbols-outlined text-sm">bookmark</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h4 className="mb-1 text-lg font-bold text-slate-900 group-hover:text-primary dark:text-white transition-colors">{course.title}</h4>
                      <div className="mt-auto flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-[#1a1622]">
                          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5 dark:bg-[#2e2839] dark:ring-white/10">
                <EmptyState
                  icon="menu_book"
                  title="No courses yet"
                  description="Start your learning journey by creating your first course or enrolling in a recommended one."
                  actionLabel="Browse Courses"
                  actionHref="/courses"
                />
              </div>
            )}
          </section>

          {/* Recent Activity / Timeline */}
          <section className="grid gap-6 lg:grid-cols-3 animate-fade-in-up stagger-3" data-tutorial="activity">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-[#2e2839] dark:ring-white/10 lg:col-span-2 transition-all hover:shadow-lg">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Learning Activity</h3>
                <AnimatedDropdown
                  options={[
                    { value: "week", label: "This Week" },
                    { value: "month", label: "This Month" },
                  ]}
                  value={activityPeriod}
                  onChange={setActivityPeriod}
                />
              </div>

              {hasActivity ? (
                <div className="flex h-48 items-end gap-2 sm:gap-4">
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex h-full items-end justify-between gap-1">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                        <div key={day} className="group relative flex h-full w-full flex-col justify-end">
                          <div
                            className="w-full rounded-t bg-primary transition-all duration-500 hover:shadow-[0_0_15px_rgba(108,43,238,0.3)]"
                            style={{
                              height: `${userData.weeklyActivity[index]}%`,
                              animationDelay: `${index * 100}ms`
                            }}
                          ></div>
                          <span className="mt-2 text-center text-[10px] text-slate-400">{day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <EmptyState
                  icon="bar_chart"
                  title="No activity yet"
                  description="Complete your first lesson or quiz to see your learning activity here."
                  actionLabel="Start Learning"
                  actionHref="/courses"
                  className="py-8"
                />
              )}
            </div>

            {/* Upcoming */}
            <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-[#2e2839] dark:ring-white/10 lg:col-span-1 transition-all hover:shadow-lg">
              <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Up Next</h3>

              {hasEvents ? (
                <div className="flex flex-col gap-4">
                  {userData.upcomingEvents.map((event, index) => (
                    <div key={event.id} className={`flex items-center gap-3 animate-slide-up stagger-${index + 1}`}>
                      <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl transition-all hover:scale-110 ${event.type === "quiz" ? "bg-orange-500/10 text-orange-500" :
                          event.type === "group" ? "bg-blue-500/10 text-blue-500" :
                            "bg-red-500/10 text-red-500"
                        }`}>
                        <span className="material-symbols-outlined">
                          {event.type === "quiz" ? "event_note" : event.type === "group" ? "group" : "schedule"}
                        </span>
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white">{event.title}</h5>
                        <p className="text-xs text-slate-500 dark:text-[#a69db9]">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="event"
                  title="No upcoming events"
                  description="Schedule quizzes and study sessions to stay on track."
                  actionLabel="Schedule Event"
                  actionHref="/schedule"
                  className="py-6"
                />
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Navigation Bottom Bar (Visible on small screens) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-gray-200 bg-white dark:border-[#2e2839] dark:bg-[#131118] md:hidden">
        <Link className="flex flex-col items-center gap-1 text-primary transition-transform hover:scale-110" href="/dashboard">
          <span className="material-symbols-outlined fill text-xl">dashboard</span>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-slate-500 dark:text-[#a69db9] transition-transform hover:scale-110" href="/courses">
          <span className="material-symbols-outlined text-xl">menu_book</span>
          <span className="text-[10px] font-medium">Courses</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-slate-500 dark:text-[#a69db9] transition-transform hover:scale-110" href="/study/explanation">
          <span className="material-symbols-outlined text-xl">psychology</span>
          <span className="text-[10px] font-medium">AI Tutor</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-slate-500 dark:text-[#a69db9] transition-transform hover:scale-110" href="/profile">
          <span className="material-symbols-outlined text-xl">person</span>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>
    </div>
  )
}
