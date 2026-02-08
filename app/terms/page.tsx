"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function TermsOfService() {
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
                    <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">Terms of Service</h1>
                    <p className="mb-8 text-sm text-slate-500 dark:text-[#a69db9]">Last updated: February 8, 2026</p>

                    <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-600 dark:prose-p:text-[#a69db9] prose-li:text-slate-600 dark:prose-li:text-[#a69db9]">
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using StudyFlow (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
                        </p>

                        <h2>2. Description of Service</h2>
                        <p>
                            StudyFlow is an AI-powered learning platform that provides personalized quizzes, study materials, concept explanations, and learning analytics. Our Service uses artificial intelligence to enhance your educational experience.
                        </p>

                        <h2>3. User Accounts</h2>
                        <p>To access certain features, you must create an account by:</p>
                        <ul>
                            <li>Authenticating through Google or GitHub OAuth</li>
                            <li>Providing accurate and complete information</li>
                            <li>Accepting our Privacy Policy and these Terms of Service</li>
                        </ul>
                        <p>
                            You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
                        </p>

                        <h2>4. Acceptable Use</h2>
                        <p>You agree NOT to:</p>
                        <ul>
                            <li>Use the Service for any unlawful purpose</li>
                            <li>Share account credentials with others</li>
                            <li>Attempt to reverse engineer or exploit the AI systems</li>
                            <li>Upload malicious content or attempt to compromise the Service</li>
                            <li>Use the Service to generate content that violates intellectual property rights</li>
                            <li>Harass, abuse, or harm other users</li>
                        </ul>

                        <h2>5. AI-Generated Content</h2>
                        <p>
                            Our Service uses AI to generate quizzes, explanations, and learning materials. While we strive for accuracy, AI-generated content may occasionally contain errors. Users should:
                        </p>
                        <ul>
                            <li>Verify important information from authoritative sources</li>
                            <li>Use AI-generated content as a learning aid, not as the sole source of truth</li>
                            <li>Report any inaccurate or inappropriate content</li>
                        </ul>

                        <h2>6. User Content</h2>
                        <p>
                            You retain ownership of content you create (notes, flashcards, etc.). By using our Service, you grant us a license to store, process, and display your content to provide and improve our services.
                        </p>

                        <h2>7. Intellectual Property</h2>
                        <p>
                            The Service, including its design, features, and content (excluding user-generated content), is owned by StudyFlow and protected by intellectual property laws. You may not copy, modify, or distribute our proprietary materials without permission.
                        </p>

                        <h2>8. Disclaimer of Warranties</h2>
                        <p>
                            THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT AI-GENERATED CONTENT WILL BE COMPLETELY ACCURATE.
                        </p>

                        <h2>9. Limitation of Liability</h2>
                        <p>
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, STUDYFLOW SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
                        </p>

                        <h2>10. Termination</h2>
                        <p>
                            We reserve the right to suspend or terminate your account at any time for violations of these Terms. You may also delete your account at any time through the profile settings.
                        </p>

                        <h2>11. Changes to Terms</h2>
                        <p>
                            We may modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms. We will notify users of significant changes.
                        </p>

                        <h2>12. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which StudyFlow operates, without regard to conflict of law principles.
                        </p>

                        <h2>13. Contact</h2>
                        <p>
                            For questions about these Terms, please contact us at{" "}
                            <a href="mailto:legal@studyflow.app" className="text-primary hover:underline">legal@studyflow.app</a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
