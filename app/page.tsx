"use client"

import { Button } from "@/components/ui/Button"
import { Navbar } from "@/components/Navbar"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Brain, Zap, Moon } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl space-y-8"
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
             <Zap className="mr-1 h-3.5 w-3.5" />
             New: AI-Powered Study Sets
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Master Any Subject with <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x bg-300%">
              AI-Powered
            </span> Flashcards
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Create study sets in seconds, quiz yourself with intelligent feedback, and learn faster than ever before with our polished, dark-mode first platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="group text-lg px-8 h-12 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/create">
                <Button variant="outline" size="lg" className="text-lg px-8 h-12 rounded-full hover:bg-secondary/80">
                    Create a Set
                </Button>
            </Link>
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl w-full px-4">
            <FeatureCard
                icon={<Brain className="h-8 w-8 text-indigo-400" />}
                title="AI Generation"
                description="Instantly generate comprehensive study sets from any topic or text using advanced AI models."
                delay={0.2}
            />
            <FeatureCard
                icon={<Zap className="h-8 w-8 text-amber-400" />}
                title="Smart Quizzes"
                description="Test your knowledge with adaptive quizzes that focus on what you need to learn most."
                delay={0.4}
            />
            <FeatureCard
                icon={<Moon className="h-8 w-8 text-sky-400" />}
                title="Polished Dark Mode"
                description="Study comfortably at night with our beautifully designed interface optimized for focus."
                delay={0.6}
            />
        </div>
      </main>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5 }}
            className="flex flex-col items-start text-left p-8 rounded-2xl bg-secondary/10 border border-white/5 hover:bg-secondary/20 transition-colors backdrop-blur-sm"
        >
            <div className="mb-6 p-4 bg-background/50 rounded-xl border border-white/10 shadow-sm">{icon}</div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </motion.div>
    )
}
