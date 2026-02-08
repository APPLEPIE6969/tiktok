
export const GEMINI_MODELS = {
  FLASH_LITE: "gemini-2.5-flash-lite",
  FLASH: "gemini-2.5-flash",
  FLASH_PREVIEW: "gemini-3-flash-preview",
  GEMMA_3_1B: "gemma-3-1b",
  GEMMA_3_2B: "gemma-3-2b",
  GEMMA_3_4B: "gemma-3-4b",
  GEMMA_3_12B: "gemma-3-12b",
  GEMMA_3_27B: "gemma-3-27b",
} as const;

export const GROQ_MODELS = {
  LLAMA_3_1_8B_INSTANT: "llama-3.1-8b-instant",
  LLAMA_3_3_70B_VERSATILE: "llama-3.3-70b-versatile",
  MIXTRAL_8X7B_32768: "mixtral-8x7b-32768",
  GEMMA_7B_IT: "gemma-7b-it",
} as const;

export const DEFAULT_QUIZ_MODEL = GEMINI_MODELS.FLASH;
export const DEFAULT_EXPLANATION_MODEL = GROQ_MODELS.LLAMA_3_1_8B_INSTANT;
