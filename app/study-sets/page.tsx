"use client"

import { useLanguage } from "@/lib/i18n"
import { motion } from "framer-motion"

export default function NotesPage() {
    const { t } = useLanguage()

    return (
        <div className="flex-1 space-y-6 p-8 pt-6 min-h-screen bg-gray-50/50 dark:bg-surface-dark font-sans text-slate-900 dark:text-white">
            <div className="flex items-center justify-between mb-8 animate-fade-in">
                <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    {t("nav.study_sets") || "Study Sets"}
                </h2>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white dark:bg-[#1e182a] border border-dashed border-slate-300 dark:border-slate-700"
            >
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                    <span className="material-symbols-outlined text-3xl">library_books</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Study Sets Coming Soon</h3>
                <p className="text-slate-500 dark:text-text-secondary max-w-sm mx-auto">
                    Create and organize your flashcards and study materials here.
                </p>
            </motion.div>
        </div>
    )
}
