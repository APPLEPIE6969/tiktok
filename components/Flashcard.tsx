"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"

interface FlashcardProps {
  term: string
  definition: string
}

export function Flashcard({ term, definition }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleFlip = () => {
    if (!isAnimating) {
        setIsFlipped(!isFlipped)
        setIsAnimating(true)
    }
  }

  return (
    <div className="h-[400px] w-full max-w-2xl cursor-pointer mx-auto" style={{ perspective: "1000px" }} onClick={handleFlip}>
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        {/* Front */}
        <Card className="absolute h-full w-full flex items-center justify-center p-8 text-center bg-card border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow"
             style={{ backfaceVisibility: "hidden" }}
        >
            <CardContent className="flex flex-col items-center justify-center h-full">
                <h3 className="text-4xl font-bold text-foreground">{term}</h3>
                <p className="text-sm text-muted-foreground mt-4 absolute bottom-6 uppercase tracking-wider font-semibold">Click to flip</p>
            </CardContent>
        </Card>

        {/* Back */}
        <Card className="absolute h-full w-full flex items-center justify-center p-8 text-center bg-card border-2 border-accent/20 shadow-lg hover:shadow-xl transition-shadow"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
            <CardContent className="flex flex-col items-center justify-center h-full">
                <p className="text-2xl font-medium text-foreground leading-relaxed">{definition}</p>
            </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
