"use client"

import type { FormStep } from "@/types/application.types"

interface ProgressIndicatorProps {
  steps: FormStep[]
  onStepClick: (stepId: number) => void
}

export default function ProgressIndicator({ steps, onStepClick }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={`flex-1 text-center py-3 px-2 text-sm font-medium transition-colors ${
              step.isActive
                ? "text-white border-b-2 border-blue-400"
                : step.isCompleted
                  ? "text-blue-200 hover:text-white"
                  : "text-blue-300 hover:text-blue-200"
            }`}
          >
            {step.title}
          </button>
        ))}
      </div>
      <div className="w-full bg-blue-800 rounded-full h-1">
        <div
          className="bg-blue-400 h-1 rounded-full transition-all duration-300"
          style={{ width: `${(steps.filter((s) => s.isCompleted).length / steps.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
