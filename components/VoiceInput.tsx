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
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])
    const { t } = useLanguage()

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            chunksRef.current = []

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data)
                }
            }

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' }) // Chrome/Firefox usually default to webm/opus
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
        } catch (err) {
            console.error("Error accessing microphone:", err)
            alert("Could not access microphone. Please ensure permissions are granted.")
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={disabled || isProcessing}
                className={`p-3 rounded-full transition-all flex items-center justify-center shadow-lg ${isRecording
                        ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                        : isProcessing
                            ? "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
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
