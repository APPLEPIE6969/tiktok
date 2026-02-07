"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card"
import { CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: string
}

interface QuizProps {
  questions: Question[]
}

export function Quiz({ questions }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return // Prevent changing answer
    setSelectedOption(option)
    const correct = option === currentQuestion.correctAnswer
    setIsCorrect(correct)
    if (correct) setScore(score + 1)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setIsCorrect(null)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsCorrect(null)
    setScore(0)
    setShowResult(false)
  }

  if (showResult) {
    return (
      <Card className="w-full max-w-2xl mx-auto text-center p-8">
        <CardHeader>
          <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
            className="text-6xl font-bold mb-4 text-primary"
          >
            {score} / {questions.length}
          </motion.div>
          <p className="text-muted-foreground">
            You got {Math.round((score / questions.length) * 100)}% correct.
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={resetQuiz} size="lg">Try Again</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-4 flex justify-between items-center text-sm text-muted-foreground">
        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={cn(
                    "w-full justify-start h-auto py-4 px-6 text-left text-base relative overflow-hidden transition-all duration-200",
                    selectedOption === option && isCorrect && "bg-green-500/10 border-green-500 text-green-500 hover:bg-green-500/20 hover:text-green-500",
                    selectedOption === option && !isCorrect && "bg-red-500/10 border-red-500 text-red-500 hover:bg-red-500/20 hover:text-red-500",
                    selectedOption && option === currentQuestion.correctAnswer && "bg-green-500/10 border-green-500 text-green-500" // Always show correct answer
                  )}
                  onClick={() => handleOptionSelect(option)}
                  disabled={!!selectedOption}
                >
                  <span className="mr-2 opacity-50 font-mono">{String.fromCharCode(65 + index)}.</span>
                  {option}
                  {selectedOption === option && isCorrect && (
                    <CheckCircle2 className="absolute right-4 h-5 w-5 text-green-500" />
                  )}
                  {selectedOption === option && !isCorrect && (
                    <XCircle className="absolute right-4 h-5 w-5 text-red-500" />
                  )}
                </Button>
              ))}
            </CardContent>
            <CardFooter className="justify-end h-20">
              {selectedOption && (
                <Button onClick={handleNext} className="ml-auto animate-in fade-in slide-in-from-right-4">
                  {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
