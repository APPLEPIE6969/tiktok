"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, FileText, Plus, Trash2, Loader2, Save } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Create() {
  const [activeTab, setActiveTab] = useState<"ai" | "manual">("ai")
  const [title, setTitle] = useState("")
  const [topic, setTopic] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTerms, setGeneratedTerms] = useState<Array<{term: string, definition: string}>>([])

  const [manualTerms, setManualTerms] = useState([{ term: "", definition: "" }, { term: "", definition: "" }])

  const handleGenerate = () => {
    setIsGenerating(true)
    // Mock API call
    setTimeout(() => {
        setGeneratedTerms([
            { term: "Artificial Intelligence", definition: "Simulation of human intelligence by machines." },
            { term: "Machine Learning", definition: "Subset of AI that trains machines to learn from data." },
            { term: "Neural Networks", definition: "Computing systems inspired by biological neural networks." },
            { term: "Deep Learning", definition: "ML based on artificial neural networks with representation learning." },
            { term: "NLP", definition: "Natural Language Processing, giving computers the ability to understand text and spoken words." },
        ])
        setIsGenerating(false)
    }, 2000)
  }

  const addManualTerm = () => {
    setManualTerms([...manualTerms, { term: "", definition: "" }])
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
             <h1 className="text-3xl font-bold">Create New Study Set</h1>
        </div>

        <div className="mb-8 p-6 bg-card rounded-xl border border-border shadow-sm">
            <label className="block text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wide">Title</label>
            <Input
                placeholder="Enter a title, e.g. 'Biology 101'"
                className="text-lg py-6 border-none bg-transparent shadow-none focus-visible:ring-0 px-0 placeholder:text-muted-foreground/50 font-semibold"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <div className="h-0.5 w-full bg-border rounded-full" />
        </div>

        <div className="flex space-x-4 mb-8">
            <button
                onClick={() => setActiveTab("ai")}
                className={cn(
                    "flex-1 py-4 px-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 relative overflow-hidden",
                    activeTab === "ai" ? "border-primary bg-primary/5 text-primary shadow-md" : "border-border hover:border-primary/50 text-muted-foreground hover:bg-secondary/50"
                )}
            >
                <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity ${activeTab === 'ai' ? 'opacity-100' : ''}`} />
                <Sparkles className="h-6 w-6 relative z-10" />
                <span className="font-semibold relative z-10">Generate with AI</span>
            </button>
            <button
                onClick={() => setActiveTab("manual")}
                className={cn(
                    "flex-1 py-4 px-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2",
                    activeTab === "manual" ? "border-primary bg-primary/5 text-primary shadow-md" : "border-border hover:border-primary/50 text-muted-foreground hover:bg-secondary/50"
                )}
            >
                <FileText className="h-6 w-6" />
                <span className="font-semibold">Create Manually</span>
            </button>
        </div>

        <AnimatePresence mode="wait">
            {activeTab === "ai" ? (
                <motion.div
                    key="ai"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <Card className="border-primary/20 shadow-lg shadow-primary/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                AI Generator
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Topic or Text</label>
                                <textarea
                                    className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                                    placeholder="Paste your notes here, enter a topic, or describe what you want to learn..."
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                            </div>
                            <Button
                                onClick={handleGenerate}
                                disabled={isGenerating || !topic}
                                className="w-full h-12 text-lg font-medium shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40"
                                size="lg"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Generating Magic...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-5 w-5" />
                                        Generate Flashcards
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {generatedTerms.length > 0 && (
                        <div className="mt-8 space-y-4">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                Generated Preview
                                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">{generatedTerms.length} cards</span>
                            </h3>
                            <div className="grid gap-4">
                                {generatedTerms.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="p-6 rounded-lg border bg-card/50 flex flex-col md:flex-row gap-4 hover:border-primary/50 transition-colors"
                                    >
                                        <div className="flex-1 font-medium text-lg">{item.term}</div>
                                        <div className="hidden md:block w-px bg-border/60 self-stretch" />
                                        <div className="flex-1 text-muted-foreground">{item.definition}</div>
                                    </motion.div>
                                ))}
                            </div>
                            <Button className="w-full mt-8 h-12 text-lg" variant="secondary">
                                <Save className="mr-2 h-5 w-5" />
                                Save Set
                            </Button>
                        </div>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    key="manual"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="space-y-4">
                        {manualTerms.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Card>
                                    <CardContent className="p-4 flex gap-4 items-start pt-6">
                                        <div className="flex-none pt-8 text-muted-foreground font-mono text-sm w-6">
                                            {i + 1}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Term</label>
                                            <Input
                                                value={item.term}
                                                className="border-b-2 border-x-0 border-t-0 rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 text-lg bg-transparent"
                                                placeholder="Enter term"
                                                onChange={(e) => {
                                                    const newTerms = [...manualTerms]
                                                    newTerms[i].term = e.target.value
                                                    setManualTerms(newTerms)
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Definition</label>
                                            <Input
                                                value={item.definition}
                                                className="border-b-2 border-x-0 border-t-0 rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 text-lg bg-transparent"
                                                placeholder="Enter definition"
                                                onChange={(e) => {
                                                    const newTerms = [...manualTerms]
                                                    newTerms[i].definition = e.target.value
                                                    setManualTerms(newTerms)
                                                }}
                                            />
                                        </div>
                                        <Button variant="ghost" size="icon" className="mt-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" onClick={() => {
                                            const newTerms = manualTerms.filter((_, idx) => idx !== i)
                                            setManualTerms(newTerms)
                                        }}>
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                        <Button variant="outline" className="w-full py-8 border-dashed border-2 hover:border-primary hover:text-primary transition-all text-muted-foreground text-lg" onClick={addManualTerm}>
                            <Plus className="mr-2 h-5 w-5" />
                            Add Card
                        </Button>
                        <div className="flex justify-end pt-4">
                            <Button className="w-full md:w-auto min-w-[200px] h-12 text-lg font-medium" size="lg">Create</Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </main>
    </div>
  )
}
