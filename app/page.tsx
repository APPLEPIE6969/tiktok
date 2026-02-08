"use client"

import { Navbar } from "@/components/Navbar"
import Link from "next/link"

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-glow-purple rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-glow-blue rounded-full blur-3xl opacity-40"></div>
      </div>

      <Navbar />

      <main className="relative z-10 flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="relative pt-16 pb-20 px-4 md:pt-24 md:pb-32 lg:px-10">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              New: AI Tutor v2.0 Live
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 max-w-4xl">
              Learn Anything, <br className="hidden md:block" />
              <span className="text-gradient">Powered by AI</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed">
              Unlock your potential with personalized learning paths, instant feedback, and quizzes generated just for you. Master any subject 10x faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link href="/signup" className="flex h-12 md:h-14 px-8 items-center justify-center rounded-xl bg-primary hover:bg-primary/90 text-white text-base md:text-lg font-bold shadow-xl shadow-primary/25 transition-all hover:-translate-y-1">
                <span className="mr-2">Get Started for Free</span>
                <span className="material-symbols-outlined">rocket_launch</span>
              </Link>
              <Link href="#" className="flex h-12 md:h-14 px-8 items-center justify-center rounded-xl bg-white dark:bg-[#2e2839] border border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-900 dark:text-white text-base md:text-lg font-bold transition-all hover:-translate-y-1">
                <span className="mr-2">View Demo</span>
                <span className="material-symbols-outlined">play_circle</span>
              </Link>
            </div>

            {/* Hero Visual / Dashboard Preview */}
            <div className="mt-16 w-full max-w-5xl relative group perspective-1000">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-700 overflow-hidden shadow-2xl">
                {/* Placeholder for dashboard UI */}
                <div
                  className="aspect-[16/9] w-full bg-cover bg-center"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYrTC_3JvqGtb_LxgrczRTuj440FbxKWOFH-xHbbJY301YA_IFg-jEALOvMRyJh_H5O9H3FOo1k2aYfFbC6mM5riTHESh_PJKOjZBAkNBHb6XoeyFyj4YEbbyANJqdduY_CunKKBwo9puQDxWFmwV-RV4sRH8Stounzg6201o4SEScYYbk17_7MfBPHFVTPbR7MhhB64GaDn50GVSl2SL686xzaaJabrrRna1NvC_YyMDkEVhkPO5uJRK5IlXWia3fiTKD8BELF7qd")' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-left">
                    <div className="glass-panel inline-block p-4 rounded-xl max-w-md animate-pulse">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="size-6 rounded-full bg-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-[14px] text-white">smart_toy</span>
                        </div>
                        <span className="text-xs font-bold text-slate-300">StudyFlow Assistant</span>
                      </div>
                      <p className="text-sm text-white">I&apos;ve analyzed your recent quiz on Quantum Physics. You&apos;re strong on &quot;Wave functions&quot; but could use a refresher on &quot;Entanglement&quot;. Shall we start a mini-lesson?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-16 text-center">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-6">Trusted by learners from top institutions</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-xl font-bold font-display text-slate-400">MIT</span>
                <span className="text-xl font-bold font-display text-slate-400">Stanford</span>
                <span className="text-xl font-bold font-display text-slate-400">Harvard</span>
                <span className="text-xl font-bold font-display text-slate-400">Berkeley</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 md:px-10 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Supercharge Your Learning</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">Experience the future of education with our cutting-edge AI tools designed to help you master any subject faster and retain more.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Feature 1 */}
              <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6 hover:bg-slate-800/50 transition-colors group border-t-4 border-t-primary">
                <div className="size-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl">quiz</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">AI Quiz Maker</h3>
                  <p className="text-slate-400 leading-relaxed">Turn any text, article, PDF, or YouTube video into a comprehensive quiz in seconds. Test your knowledge instantly.</p>
                </div>
                <div className="mt-auto pt-4">
                  <div className="h-32 w-full rounded-lg overflow-hidden relative">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxFSzE2nTtGJ730180oXuUc2V5Br5CbCF3NPhB6a_Qk0vDQws5JzCJGtFUIQJuTr-wjhy48EzcY_EXsdB0zU7yDznBsNKHbkCawUR9dPXkpIl9JA88W15hnrarLxgUBXie1kmZ3y1HVLb6M1FGUaunVezsNH_uvyZr549GZYsT0aJxiN2s7C1VNC8u_r5xKwIfj_w0Hh5gJQPqhkq_8s5hgWNFNViQIbOySbxuO7Arlw4csKjCGFRN2mueiE_jCMV4ZIMYC6f2XTwr")' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6 hover:bg-slate-800/50 transition-colors group border-t-4 border-t-blue-500">
                <div className="size-14 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl">psychology_alt</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">Smart Explanations</h3>
                  <p className="text-slate-400 leading-relaxed">Stuck on a difficult concept? Get instant, simplified breakdowns, analogies, and examples tailored to your level.</p>
                </div>
                <div className="mt-auto pt-4">
                  <div className="h-32 w-full rounded-lg overflow-hidden relative">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBmfraApMO97qaqBmwZ-wMMk8DuRXD64PAWmFtAvY-7veAW9WKvdkNMn1_UAx5zVuwwMipD3OnGErcvupDV4fepWh5MFtIlnQgNtFrq7t0XMsje37YydKWzeagdbEDgOMn9iibhFoWyJgieo__G7p9UPzR2QadeNgUTfSNWEYp0Hx6dt5qumU20ngqOigzHbjs0PaRvKrB9t1CKUk8cu1NqBgBkEADI-nX8AIz9rAMiKSoUaJSnCZQEweG2sBSVaPk-YlK3teJ_qDaW")' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6 hover:bg-slate-800/50 transition-colors group border-t-4 border-t-purple-500">
                <div className="size-14 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl">trending_up</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">Adaptive Learning</h3>
                  <p className="text-slate-400 leading-relaxed">A dynamic curriculum that evolves in real-time. The AI identifies your weak spots and adjusts future lessons automatically.</p>
                </div>
                <div className="mt-auto pt-4">
                  <div className="h-32 w-full rounded-lg overflow-hidden relative">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAGG7s5jNHsosjGbg88EyEE4ncQuQY4uYnG72vmupQHVSkp9mlhGhwmyJUHnjhq1sT3zyxluZOOltNzxJQVrYWTYZGGyltlpXQXdLap3wl4qhdinClR94E4oPhgmeBCIc1nf4_oApykw2FzJMJR0G9nbxp_Fdph2H5FaWaJCGvdzYM9tJJH1wXNDMPYHBPHOkcrhmKg9MM5J98EqGtfHFchXWOd54uhk6283TyydmB16d5JFIOWjo68jTXYr3k-mchmmrCx_CJPRgam")' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Large Visual Breaker */}
        <section className="w-full py-10 px-4">
          <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative h-[400px] md:h-[500px] flex items-center justify-center">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDKEAbkPcl7yGQeHiCM3tUrtcdrW0zK71fPVkOcMjNE8kUyLsHbb43NrJtC7eTK9jV0Ou34zEr1hisHv9p43m2kBwBy-pbj3RuJ6acnChaPxcDiWOJED0OKd1azdQ8uYPRe1zlTQ-UUT8WXTMMII5LeCcN6kOQlDH-kPuoMROffTmqxMCBVjFHPcWQSDYyXTgubPhNwd0GkweyGIC0MFGsdmhDwf7IpCX_ft7iAbS6-GnV_t_J1bpbCb5H2BPGrVd9JXVisqG22Fm6r")' }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 to-background-dark/40"></div>
            <div className="relative z-10 max-w-2xl text-center md:text-left md:mr-auto md:ml-20 px-6">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Learning is better together.</h2>
              <p className="text-lg text-slate-300 mb-8">Share your AI-generated quizzes with friends, challenge them to beat your score, and learn collaboratively.</p>
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors">
                  Explore Community Features
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-10 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10 glass-panel border border-slate-700 p-10 md:p-16 rounded-3xl">
            <span className="material-symbols-outlined text-6xl text-primary mb-6">verified</span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">Ready to start your journey?</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Join thousands of learners mastering new skills every day with Lumina AI. No credit card required to start.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="flex h-12 px-8 items-center justify-center rounded-xl bg-primary hover:bg-primary/90 text-white text-base font-bold transition-all hover:shadow-lg hover:shadow-primary/40">
                  Get Started for Free
              </Link>
              <button className="flex h-12 px-8 items-center justify-center rounded-xl bg-transparent border border-slate-600 hover:border-white text-white text-base font-bold transition-all">
                  View Pricing
              </button>
            </div>
            <p className="mt-6 text-sm text-slate-500">Free 14-day trial on Pro plans. Cancel anytime.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#131118] border-t border-[#2e2839] py-12 px-4 md:px-10 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            <span className="font-bold text-white text-lg">StudyFlow</span>
          </div>
          <div className="flex gap-8 flex-wrap justify-center">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Support</a>
            <a className="hover:text-primary transition-colors" href="#">Twitter</a>
          </div>
          <div>
              © 2023 StudyFlow Inc.
          </div>
        </div>
      </footer>
    </div>
  )
}
