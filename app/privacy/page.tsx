"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PrivacyPolicy() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            {/* Header */}
            <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-[#2e2839] dark:bg-[#131118]/80">
                <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
                            <span className="material-symbols-outlined text-xl">school</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">StudyFlow</span>
                    </Link>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-[#2e2839]"
                    >
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Back
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="mx-auto max-w-4xl px-6 py-12">
                <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5 dark:bg-[#1a1622] dark:ring-white/10 md:p-12">
                    <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">Privacy Policy</h1>
                    <p className="mb-8 text-sm text-slate-500 dark:text-[#a69db9]">Last updated: February 8, 2026</p>

                    <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-600 dark:prose-p:text-[#a69db9] prose-li:text-slate-600 dark:prose-li:text-[#a69db9]">
                        <h2>1. Introduction</h2>
                        <p>
                            Welcome to StudyFlow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered learning platform.
                        </p>

                        <h2>2. Information We Collect</h2>
                        <p>We collect information that you provide directly to us, including:</p>
                        <ul>
                            <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, and profile picture through Google or GitHub OAuth authentication.</li>
                            <li><strong>Learning Data:</strong> Your quiz results, study progress, and learning preferences to personalize your experience.</li>
                            <li><strong>User Content:</strong> Notes, flashcards, and other content you create within the platform.</li>
                            <li><strong>Usage Data:</strong> Information about how you interact with our services, including time spent studying and features used.</li>
                        </ul>

                        <h2>3. How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Provide, maintain, and improve our AI-powered learning services</li>
                            <li>Personalize your learning experience and recommendations</li>
                            <li>Generate AI-powered quizzes and explanations tailored to your needs</li>
                            <li>Track your progress and provide insights on your learning journey</li>
                            <li>Communicate with you about updates, features, and support</li>
                            <li>Ensure the security and integrity of our platform</li>
                        </ul>

                        <h2>4. Data Storage</h2>
                        <p>
                            Your learning preferences and session data are stored locally in your browser using localStorage. This means your data remains on your device and persists between sessions. You can clear this data at any time through your browser settings.
                        </p>

                        <h2>5. Third-Party Services</h2>
                        <p>We integrate with the following third-party services:</p>
                        <ul>
                            <li><strong>Google OAuth:</strong> For secure authentication</li>
                            <li><strong>GitHub OAuth:</strong> For secure authentication</li>
                            <li><strong>AI Services:</strong> Google Gemini and Groq for generating educational content</li>
                        </ul>

                        <h2>6. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                        </p>

                        <h2>7. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access your personal data</li>
                            <li>Correct inaccurate data</li>
                            <li>Delete your account and associated data</li>
                            <li>Export your learning data</li>
                            <li>Opt out of non-essential communications</li>
                        </ul>

                        <h2>8. Children&apos;s Privacy</h2>
                        <p>
                            Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                        </p>

                        <h2>9. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                        </p>

                        <h2>10. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at{" "}
                            <a href="mailto:privacy@studyflow.app" className="text-primary hover:underline">privacy@studyflow.app</a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
