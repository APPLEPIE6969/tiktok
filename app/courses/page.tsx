"use client"

import { Sidebar } from "@/components/Sidebar"
import { EmptyState } from "@/components/EmptyState"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { isOnboardingComplete } from "@/lib/userStore"
import Link from "next/link"

// Course data structure
interface Course {
  id: string
  title: string
  subject: string
  description: string
  progress: number
  image: string
  lessonsCompleted: number
  totalLessons: number
}

export default function Courses() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    if (status === "authenticated" && session?.user?.email) {
      if (!isOnboardingComplete(session.user.email)) {
        router.push("/onboarding")
        return
      }

      // Load user's courses (empty for new users)
      // In a real app, this would fetch from an API
      setCourses([])
      setIsLoading(false)
    }
  }, [status, session, router])

  if (status === "loading" || isLoading) {
    return (
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark p-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">My Courses</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e2839] rounded-xl overflow-hidden">
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

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white animate-fade-in">My Courses</h1>
          {courses.length > 0 && (
            <Link
              href="/courses/create"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:scale-105"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              New Course
            </Link>
          )}
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className={`group bg-white dark:bg-[#2e2839] border border-slate-200 dark:border-[#3a3347] rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer animate-fade-in-up stagger-${index + 1}`}
              >
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url("${course.image}")` }}
                >
                  <div className="flex h-full w-full items-start justify-between bg-black/40 p-4 backdrop-blur-[2px]">
                    <span className="rounded-lg bg-black/60 px-2 py-1 text-xs font-bold text-white backdrop-blur-md">
                      {course.subject}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-[#a69db9] line-clamp-2 mb-4">
                    {course.description}
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                      <span>{course.lessonsCompleted} / {course.totalLessons} lessons</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-[#1a1622]">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="rounded-2xl bg-white dark:bg-[#2e2839] shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 max-w-md w-full">
              <EmptyState
                icon="school"
                title="No courses yet"
                description="Start your learning journey by creating your first course or explore our recommendations."
                actionLabel="Create Course"
                actionHref="/courses/create"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
