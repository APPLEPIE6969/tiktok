"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { getUserProfile } from "./userStore"
import { LANGUAGES } from "./constants"

type Language = string

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Basic dictionary for demonstration
const translations: Record<string, Record<string, string>> = {
    English: {
        "nav.dashboard": "Dashboard",
        "nav.courses": "My Courses",
        "nav.quizzes": "Quizzes",
        "nav.tutor": "AI Tutor",
        "nav.resources": "Resources",
        "nav.settings": "Settings",
        "profile.title": "Profile",
        "profile.preferences": "Preferences",
        "profile.language": "Language",
        "profile.theme": "Dark Mode",
        "profile.notifications": "Email Notifications",
        "profile.delete": "Delete Account",
        "profile.overview": "Overview",
        "profile.history": "History",
        "profile.bookmarks": "Bookmarks",
        "profile.subscription": "Subscription",
        "tutor.welcome": "Hello! I'm your AI Tutor.",
        "tutor.description": "I can help you with questions, explain complex topics, or just chat about what you're learning.",
        "tutor.input_placeholder": "Ask your question...",
        "tutor.voice_mode": "Voice Mode",
        "tutor.listening": "Listening...",
        "tutor.processing": "Processing...",
        "tutor.stop": "Stop",
        "tutor.send": "Send",
        "tutor.clear_chat": "Clear Chat",
        "tutor.disclaimer": "AI can make mistakes. Verify important information.",
        "quiz.title": "AI Quiz Generator",
        "quiz.subtitle": "Create a personalized quiz in seconds from any topic.",
        "quiz.topic_label": "Topic or Subject",
        "quiz.topic_placeholder": "e.g., Quantum Physics, World War II...",
        "quiz.custom_content": "Add your own source material (optional)",
        "quiz.difficulty": "Difficulty Level",
        "quiz.question_type": "Question Type",
        "quiz.question_count": "Number of Questions",
        "quiz.language": "Language",
        "quiz.ai_mode": "AI Mode",
        "quiz.instant_feedback": "Instant Feedback",
        "quiz.generate_button": "Generate Quiz",
        "quiz.generating": "Generating...",
        "common.loading": "Loading...",
    },
    Spanish: {
        "nav.dashboard": "Panel de Control",
        "nav.courses": "Mis Cursos",
        "nav.quizzes": "Cuestionarios",
        "nav.tutor": "Tutor IA",
        "nav.resources": "Recursos",
        "nav.settings": "Ajustes",
        "profile.title": "Perfil",
        "profile.preferences": "Preferencias",
        "profile.language": "Idioma",
        "profile.theme": "Modo Oscuro",
        "profile.notifications": "Notificaciones por Correo",
        "profile.delete": "Eliminar Cuenta",
        "profile.overview": "Resumen",
        "profile.history": "Historial",
        "profile.bookmarks": "Marcadores",
        "profile.subscription": "Suscripción",
        "tutor.welcome": "¡Hola! Soy tu Tutor de IA.",
        "tutor.description": "Puedo ayudarte con preguntas, explicar temas complejos o simplemente charlar sobre lo que estás aprendiendo.",
        "tutor.input_placeholder": "Haz tu pregunta...",
        "tutor.voice_mode": "Modo Voz",
        "tutor.listening": "Escuchando...",
        "tutor.processing": "Procesando...",
        "tutor.stop": "Detener",
        "tutor.send": "Enviar",
        "tutor.clear_chat": "Borrar Chat",
        "tutor.disclaimer": "La IA puede cometer errores. Verifica la información importante.",
        "quiz.title": "Generador de Cuestionarios IA",
        "quiz.subtitle": "Crea un cuestionario personalizado en segundos sobre cualquier tema.",
        "quiz.topic_label": "Tema o Asunto",
        "quiz.topic_placeholder": "ej., Física Cuántica, Segunda Guerra Mundial...",
        "quiz.custom_content": "Añade tu propio material fuente (opcional)",
        "quiz.difficulty": "Nivel de Dificultad",
        "quiz.question_type": "Tipo de Pregunta",
        "quiz.question_count": "Número de Preguntas",
        "quiz.language": "Idioma",
        "quiz.ai_mode": "Modo IA",
        "quiz.instant_feedback": "Retroalimentación Instantánea",
        "quiz.generate_button": "Generar Cuestionario",
        "quiz.generating": "Generando...",
        "common.loading": "Cargando...",
    },
    French: {
        "nav.dashboard": "Tableau de Bord",
        "nav.courses": "Mes Cours",
        "nav.quizzes": "Quiz",
        "nav.tutor": "Tuteur IA",
        "nav.resources": "Ressources",
        "nav.settings": "Paramètres",
        "profile.title": "Profil",
        "profile.preferences": "Préférences",
        "profile.language": "Langue",
        "profile.theme": "Mode Sombre",
        "profile.notifications": "Notifications par E-mail",
        "profile.delete": "Supprimer le Compte",
        "profile.overview": "Aperçu",
        "profile.history": "Historique",
        "profile.bookmarks": "Favoris",
        "profile.subscription": "Abonnement",
        "tutor.welcome": "Bonjour ! Je suis votre Tuteur IA.",
        "tutor.description": "Je peux vous aider avec des questions, expliquer des sujets complexes ou simplement discuter de ce que vous apprenez.",
        "tutor.input_placeholder": "Posez votre question...",
        "tutor.voice_mode": "Mode Vocal",
        "tutor.listening": "Écoute...",
        "tutor.processing": "Traitement...",
        "tutor.stop": "Arrêter",
        "tutor.send": "Envoyer",
        "tutor.clear_chat": "Effacer le chat",
        "tutor.disclaimer": "L'IA peut faire des erreurs. Vérifiez les informations importantes.",
        "quiz.title": "Générateur de Quiz IA",
        "quiz.subtitle": "Créez un quiz personnalisé en quelques secondes sur n'importe quel sujet.",
        "quiz.topic_label": "Sujet ou Thème",
        "quiz.topic_placeholder": "ex., Physique Quantique, Seconde Guerre Mondiale...",
        "quiz.custom_content": "Ajoutez votre propre matériel source (optionnel)",
        "quiz.difficulty": "Niveau de Difficulté",
        "quiz.question_type": "Type de Question",
        "quiz.question_count": "Nombre de Questions",
        "quiz.language": "Langue",
        "quiz.ai_mode": "Mode IA",
        "quiz.instant_feedback": "Retour Instantané",
        "quiz.generate_button": "Générer le Quiz",
        "quiz.generating": "Génération...",
        "common.loading": "Chargement...",
    },
    German: {
        "nav.dashboard": "Übersicht",
        "nav.courses": "Meine Kurse",
        "nav.quizzes": "Quizze",
        "nav.tutor": "KI-Tutor",
        "nav.resources": "Ressourcen",
        "nav.settings": "Einstellungen",
        "profile.title": "Profil",
        "profile.preferences": "Präferenzen",
        "profile.language": "Sprache",
        "profile.theme": "Dunkelmodus",
        "profile.notifications": "E-Mail-Benachrichtigungen",
        "profile.delete": "Konto löschen",
        "profile.overview": "Überblick",
        "profile.history": "Verlauf",
        "profile.bookmarks": "Lesezeichen",
        "profile.subscription": "Abonnement",
        "tutor.welcome": "Hallo! Ich bin dein KI-Tutor.",
        "tutor.description": "Ich kann dir bei Fragen helfen, komplexe Themen erklären oder einfach über das Gelernte plaudern.",
        "tutor.input_placeholder": "Stelle deine Frage...",
        "tutor.voice_mode": "Sprachmodus",
        "tutor.listening": "Zuhören...",
        "tutor.processing": "Verarbeiten...",
        "tutor.stop": "Stopp",
        "tutor.send": "Senden",
        "tutor.clear_chat": "Chat löschen",
        "tutor.disclaimer": "KI kann Fehler machen. Überprüfe wichtige Informationen.",
        "quiz.title": "KI-Quiz-Generator",
        "quiz.subtitle": "Erstelle in Sekunden ein personalisiertes Quiz zu jedem Thema.",
        "quiz.topic_label": "Thema oder Fach",
        "quiz.topic_placeholder": "z.B. Quantenphysik, Zweiter Weltkrieg...",
        "quiz.custom_content": "Füge dein eigenes Quellmaterial hinzu (optional)",
        "quiz.difficulty": "Schwierigkeitsgrad",
        "quiz.question_type": "Fragetyp",
        "quiz.question_count": "Anzahl der Fragen",
        "quiz.language": "Sprache",
        "quiz.ai_mode": "KI-Modus",
        "quiz.instant_feedback": "Sofortiges Feedback",
        "quiz.generate_button": "Quiz generieren",
        "quiz.generating": "Generieren...",
        "common.loading": "Laden...",
    },
    Dutch: {
        "nav.dashboard": "Dashboard",
        "nav.courses": "Mijn Cursussen",
        "nav.quizzes": "Quizzen",
        "nav.tutor": "AI Tutor",
        "nav.resources": "Bronnen",
        "nav.settings": "Instellingen",
        "profile.title": "Profiel",
        "profile.preferences": "Voorkeuren",
        "profile.language": "Taal",
        "profile.theme": "Donkere Modus",
        "profile.notifications": "E-mailmeldingen",
        "profile.delete": "Account Verwijderen",
        "profile.overview": "Overzicht",
        "profile.history": "Geschiedenis",
        "profile.bookmarks": "Bladwijzers",
        "profile.subscription": "Abonnement",
        "tutor.welcome": "Hallo! Ik ben jouw AI-tutor.",
        "tutor.description": "Ik kan je helpen met vragen, complexe onderwerpen uitleggen of gewoon chatten over wat je leert.",
        "tutor.input_placeholder": "Stel je vraag...",
        "tutor.voice_mode": "Spraakmodus",
        "tutor.listening": "Luisteren...",
        "tutor.processing": "Verwerken...",
        "tutor.stop": "Stop",
        "tutor.send": "Verzenden",
        "tutor.clear_chat": "Chat wissen",
        "tutor.disclaimer": "AI kan fouten maken. Controleer belangrijke informatie.",
        "quiz.title": "AI Quiz Generator",
        "quiz.subtitle": "Maak binnen enkele seconden een gepersonaliseerde quiz over elk onderwerp.",
        "quiz.topic_label": "Onderwerp of Thema",
        "quiz.topic_placeholder": "bijv. Kwantumfysica, Tweede Wereldoorlog...",
        "quiz.custom_content": "Voeg je eigen bronmateriaal toe (optioneel)",
        "quiz.difficulty": "Moeilijkheidsgraad",
        "quiz.question_type": "Vraagtype",
        "quiz.question_count": "Aantal vragen",
        "quiz.language": "Taal",
        "quiz.ai_mode": "AI-modus",
        "quiz.instant_feedback": "Directe Feedback",
        "quiz.generate_button": "Quiz Genereren",
        "quiz.generating": "Genereren...",
        "common.loading": "Laden...",
    }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("English")

    // Load from storage on mount
    useEffect(() => {
        const profile = getUserProfile()
        if (profile?.language) {
            setLanguageState(profile.language)
        }
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        // Persistence is handled by the calling component (Profile page) or we could move it here
        // For now, we sync state here, and Profile page syncs to localStorage/UserProfile
    }

    const t = (key: string) => {
        const dict = translations[language] || translations["English"]
        return dict[key] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
