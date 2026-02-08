"use client"

import Link from "next/link"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Suspense } from "react"

function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"

  return (
    <div className="flex flex-col gap-5">
            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => signIn("google", { callbackUrl })}
                className="flex items-center justify-center gap-3 bg-white dark:bg-[#1f1c27] border border-gray-200 dark:border-[#433b54] hover:bg-gray-50 dark:hover:bg-[#2a2635] text-slate-700 dark:text-white py-3 px-4 rounded-xl transition-all font-medium text-sm group"
                type="button"
              >
                <Image alt="Google Logo" width={20} height={20} src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4UqHnsxUlLRTM3uM8G8z1bcj_rMUSU8tyQYPgQEBd0AI9qfWz2_YZv4aKuojT2k1mj2NOX0tznKM_mTH6Zc3zXdUqAspbhAGunfBWQbagOspg7ebQh_U_LmhEgJcin-xwIxWCc0lGQ8SYx_FWbzXJNFfsrDPZL3GW6fNSu9vj2NE9Ni1T4cQM6Qre581-YOBPhpDuaBwmFmatgJ5v3v1eEoj-bM0ead0EloKI4F334LSSqOe6G3rIHTtN5rzVNs63_MDrd00TrLnT"/>
                <span>Google</span>
              </button>
              <button
                onClick={() => signIn("github", { callbackUrl })}
                className="flex items-center justify-center gap-3 bg-white dark:bg-[#1f1c27] border border-gray-200 dark:border-[#433b54] hover:bg-gray-50 dark:hover:bg-[#2a2635] text-slate-700 dark:text-white py-3 px-4 rounded-xl transition-all font-medium text-sm"
                type="button"
              >
                <Image alt="GitHub Logo" className="dark:invert" width={20} height={20} src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9schCEOuNUhue2lHXVkeYKic9D53MXAIjHWwahQCG01tEz82xgtYH2UEzFkDqRtWQdq2JiRLx5L3vp7NxiVoFy1Nc07YhprEUIb6SpxMXnvE9OkFH1q8jytj3-EuaaZzf3A_JBtJlB6WUTLl1nVlmVQtXobUgwgX83mKPuOOWgv8IjALD_XK5Eb3Y7U2jyUID6C-UxO8HoFhJYFrO-iVhu3xCtxKaI_b6vIUCtQzWMhZuxxpB7tPYNfgOB2N6eowUK9UfpcCyvfY_" />
                <span>GitHub</span>
              </button>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200 dark:border-[#433b54]"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">Or continue with</span>
              <div className="flex-grow border-t border-gray-200 dark:border-[#433b54]"></div>
            </div>

            {/* Inputs (Mock for Email/Password) */}
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); }}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-gray-300" htmlFor="email">Email address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors text-[20px]">mail</span>
                  </div>
                  <input className="w-full h-12 pl-11 pr-4 bg-gray-50 dark:bg-[#1f1c27] border border-gray-200 dark:border-[#433b54] rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400" id="email" placeholder="name@example.com" type="email" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-700 dark:text-gray-300" htmlFor="password">Password</label>
                  <Link className="text-sm font-semibold text-primary hover:text-purple-400 transition-colors" href="#">Forgot password?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors text-[20px]">lock</span>
                  </div>
                  <input className="w-full h-12 pl-11 pr-4 bg-gray-50 dark:bg-[#1f1c27] border border-gray-200 dark:border-[#433b54] rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400" id="password" placeholder="••••••••" type="password" />
                  <button className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors" type="button">
                    <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full bg-primary hover:bg-purple-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-primary/25 transition-all transform active:scale-[0.98] mt-2 flex items-center justify-center gap-2 group" type="submit">
                Sign In
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Don&apos;t have an account?
              <Link className="font-bold text-primary hover:text-purple-400 transition-colors ml-1" href="#">Sign up for free</Link>
            </p>
          </div>
  )
}

export default function Login() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-hidden">
      {/* Left Panel: Visual & Testimonial */}
      <div className="relative lg:w-1/2 w-full bg-background-dark flex flex-col justify-between p-8 lg:p-16 overflow-hidden">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 w-full h-full bg-[#161022]">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[80px]"></div>
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        </div>

        {/* Logo Area */}
        <div className="relative z-10 flex items-center gap-2 mb-10">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">LearnAI</span>
        </div>

        {/* Content Area */}
        <div className="relative z-10 flex flex-col gap-8 max-w-lg">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-white mb-6">
              Master any subject with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Intelligence</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Join thousands of students who are accelerating their learning curve with our AI-powered personalized quizzes and study plans.
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex gap-1 mb-4 text-yellow-400">
              <span className="material-symbols-outlined text-[20px] fill">star</span>
              <span className="material-symbols-outlined text-[20px] fill">star</span>
              <span className="material-symbols-outlined text-[20px] fill">star</span>
              <span className="material-symbols-outlined text-[20px] fill">star</span>
              <span className="material-symbols-outlined text-[20px] fill">star</span>
            </div>
            <p className="text-gray-200 text-base leading-relaxed mb-6 font-medium">
              &quot;This platform helped me ace my calculus finals in half the time. The AI quizzes adapt to my weak spots perfectly. It&apos;s like having a private tutor 24/7.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div
                className="h-12 w-12 rounded-full bg-gray-700 bg-center bg-cover border-2 border-primary/50"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCnb_ZIRjX_IAmfkASq7IPPcE3vAHqIOxL1ZeCtYay2-lyGo2OJF0UVC19ArQ7FYlwtDcoc3EAhG4--XnBSStuCEC57zoPOaJ1VrD8ag95HZ-SLsF1sIeetu9yMLM-NNj9DmoAN2LBUpARadT-1_G7chvva4bqV0_3kyMhrna1gV13L76dY6nKWHKqZHVfZXTmR9wmNQmlohdzW8KHmGDL4zzdb_3j4F6NHgHg_bKq-bDk79WVHb733nbHH5gaUGmurUEI0UyBd57r9")' }}
              ></div>
              <div>
                <p className="text-white font-bold text-sm">Sarah Jenkins</p>
                <p className="text-gray-400 text-xs">Computer Science Student, MIT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer links for left side */}
        <div className="relative z-10 mt-10 lg:mt-0 hidden lg:flex gap-6 text-sm text-gray-400">
          <Link className="hover:text-white transition-colors" href="#">Privacy Policy</Link>
          <Link className="hover:text-white transition-colors" href="#">Terms of Service</Link>
        </div>
      </div>

      {/* Right Panel: Authentication Form */}
      <div className="lg:w-1/2 w-full bg-background-light dark:bg-[#131118] flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-[420px] flex flex-col">
          {/* Tab Switcher */}
          <div className="flex w-full bg-gray-200 dark:bg-[#1f1c27] p-1 rounded-xl mb-8">
            <button className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-white dark:bg-primary text-slate-900 dark:text-white shadow-sm transition-all">
              Sign In
            </button>
            <button className="flex-1 py-2.5 text-sm font-semibold rounded-lg text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all">
              Sign Up
            </button>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Welcome back</h2>
            <p className="text-gray-500 dark:text-[#a69db9]">Enter your details to access your dashboard.</p>
          </div>

          {/* Form */}
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>

        {/* Mobile footer links */}
        <div className="absolute bottom-6 left-0 w-full flex justify-center gap-6 text-xs text-gray-500 lg:hidden">
          <Link className="hover:text-slate-900 dark:hover:text-white" href="#">Privacy</Link>
          <Link className="hover:text-slate-900 dark:hover:text-white" href="#">Terms</Link>
        </div>
      </div>
    </div>
  )
}
