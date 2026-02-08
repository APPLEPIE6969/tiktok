"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/Input"
import Link from "next/link"

export default function Onboarding() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [name, setName] = useState("")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name)
    }
  }, [session])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptedTerms) return

    setLoading(true)

    // Simulate API call to save user profile
    // In a real app, this would POST to /api/user/update

    // For this demo, we save to localStorage to "remember" the user completed onboarding
    if (session?.user?.email) {
        localStorage.setItem(`user_onboarded_${session.user.email}`, "true")
        localStorage.setItem(`user_name_${session.user.email}`, name)
    }

    setTimeout(() => {
      router.push("/dashboard")
    }, 800)
  }

  if (status === "loading") return <div className="flex h-screen items-center justify-center bg-background-dark text-white">Loading...</div>
  if (status === "unauthenticated") {
      router.push("/login")
      return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1f1c27] rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Complete Your Profile</h1>
        <p className="text-slate-500 dark:text-[#a69db9] mb-6">Tell us a bit about yourself to get started.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-white">Full Name</label>
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
            />
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-4 h-4 border border-slate-300 rounded bg-slate-50 focus:ring-3 focus:ring-primary/50 dark:bg-slate-700 dark:border-slate-600 dark:focus:ring-primary/60 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label htmlFor="terms" className="text-sm font-medium text-slate-900 dark:text-gray-300">
              I accept the <Link href="/terms" className="text-primary hover:underline">Terms and Conditions</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={!acceptedTerms || !name || loading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? "Creating Account..." : "Complete Setup"}
          </button>
        </form>
      </div>
    </div>
  )
}
