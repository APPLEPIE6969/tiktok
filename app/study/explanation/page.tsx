"use client"

import Link from "next/link"
import { useState } from "react"

export default function SmartExplanation() {
  const [query, setQuery] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'ai', content: string}>>([])
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!query.trim()) return;

    const userMessage = query;
    setQuery("");
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
        const response = await fetch("/api/tutor/explain", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: userMessage,
                context: "Physics 101: Light & Optics", // Context from page
                provider: "groq" // Use Groq for speed as per user suggestion
            })
        });
        const data = await response.json();
        setChatHistory(prev => [...prev, { role: 'ai', content: data.explanation }]);
    } catch (error) {
        console.error("Chat error", error);
        setChatHistory(prev => [...prev, { role: 'ai', content: "Sorry, I couldn't process that request." }]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-primary selection:text-white">
      {/* Header / TopNavBar */}
      <header className="flex-none flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#2e2839] bg-[#131118] px-6 py-3 z-20">
        <div className="flex items-center gap-4 text-white">
          <div className="size-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <Link href="/dashboard" className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">AI Smart Tutor</Link>
        </div>
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <div className="w-full bg-[#2e2839] rounded-full h-2 overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '50%' }}></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-[#a69db9]">
            <span>Topic 5/10</span>
            <span>Physics 101</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center justify-center rounded-xl size-10 bg-[#2e2839] hover:bg-[#3e364d] text-white transition-colors">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button className="flex items-center justify-center rounded-xl size-10 bg-[#2e2839] hover:bg-[#3e364d] text-white transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-purple-400 p-[2px]">
            <div
                className="h-full w-full rounded-xl bg-cover bg-center"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3cWdsvMCOCmmJyf6F7gEAabt8wWAisVLduyUWxE5fzMOzfxnyVecQ-JNqzJDAGyPgJmFN1qW9yxe6fUO1LWuEbUwX0splaIOetbeSS8ia01Qo7l8kjmgXcly4yHqCrZ1H5v27A6LZawavWvdvLyvsRR5oVNcN_wyxRRvP3HWSd4Xg9tWRAeZsVJIhD9lfYG4ufrsxhMHUtdnt-kiplw2x34D88UH0e2CVs-GvN-2p2cfrbJcwqWQ8fpVqouCMj0OsVDVqDvfttFFY")' }}
            ></div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar / Navigation (Collapsed on small screens) */}
        <aside className="w-20 lg:w-64 flex-none border-r border-[#2e2839] bg-[#131118] hidden md:flex flex-col py-6 gap-2">
          <div className="px-4 mb-4 hidden lg:block">
            <h3 className="text-[#a69db9] text-xs font-bold uppercase tracking-wider mb-2">Current Module</h3>
            <p className="text-white font-semibold">Light &amp; Optics</p>
          </div>
          <nav className="flex flex-col gap-1 px-2">
            <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-[#a69db9] hover:text-white hover:bg-[#2e2839] transition-colors" href="#">
              <span className="material-symbols-outlined">check_circle</span>
              <span className="hidden lg:block text-sm font-medium">1. Introduction to Light</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-[#a69db9] hover:text-white hover:bg-[#2e2839] transition-colors" href="#">
              <span className="material-symbols-outlined">check_circle</span>
              <span className="hidden lg:block text-sm font-medium">2. Reflection</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-[#a69db9] hover:text-white hover:bg-[#2e2839] transition-colors" href="#">
              <span className="material-symbols-outlined">check_circle</span>
              <span className="hidden lg:block text-sm font-medium">3. Refraction</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-[#a69db9] hover:text-white hover:bg-[#2e2839] transition-colors" href="#">
              <span className="material-symbols-outlined">check_circle</span>
              <span className="hidden lg:block text-sm font-medium">4. Dispersion</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20" href="#">
              <span className="material-symbols-outlined">play_circle</span>
              <span className="hidden lg:block text-sm font-bold">5. Scattering (Current)</span>
            </a>
          </nav>
          <div className="mt-auto px-4">
            <div className="bg-gradient-to-br from-[#2e2839] to-[#1e182a] p-4 rounded-xl border border-[#433b54]">
              <div className="flex items-center gap-2 mb-2 text-white">
                <span className="material-symbols-outlined text-yellow-400">emoji_events</span>
                <span className="text-sm font-bold hidden lg:block">Daily Streak</span>
              </div>
              <p className="text-xs text-[#a69db9] hidden lg:block">You&apos;re on a 5-day learning streak! Keep it up.</p>
            </div>
          </div>
        </aside>

        {/* Main Content Scroll Area */}
        <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-8 lg:px-12">
          <div className="max-w-5xl mx-auto flex flex-col gap-6 pb-20">
            {/* Question Card */}
            <div className="bg-surface-card rounded-xl p-6 border border-[#2e2839] shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-8xl text-white">psychology_alt</span>
              </div>
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2 text-[#a69db9] text-sm font-medium">
                  <span className="bg-[#2e2839] px-2 py-1 rounded text-xs">DIFFICULTY: MEDIUM</span>
                  <span>•</span>
                  <span>Question 5 of 10</span>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 relative z-10 leading-snug">
                Why does the sky appear blue to the human eye?
              </h1>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex gap-4 items-start relative z-10">
                <div className="bg-red-500/20 p-2 rounded-full text-red-400 shrink-0">
                  <span className="material-symbols-outlined">close</span>
                </div>
                <div>
                  <p className="text-xs text-red-400 font-bold uppercase tracking-wider mb-1">Your Answer</p>
                  <p className="text-white font-medium">Because it reflects the color of the ocean.</p>
                </div>
              </div>
            </div>

            {/* Mistake Analysis (Why it's wrong) */}
            <div className="bg-[#2e2839]/50 border-l-4 border-yellow-500 rounded-r-xl p-5 flex flex-col md:flex-row gap-5 items-center shadow-sm">
              <div className="shrink-0 flex items-center justify-center size-12 rounded-full bg-yellow-500/10 text-yellow-500">
                <span className="material-symbols-outlined text-2xl">lightbulb</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">Common Misconception</h3>
                <p className="text-[#a69db9] text-sm leading-relaxed">
                  While water does reflect the sky, the sky&apos;s color isn&apos;t a reflection of the ocean. If that were true, the sky would be white over snowy landscapes or green over forests! The real reason involves how sunlight interacts with the atmosphere.
                </p>
              </div>
            </div>

            {/* Explanation Control Panel */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#2e2839] pb-4 mt-2">
              <div className="flex bg-[#1e182a] p-1 rounded-lg border border-[#2e2839]">
                <button className="px-4 py-2 rounded-md bg-[#2e2839] text-white text-sm font-bold shadow-sm transition-all border border-[#433b54]">Simplified</button>
                <button className="px-4 py-2 rounded-md text-[#a69db9] hover:text-white text-sm font-medium transition-all hover:bg-[#2e2839]/50">Advanced</button>
                <button className="px-4 py-2 rounded-md text-[#a69db9] hover:text-white text-sm font-medium transition-all hover:bg-[#2e2839]/50">Examples</button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-primary">AI Mode</span>
                <label className="inline-flex items-center cursor-pointer group">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="relative w-14 h-7 bg-[#2e2839] peer-focus:outline-none rounded-full peer dark:bg-[#1e182a] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  <span className="ms-3 text-sm font-medium text-gray-400 dark:text-gray-300 group-hover:text-white transition-colors">ELI5 (Explain like I&apos;m 5)</span>
                </label>
              </div>
            </div>

            {/* Main Explanation Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Core Explanation Text */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-surface-card rounded-xl p-6 border border-[#2e2839] shadow-lg relative">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/30 to-transparent rounded-xl blur opacity-20 pointer-events-none"></div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                    <h3 className="text-white font-bold text-lg">Rayleigh Scattering</h3>
                  </div>
                  <div className="prose prose-invert max-w-none text-[#d4d0da]">
                    <p className="mb-4">
                      The correct answer is <strong className="text-white">Rayleigh Scattering</strong>. Think of sunlight as a rainbow of colors all mixed together to look white.
                    </p>
                    <p className="mb-4">
                      When sunlight hits the Earth&apos;s atmosphere, it crashes into gas molecules (like nitrogen and oxygen). These molecules are like tiny bouncers that scatter the light in all directions.
                    </p>
                    <p className="mb-4">
                      Blue light travels in smaller, shorter waves, so it bumps into the gas molecules much more often than other colors like red or yellow. Because it gets bumped around so much, <span className="bg-primary/20 text-primary px-1 rounded">blue light gets scattered everywhere</span> across the sky, making it look blue to us standing on the ground.
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[#2e2839]">
                    <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">Step-by-Step Breakdown</h4>
                    <div className="space-y-2">
                      {/* Step 1 */}
                      <div className="bg-[#131118] rounded-lg p-3 border border-[#2e2839] flex gap-4 cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="flex-none size-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white mt-0.5">1</div>
                        <div>
                          <h5 className="text-white font-semibold text-sm">Sunlight enters atmosphere</h5>
                          <p className="text-xs text-[#a69db9] mt-1">White light contains all colors of the rainbow.</p>
                        </div>
                      </div>
                      {/* Step 2 */}
                      <div className="bg-[#131118] rounded-lg p-3 border border-[#2e2839] flex gap-4 cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="flex-none size-6 rounded-full bg-[#2e2839] flex items-center justify-center text-xs font-bold text-white mt-0.5">2</div>
                        <div>
                          <h5 className="text-white font-semibold text-sm">Collision with gases</h5>
                          <p className="text-xs text-[#a69db9] mt-1">Light hits nitrogen &amp; oxygen molecules.</p>
                        </div>
                      </div>
                      {/* Step 3 */}
                      <div className="bg-[#131118] rounded-lg p-3 border border-[#2e2839] flex gap-4 cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="flex-none size-6 rounded-full bg-[#2e2839] flex items-center justify-center text-xs font-bold text-white mt-0.5">3</div>
                        <div>
                          <h5 className="text-white font-semibold text-sm">Selective Scattering</h5>
                          <p className="text-xs text-[#a69db9] mt-1">Shorter blue waves scatter more than longer red waves.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Chat Prompt - Active */}
                <div className="space-y-4">
                    {/* Chat History */}
                    {chatHistory.map((msg, i) => (
                        <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-lg max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-surface-card border border-border text-white'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    <div className="bg-gradient-to-r from-[#1e182a] to-[#251f30] rounded-xl p-4 border border-[#2e2839] flex items-center gap-4">
                        <div className="bg-primary/20 p-2 rounded-lg text-primary">
                            <span className="material-symbols-outlined">chat_spark</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-white font-medium mb-1">Still confused? Ask for a different analogy.</p>
                            <input
                                className="w-full bg-[#131118]/50 rounded-lg border border-[#2e2839] text-sm text-white placeholder:text-[#5f586b] focus:ring-2 focus:ring-primary/50 focus:border-primary px-3 py-2 transition-all duration-200 focus:outline-none"
                                placeholder="e.g., 'Explain using ocean waves analogy'..."
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                                disabled={loading}
                            />
                        </div>
                        <button
                            onClick={handleAsk}
                            disabled={loading}
                            className="bg-[#2e2839] hover:bg-primary text-white p-2 rounded-lg transition-colors disabled:opacity-50 mt-5"
                        >
                            {loading ? <span className="material-symbols-outlined text-lg animate-spin">refresh</span> : <span className="material-symbols-outlined text-lg">send</span>}
                        </button>
                    </div>
                </div>
              </div>

              {/* Related Topics Sidebar */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#a69db9] uppercase tracking-wider">Related Concepts</h3>
                {/* Topic Card 1 */}
                <a className="block bg-surface-card hover:bg-[#251f30] rounded-xl p-4 border border-[#2e2839] transition-all group" href="#">
                  <div className="h-24 w-full rounded-lg bg-gray-800 mb-3 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-600/20"></div>
                    <div
                        className="w-full h-full bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAJIRQ6c4NJNlCSz8xPFWUwNdmO93X2PtOfBa1octTFBt-95Rf5Lemt0foBYHvJZQSsx3Fbicz8Y4CjsAHZ0NiEJhfRjAm7pt7VK3-S0EdYOQRdI0rMXmxaaHcakvaAZ0dafLbr1RSoi4iD76h9npMWMwzxA-mlb9nRXeGUwsyV9INtjt93b86OM_JSGlb5v9Wc630XHaPiVdiK_WwJkWsT-X_Mpqwfu_vn5V2DXjyvyJlmVe1kaq625oAMbGa9QoR3pJD6MwL5cpR2")' }}
                    ></div>
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1 group-hover:text-primary transition-colors">Why are sunsets red?</h4>
                  <p className="text-xs text-[#a69db9]">Understand how distance affects light scattering.</p>
                </a>
                {/* Topic Card 2 */}
                <a className="block bg-surface-card hover:bg-[#251f30] rounded-xl p-4 border border-[#2e2839] transition-all group" href="#">
                  <div className="h-24 w-full rounded-lg bg-gray-800 mb-3 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>
                    <div
                        className="w-full h-full bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD91jPjcvWgVkPSVdpct4AdtyNscf0dIU02ZqJBppL0pk_DDEu0VXsLHe9djI0e9h4aHk5j3XuJRzrQdoIfxVVVFEM2A3qXUn1KI2FCVGG8xPRRRouTR3dSh4ikn-tzAwotZjqaFzP73_g11GuCs9OfsTO-ZuFvHMW2fZF-So_yCXlsrfAca8txybQJMldHmG39lO2RVRdOOpWBiYXegrLeaD1Go7N7y8-N6xqtivnGIldU9d3-397jwtg4O3WDSbXiXfHut-vtiuZU")' }}
                    ></div>
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1 group-hover:text-primary transition-colors">Light Spectrum</h4>
                  <p className="text-xs text-[#a69db9]">Deep dive into wavelengths and visible light.</p>
                </a>

                {/* Action Button */}
                <button className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-4">
                  <span>Next Question</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
