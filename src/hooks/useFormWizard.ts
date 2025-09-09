"use client"

import { useState, useCallback } from "react"
import type { ApplicationData, PersonalInfo, AwardDirection, AchievementConfirmation } from "@/types/application.types"

export function useFormWizard(serviceId: number, serviceTitle: string) {
  const [currentStep, setCurrentStep] = useState(1)
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    personalInfo: {
      fullName: "",
      jshshir: "",
      region: "",
      district: "",
      neighborhood: "",
      phoneNumber: "",
    },
    awardDirection: {
      activityField: "",
      activityDescription: "",
    },
    achievementConfirmation: {
      recommendationLetter: null,
      certificates: [],
    },
    serviceId,
    serviceTitle,
  })

  const updatePersonalInfo = useCallback((data: Partial<PersonalInfo>) => {
    setApplicationData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
    }))
  }, [])

  const updateAwardDirection = useCallback((data: Partial<AwardDirection>) => {
    setApplicationData((prev) => ({
      ...prev,
      awardDirection: { ...prev.awardDirection, ...data },
    }))
  }, [])

  const updateAchievementConfirmation = useCallback((data: Partial<AchievementConfirmation>) => {
    setApplicationData((prev) => ({
      ...prev,
      achievementConfirmation: { ...prev.achievementConfirmation, ...data },
    }))
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }, [])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }, [])

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step)
  }, [])

  const resetForm = useCallback(() => {
    setCurrentStep(1)
    setApplicationData({
      personalInfo: {
        fullName: "",
        jshshir: "",
        region: "",
        district: "",
        neighborhood: "",
        phoneNumber: "",
      },
      awardDirection: {
        activityField: "",
        activityDescription: "",
      },
      achievementConfirmation: {
        recommendationLetter: null,
        certificates: [],
      },
      serviceId,
      serviceTitle,
    })
  }, [serviceId, serviceTitle])

  return {
    currentStep,
    applicationData,
    updatePersonalInfo,
    updateAwardDirection,
    updateAchievementConfirmation,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
  }
}
