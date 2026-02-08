"use client"

// User profile interface for localStorage-based state management
export interface UserStats {
  totalQuizzes: number
  accuracyScore: number
  hoursStudied: number
  dailyStreak: number
  currentLevel: number
  xpEarned: number
  xpToNextLevel: number
}

export interface UserProfile {
  name: string
  email: string
  image?: string
  agreedToTerms: boolean
  onboardingComplete: boolean
  tutorialComplete: boolean
  createdAt: string
  stats: UserStats
}

const STORAGE_KEY = "studyflow_user_profile"

// Default stats for new users
const defaultStats: UserStats = {
  totalQuizzes: 0,
  accuracyScore: 0,
  hoursStudied: 0,
  dailyStreak: 0,
  currentLevel: 1,
  xpEarned: 0,
  xpToNextLevel: 100,
}

/**
 * Get user profile from localStorage
 */
export function getUserProfile(): UserProfile | null {
  if (typeof window === "undefined") return null

  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null
    return JSON.parse(data) as UserProfile
  } catch {
    return null
  }
}

/**
 * Save user profile to localStorage
 */
export function saveUserProfile(profile: Partial<UserProfile> & { email: string }): UserProfile {
  const existing = getUserProfile()

  const newProfile: UserProfile = {
    name: profile.name || existing?.name || "",
    email: profile.email,
    image: profile.image || existing?.image,
    agreedToTerms: profile.agreedToTerms ?? existing?.agreedToTerms ?? false,
    onboardingComplete: profile.onboardingComplete ?? existing?.onboardingComplete ?? false,
    tutorialComplete: profile.tutorialComplete ?? existing?.tutorialComplete ?? false,
    createdAt: existing?.createdAt || new Date().toISOString(),
    stats: profile.stats || existing?.stats || { ...defaultStats },
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile))
  }

  return newProfile
}

/**
 * Clear user profile from localStorage
 */
export function clearUserProfile(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY)
  }
}

/**
 * Check if user has completed onboarding
 */
export function isOnboardingComplete(email?: string): boolean {
  const profile = getUserProfile()
  if (!profile) return false

  // If email is provided, verify it matches
  if (email && profile.email !== email) return false

  return profile.onboardingComplete && profile.agreedToTerms
}

/**
 * Update user stats
 */
export function updateUserStats(stats: Partial<UserStats>): void {
  const profile = getUserProfile()
  if (!profile) return

  profile.stats = { ...profile.stats, ...stats }
  saveUserProfile(profile)
}

/**
 * Check if user has completed tutorial
 */
export function isTutorialComplete(email?: string): boolean {
  const profile = getUserProfile()
  if (!profile) return false

  if (email && profile.email !== email) return false

  return profile.tutorialComplete
}

/**
 * Mark tutorial as complete
 */
export function markTutorialComplete(email: string): void {
  const profile = getUserProfile()
  if (!profile || profile.email !== email) return

  saveUserProfile({ ...profile, tutorialComplete: true })
}
