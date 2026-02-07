"use client"

import { Navbar } from "@/components/Navbar"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { studySets } from "@/lib/mockData"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Clock, User, MoreHorizontal, BookOpen } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-screen-2xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Your Library</h1>
                <p className="text-muted-foreground">Continue where you left off.</p>
            </div>
            <Link href="/create">
                <Button className="shadow-lg shadow-primary/20">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Set
                </Button>
            </Link>
        </div>

        {studySets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {studySets.map((set, index) => (
                    <Link key={set.id} href={`/study/${set.id}`} className="block h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="h-full"
                        >
                            <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-muted/60 cursor-pointer group relative overflow-hidden bg-card/50 backdrop-blur-sm">
                                 <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                                 <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">{set.title}</CardTitle>
                                    </div>
                                    <CardDescription className="line-clamp-2 mt-2 h-10">{set.description}</CardDescription>
                                </CardHeader>
                                <div className="flex-grow" />
                                <CardFooter className="flex justify-between text-xs text-muted-foreground pt-4 border-t border-border/40">
                                    <div className="flex items-center font-medium">
                                        <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                                        {set.termCount} terms
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="mr-1.5 h-3.5 w-3.5" />
                                        {set.updatedAt}
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </Link>
                ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <p className="text-muted-foreground">No study sets yet. Create one to get started!</p>
            </div>
        )}
      </main>
    </div>
  )
}
