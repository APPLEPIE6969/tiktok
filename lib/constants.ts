export const LANGUAGES = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Español" },
    { value: "French", label: "Français" },
    { value: "German", label: "Deutsch" },
    { value: "Dutch", label: "Nederlands" },
] as const;

export type LanguageValue = typeof LANGUAGES[number]["value"];
