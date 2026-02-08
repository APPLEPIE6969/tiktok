"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/lib/i18n"

interface VoiceInputProps {
    onAudioSend: (audioBlob: Blob) => Promise<void>
    disabled?: boolean
}

export function VoiceInput({ onAudioSend, disabled }: VoiceInputProps) {
    const [isRecording, setIsRecording] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [showPermissionPrompt, setShowPermissionPrompt] = useState(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])
    const { t } = useLanguage()

    const handleMicClick = () => {
        if (isRecording) {
            stopRecording()
        } else {
            startRecording()
        }
    }

    const startRecording = async () => {
        setIsProcessing(true)

        // Check for secure context (required for mic access)
        if (typeof window !== 'undefined' && !window.isSecureContext) {
            setIsProcessing(false)
            alert("Microphone access requires a secure connection (HTTPS). Please ensure you are accessing the site via HTTPS.")
            return
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            chunksRef.current = []

            setIsProcessing(false)
            setShowPermissionPrompt(false)

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data)
                }
            }

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
                setIsProcessing(true)
                try {
                    await onAudioSend(audioBlob)
                } catch (error) {
                    console.error("Error sending audio:", error)
                } finally {
                    setIsProcessing(false)
                }

                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop())
            }

            mediaRecorder.start()
            setIsRecording(true)
        } catch (err: any) {
            console.error("Detailed Microphone Error:", {
                name: err.name,
                message: err.message,
                stack: err.stack
            })
            setIsProcessing(false)

            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                setShowPermissionPrompt(true)
            } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                alert("No microphone found. Please connect a microphone and try again.")
            } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
                alert("Your microphone is currently being used by another application.")
            } else {
                alert(`Microphone error (${err.name}): ${err.message}. Please check your browser settings.`)
            }
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
        }
    }

    return (
        <div className="flex items-center gap-2 relative">
            {/* Permission Help Pop-up (Shows if denied or explicitly requested) */}
            {showPermissionPrompt && (
                <div className="absolute bottom-16 right-0 w-64 p-4 bg-white dark:bg-[#1e182a] border border-red-200 dark:border-red-900/30 rounded-2xl shadow-2xl animate-fade-in-up z-50">
                    <div className="flex items-center gap-2 mb-2 text-red-500">
                        <span className="material-symbols-outlined text-xl">block</span>
                        <p className="font-bold text-sm">Permission Denied</p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-text-secondary mb-3 leading-relaxed">
                        It looks like microphone access was denied. Please click the **lock icon** 🔒 in your browser's address bar to reset permissions, then try again.
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={startRecording}
                            className="flex-1 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => setShowPermissionPrompt(false)}
                            className="flex-1 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-text-secondary text-xs rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            Dismiss
                        </button>
                    </div>
                    <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-[#1e182a] border-r border-b border-red-200 dark:border-red-900/30 rotate-45"></div>
                </div>
            )}

            <button
                onClick={handleMicClick}
                disabled={disabled || isProcessing}
                className={`p-3 rounded-full transition-all flex items-center justify-center shadow-lg ${isRecording
                    ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                    : isProcessing
                        ? "bg-primary/50 text-white cursor-wait animate-pulse"
                        : "bg-primary hover:bg-primary/90 text-white"
                    }`}
                title={isRecording ? t("tutor.stop") : t("tutor.voice_mode")}
            >
                {isProcessing ? (
                    <span className="material-symbols-outlined animate-spin text-xl">refresh</span>
                ) : isRecording ? (
                    <span className="material-symbols-outlined text-xl">stop</span>
                ) : (
                    <span className="material-symbols-outlined text-xl">mic</span>
                )}
            </button>

            {isRecording && (
                <span className="text-xs font-medium text-red-500 animate-pulse bg-red-50 dark:bg-red-900/10 px-2 py-1 rounded-full">
                    {t("tutor.listening")}
                </span>
            )}

            {isProcessing && (
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {t("tutor.processing")}
                </span>
            )}
        </div>
    )
}
