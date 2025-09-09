"use client"

import { useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useFormWizard } from "@/hooks/useFormWizard"
import ProgressIndicator from "./ProgressIndicator"
import PersonalInfoStep from "./PersonalInfoStep"
import AwardDirectionStep from "./AwardDirectionStep"
import AchievementConfirmationStep from "./AchievementConfirmationStep"
import InformationConfirmationStep from "./InformationConfirmationStep"

interface ApplicationWizardProps {
  isOpen: boolean
  onClose: () => void
  service: {
    id: number
    title: string
    image: string
  } | null
}

export default function ApplicationWizard({ isOpen, onClose, service }: ApplicationWizardProps) {
  const {
    currentStep,
    applicationData,
    updatePersonalInfo,
    updateAwardDirection,
    updateAchievementConfirmation,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
  } = useFormWizard(service?.id || 0, service?.title || "")

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen, resetForm])

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = () => {
    console.log("Application submitted:", applicationData)
    // Here you would typically send the data to your backend
    alert("Ariza muvaffaqiyatli yuborildi!")
    handleClose()
  }

  const renderCurrentStep = () => {
    if (!service) return null

    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={applicationData.personalInfo}
            onUpdate={updatePersonalInfo}
            onNext={nextStep}
            onCancel={handleClose}
          />
        )
      case 2:
        return (
          <AwardDirectionStep
            data={applicationData.awardDirection}
            onUpdate={updateAwardDirection}
            onNext={nextStep}
            onPrev={prevStep}
            onCancel={handleClose}
          />
        )
      case 3:
        return (
          <AchievementConfirmationStep
            data={applicationData.achievementConfirmation}
            onUpdate={updateAchievementConfirmation}
            onNext={nextStep}
            onPrev={prevStep}
            onCancel={handleClose}
          />
        )
      case 4:
        return (
          <InformationConfirmationStep
            data={applicationData}
            onSubmit={handleSubmit}
            onPrev={prevStep}
            onCancel={handleClose}
          />
        )
      default:
        return null
    }
  }

  if (!service) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#002B5C] border-none text-white p-0">
        <div className="relative">
          {/* Close button */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button> */}

          <div className="p-6">
            {/* Header */}
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center flex-shrink-0">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-[30px] h-full object-cover"
                  />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-white mb-1">Ariza berish</DialogTitle>
                  <p className="text-blue-200 text-sm">
                    Ushbu bo'lim yuborilgan barcha arizalaringizni tartibli ko'rinishda taqdim etiladi.
                  </p>
                  <p className="text-white font-medium mt-2">{service.title}</p>
                </div>
              </div>
            </DialogHeader>

            {/* Progress Indicator */}
            <ProgressIndicator
              steps={[
                { id: 1, title: "Shaxsiy ma'lumotlar", isCompleted: currentStep > 1, isActive: currentStep === 1 },
                { id: 2, title: "Mukofot yo'nalishi", isCompleted: currentStep > 2, isActive: currentStep === 2 },
                { id: 3, title: "Yutuqlarni tasdiqlash", isCompleted: currentStep > 3, isActive: currentStep === 3 },
                { id: 4, title: "Ma'lumotlarni tasdiqlash", isCompleted: currentStep > 4, isActive: currentStep === 4 },
              ]}
              onStepClick={goToStep}
            />

            {/* Current Step Content */}
            {renderCurrentStep()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
