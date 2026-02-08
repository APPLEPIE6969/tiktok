
export const GEMINI_MODELS = {
  FLASH_LITE: "gemini-2.5-flash-lite",
  FLASH_TTS: "gemini-2.5-flash-tts",
  FLASH: "gemini-2.5-flash",
  FLASH_PREVIEW: "gemini-3-flash-preview",
  ROBOTICS_ER_1_5_PREVIEW: "gemini-robotics-er-1.5-preview",
  GEMMA_3_1B: "gemma-3-1b",
  GEMMA_3_2B: "gemma-3-2b",
  GEMMA_3_4B: "gemma-3-4b",
  GEMMA_3_12B: "gemma-3-12b",
  GEMMA_3_27B: "gemma-3-27b",
  EMBEDDING_1: "gemini-embedding-1",
  FLASH_NATIVE_AUDIO_DIALOG: "gemini-2.5-flash-native-audio-dialog",
} as const;

export const GROQ_MODELS = {
  LLAMA_3_1_8B_INSTANT: "llama-3.1-8b-instant",
  LLAMA_3_3_70B_VERSATILE: "llama-3.3-70b-versatile",
  LLAMA_GUARD_4_12B: "meta-llama/llama-guard-4-12b",
  OPENAI_GPT_OSS_120B: "openai/gpt-oss-120b",
  OPENAI_GPT_OSS_20B: "openai/gpt-oss-20b",
  WHISPER_LARGE_V3: "whisper-large-v3",
  WHISPER_LARGE_V3_TURBO: "whisper-large-v3-turbo",
  GROQ_COMPOUND: "groq/compound",
  GROQ_COMPOUND_MINI: "groq/compound-mini",
  CANOPY_ORPHEUS_ARABIC: "canopylabs/orpheus-arabic-saudi",
  CANOPY_ORPHEUS_ENGLISH: "canopylabs/orpheus-v1-english",
  LLAMA_4_MAVERICK_17B: "meta-llama/llama-4-maverick-17b-128e-instruct",
  LLAMA_4_SCOUT_17B: "meta-llama/llama-4-scout-17b-16e-instruct",
  LLAMA_PROMPT_GUARD_2_22M: "meta-llama/llama-prompt-guard-2-22m",
  META_PROMPT_GUARD_2_86M: "meta-llama/llama-prompt-guard-2-86m",
  KIMI_K2_0905: "moonshotai/kimi-k2-instruct-0905",
  OPENAI_SAFETY_GPT_OSS_20B: "openai/gpt-oss-safeguard-20b",
  QWEN_3_32B: "qwen/qwen3-32b",
} as const;

export const DEFAULT_QUIZ_MODEL = GEMINI_MODELS.FLASH;
export const DEFAULT_EXPLANATION_MODEL = GROQ_MODELS.LLAMA_3_1_8B_INSTANT;
