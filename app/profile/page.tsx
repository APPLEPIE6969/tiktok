"use client"

import { Sidebar } from "@/components/Sidebar"
import Link from "next/link"

export default function Profile() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col overflow-y-auto bg-background-light dark:bg-background-dark">
        {/* Header (Dashboard Style for consistency) */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur-md dark:border-[#2e2839] dark:bg-[#131118]/80">
          <div className="flex items-center gap-4 md:hidden">
            <button className="text-slate-500 hover:text-slate-900 dark:text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <span className="text-lg font-bold text-slate-900 dark:text-white">LearnAI</span>
          </div>
          <div className="hidden flex-1 md:flex max-w-md">
             {/* Empty spacer or search */}
          </div>
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-[#2e2839] dark:text-white dark:hover:bg-[#3a3347]">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-[#2e2839] dark:text-white dark:hover:bg-[#3a3347]">
              <span className="material-symbols-outlined">dark_mode</span>
            </button>
            <div className="h-8 w-8 overflow-hidden rounded-full md:hidden">
               <div className="h-full w-full bg-gradient-to-br from-primary to-purple-400"></div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex justify-center py-8 px-4 md:px-10">
          <div className="w-full max-w-[1200px] flex flex-col gap-8">
            {/* Profile Header Section */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between p-6 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-lg">
              <div className="flex gap-6 items-center">
                <div className="relative group cursor-pointer">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-24 w-24 md:h-32 md:w-32 ring-4 ring-slate-100 dark:ring-slate-800"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD7EgS_RZj3LHF3IHzip5AErl9X2ya6nJnJ0Gh8NDiYlGCCIivO7JdpWaNdFImjOg9t_WnX9r5xZyLo0WmD4eB_Jlp9uzZOXotFpWHY9-94EdxO_hwrkwpQ0Dx7jFdZEpOd5cYrAtFpehuEzEXZNCBh6Ki5wtquJXyv8aUJNkKCgWTjhwZEeLjj5nuldBIF-Av3juUcEH3SAH92Nqix6ijZ-wp08OrRn2Nybtd-lCoJXs06dNPmbQAGULqTOyAEIlKTsL67-6g1mqcE")' }}
                  ></div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white">edit</span>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-primary text-white p-1 rounded-full border-2 border-white dark:border-card-dark">
                    <span className="material-symbols-outlined text-sm">verified</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight">Alex Johnson</h1>
                  <p className="text-slate-500 dark:text-text-secondary text-base mt-1">AI Learning Enthusiast | Pro Member</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-slate-500 dark:text-text-secondary">
                    <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                    <span>Joined Jan 2023</span>
                    <span className="mx-1">•</span>
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-all">
                  <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                  Manage Subscription
                </button>
                <button className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white px-6 py-2.5 rounded-lg font-medium transition-all border border-slate-200 dark:border-white/10">
                  <span className="material-symbols-outlined text-[20px]">share</span>
                  Share Profile
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1 rounded-xl p-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-6xl text-primary">quiz</span>
                </div>
                <p className="text-slate-500 dark:text-text-secondary text-sm font-medium uppercase tracking-wider">Total Quizzes</p>
                <div className="flex items-baseline gap-3 mt-1">
                  <p className="text-slate-900 dark:text-white text-3xl font-bold">142</p>
                  <span className="text-[#0bda6f] bg-[#0bda6f]/10 px-2 py-0.5 rounded text-xs font-bold">+12%</span>
                </div>
                <p className="text-slate-500 dark:text-text-secondary text-xs mt-2">Top 5% of learners this week</p>
              </div>
              <div className="flex flex-col gap-1 rounded-xl p-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-6xl text-primary">target</span>
                </div>
                <p className="text-slate-500 dark:text-text-secondary text-sm font-medium uppercase tracking-wider">Accuracy Score</p>
                <div className="flex items-baseline gap-3 mt-1">
                  <p className="text-slate-900 dark:text-white text-3xl font-bold">88%</p>
                  <span className="text-[#0bda6f] bg-[#0bda6f]/10 px-2 py-0.5 rounded text-xs font-bold">+2.5%</span>
                </div>
                <p className="text-slate-500 dark:text-text-secondary text-xs mt-2">Consistent improvement in logic</p>
              </div>
              <div className="flex flex-col gap-1 rounded-xl p-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-6xl text-primary">schedule</span>
                </div>
                <p className="text-slate-500 dark:text-text-secondary text-sm font-medium uppercase tracking-wider">Hours Studied</p>
                <div className="flex items-baseline gap-3 mt-1">
                  <p className="text-slate-900 dark:text-white text-3xl font-bold">320h</p>
                  <span className="text-[#0bda6f] bg-[#0bda6f]/10 px-2 py-0.5 rounded text-xs font-bold">+15h</span>
                </div>
                <p className="text-slate-500 dark:text-text-secondary text-xs mt-2">Daily average: 1h 45m</p>
              </div>
            </div>

            {/* Main Content Split Layout */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Tabs */}
              <aside className="w-full lg:w-64 shrink-0">
                <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                  <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium border-l-4 border-primary transition-all whitespace-nowrap" href="#">
                    <span className="material-symbols-outlined">dashboard</span>
                    Overview
                  </a>
                  <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all whitespace-nowrap group" href="#">
                    <span className="material-symbols-outlined group-hover:text-slate-900 dark:group-hover:text-white transition-colors">history</span>
                    History
                  </a>
                  <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all whitespace-nowrap group" href="#">
                    <span className="material-symbols-outlined group-hover:text-slate-900 dark:group-hover:text-white transition-colors">bookmark</span>
                    Bookmarks
                    <span className="ml-auto bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
                  </a>
                  <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all whitespace-nowrap group" href="#">
                    <span className="material-symbols-outlined group-hover:text-slate-900 dark:group-hover:text-white transition-colors">folder_special</span>
                    Saved Quizzes
                  </a>
                  <div className="h-px bg-slate-200 dark:bg-slate-800 my-2 hidden lg:block"></div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-text-secondary uppercase tracking-wider px-4 py-2 hidden lg:block">Settings</p>
                  <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all whitespace-nowrap group" href="#">
                    <span className="material-symbols-outlined group-hover:text-slate-900 dark:group-hover:text-white transition-colors">settings</span>
                    App Settings
                  </a>
                  <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all whitespace-nowrap group" href="#">
                    <span className="material-symbols-outlined group-hover:text-slate-900 dark:group-hover:text-white transition-colors">credit_card</span>
                    Subscription
                  </a>
                </nav>
              </aside>

              {/* Tab Content Area */}
              <div className="flex-1 flex flex-col gap-8">
                {/* Saved / Recent Section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold">Continue Learning</h3>
                    <Link className="text-primary text-sm font-medium hover:underline" href="#">View All</Link>
                  </div>
                  <div className="space-y-3">
                    {/* List Item 1 */}
                    <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                          <span className="material-symbols-outlined">psychology</span>
                        </div>
                        <div>
                          <h4 className="text-slate-900 dark:text-white font-semibold group-hover:text-primary transition-colors">Advanced Neural Networks</h4>
                          <p className="text-slate-500 dark:text-text-secondary text-sm">Last accessed 2 hours ago • 65% Complete</p>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-center gap-4 w-full sm:w-auto">
                        <div className="flex-1 sm:w-32 h-2 bg-slate-100 dark:bg-background-dark rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[65%] rounded-full"></div>
                        </div>
                        <button className="text-slate-900 dark:text-white bg-primary/10 dark:bg-primary/20 hover:bg-primary hover:text-white p-2 rounded-lg transition-colors">
                          <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                        </button>
                      </div>
                    </div>
                    {/* List Item 2 */}
                    <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                          <span className="material-symbols-outlined">code</span>
                        </div>
                        <div>
                          <h4 className="text-slate-900 dark:text-white font-semibold group-hover:text-primary transition-colors">Python Data Structures</h4>
                          <p className="text-slate-500 dark:text-text-secondary text-sm">Last accessed yesterday • 20% Complete</p>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-center gap-4 w-full sm:w-auto">
                        <div className="flex-1 sm:w-32 h-2 bg-slate-100 dark:bg-background-dark rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[20%] rounded-full"></div>
                        </div>
                        <button className="text-slate-900 dark:text-white bg-primary/10 dark:bg-primary/20 hover:bg-primary hover:text-white p-2 rounded-lg transition-colors">
                          <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Settings Panel */}
                <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl p-6">
                  <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6">Preferences</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-background-dark text-slate-500 dark:text-text-secondary">
                          <span className="material-symbols-outlined">dark_mode</span>
                        </div>
                        <div>
                          <p className="text-slate-900 dark:text-white font-medium">Dark Mode</p>
                          <p className="text-slate-500 dark:text-text-secondary text-sm">Adjust the appearance of the app</p>
                        </div>
                      </div>
                      {/* Toggle Switch */}
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="h-px bg-slate-200 dark:bg-slate-800 w-full"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-background-dark text-slate-500 dark:text-text-secondary">
                          <span className="material-symbols-outlined">notifications</span>
                        </div>
                        <div>
                          <p className="text-slate-900 dark:text-white font-medium">Email Notifications</p>
                          <p className="text-slate-500 dark:text-text-secondary text-sm">Receive daily summary and study reminders</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="h-px bg-slate-200 dark:bg-slate-800 w-full"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-background-dark text-slate-500 dark:text-text-secondary">
                          <span className="material-symbols-outlined">language</span>
                        </div>
                        <div>
                          <p className="text-slate-900 dark:text-white font-medium">Language</p>
                          <p className="text-slate-500 dark:text-text-secondary text-sm">Select your preferred language</p>
                        </div>
                      </div>
                      <select className="bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5">
                        <option selected>English (US)</option>
                        <option value="ES">Spanish</option>
                        <option value="FR">French</option>
                        <option value="DE">German</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Danger Zone */}
                <section className="opacity-80">
                  <h3 className="text-red-500 dark:text-red-400 text-sm font-bold uppercase tracking-wider mb-3">Danger Zone</h3>
                  <div className="border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-slate-900 dark:text-white font-medium">Delete Account</p>
                      <p className="text-slate-500 dark:text-text-secondary text-sm">Permanently delete your account and all data.</p>
                    </div>
                    <button className="text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                      Delete Account
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
