export interface PersonalInfo {
    fullName: string
    jshshir: string
    region: string
    district: string
    neighborhood: string
    phoneNumber: string
}

export interface AwardDirection {
    activityField: string
    activityDescription: string
    source: string
}

export interface AchievementConfirmation {
    recommendationLetter: File | null
    certificates: File[]
}

export interface ApplicationData {
    personalInfo: PersonalInfo
    awardDirection: AwardDirection
    achievementConfirmation: AchievementConfirmation
    serviceId: number
    serviceTitle: string
}

export interface FormStep {
    id: number
    title: string
    isCompleted: boolean
    isActive: boolean
}
  