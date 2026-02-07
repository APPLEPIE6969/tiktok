"use client"

import { useParams } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { Flashcard } from "@/components/Flashcard"
import { Quiz } from "@/components/Quiz"
import { flashcards, quizzes, studySets } from "@/lib/mockData"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, HelpCircle, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function StudyPage() {
  const params = useParams()
  const id = params.id as string
  const [mode, setMode] = useState<"flashcards" | "quiz">("flashcards")

  const setInfo = studySets.find((s) => s.id === id)
  const currentFlashcards = flashcards[id] || []
  const currentQuiz = quizzes[id] || []

  if (!setInfo) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Study set not found</div>
  }

  return (
    <div className="min-h-screen bg-background pb-20 selection:bg-primary/20">
      <Navbar />
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
        </Link>

        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 tracking-tight">{setInfo.title}</h1>
            <p className="text-muted-foreground">{setInfo.description}</p>
        </div>

        <div className="flex border-b border-border mb-8">
            <button
                onClick={() => setMode("flashcards")}
                className={cn(
                    "flex items-center gap-2 px-6 py-3 border-b-2 transition-all duration-200 font-medium text-lg relative",
                    mode === "flashcards" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
            >
                <BookOpen className="h-5 w-5" />
                Flashcards
                {mode === "flashcards" && (
                    <motion.div layoutId="activeTab" className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-primary" />
                )}
            </button>
            <button
                onClick={() => setMode("quiz")}
                className={cn(
                    "flex items-center gap-2 px-6 py-3 border-b-2 transition-all duration-200 font-medium text-lg relative",
                    mode === "quiz" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
            >
                <HelpCircle className="h-5 w-5" />
                Quiz
                 {mode === "quiz" && (
                    <motion.div layoutId="activeTab" className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-primary" />
                )}
            </button>
        </div>

        <AnimatePresence mode="wait">
            {mode === "flashcards" ? (
                <motion.div
                    key="flashcards"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="space-y-8">
                        {currentFlashcards.length > 0 ? (
                            <FlashcardCarousel cards={currentFlashcards} />
                        ) : (
                            <div className="text-center py-20 text-muted-foreground bg-secondary/10 rounded-xl border border-dashed border-border">
                                No flashcards available for this set.
                            </div>
                        )}
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="quiz"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                     {currentQuiz.length > 0 ? (
                            <Quiz questions={currentQuiz} />
                        ) : (
                             <div className="text-center py-20 text-muted-foreground bg-secondary/10 rounded-xl border border-dashed border-border">
                                No quiz available for this set.
                            </div>
                        )}
                </motion.div>
            )}
        </AnimatePresence>
      </main>
    </div>
  )
}

function FlashcardCarousel({ cards }: { cards: Array<{ term: string, definition: string }> }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextCard = () => {
        setCurrentIndex((prev) => (prev + 1) % cards.length)
    }

    const prevCard = () => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="w-full relative min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.95, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95, x: -50 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-full"
                    >
                         <Flashcard term={cards[currentIndex].term} definition={cards[currentIndex].definition} />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex items-center gap-4 mt-8 bg-card/50 p-2 rounded-full border border-border shadow-sm">
                <Button variant="ghost" size="icon" onClick={prevCard} disabled={cards.length <= 1} className="rounded-full w-12 h-12 hover:bg-primary/10 hover:text-primary">
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <span className="text-muted-foreground font-mono font-medium px-4 min-w-[80px] text-center">
                    {currentIndex + 1} / {cards.length}
                </span>
                <Button variant="ghost" size="icon" onClick={nextCard} disabled={cards.length <= 1} className="rounded-full w-12 h-12 hover:bg-primary/10 hover:text-primary">
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2">Use arrow keys to navigate</p>
        </div>
    )
}
