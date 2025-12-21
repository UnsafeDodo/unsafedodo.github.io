"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { type SeasonPassConfig, defaultConfig } from "@/src/types"
import StepCore from "@/src/components/StepCore"
import StepDailyMissions from "@/src/components/StepDailyMissions"
import StepDailyRewards from "@/src/components/StepDailyRewards"
import StepWeeklyMissions from "@/src/components/StepWeeklyMissions"
import StepSeasonalMissions from "@/src/components/StepSeasonalMissions"
import StepPassTiers from "@/src/components/StepPassTiers"
import StepSummary from "@/src/components/StepSummary"
import PreviewPanel from "@/src/components/PreviewPanel"

const STEPS = [
  { id: 1, title: "Core Settings", component: StepCore },
  { id: 2, title: "Daily Missions", component: StepDailyMissions },
  { id: 3, title: "Daily Rewards", component: StepDailyRewards },
  { id: 4, title: "Weekly Missions", component: StepWeeklyMissions },
  { id: 5, title: "Seasonal Missions", component: StepSeasonalMissions },
  { id: 6, title: "Pass Tiers", component: StepPassTiers },
  { id: 7, title: "Summary", component: StepSummary },
]

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1)
  const [config, setConfig] = useState<SeasonPassConfig>(defaultConfig)

  const isValidSeasonId = (id: string) => /^S\d+$/.test(id)
  const canProceed =
    currentStep !== 1 ||
    (config.seasonId && isValidSeasonId(config.seasonId) && config.displayName && config.startDate && config.endDate)

  const CurrentStepComponent = STEPS[currentStep - 1].component

  return (
    <div className="min-h-screen bg-[#0f1419] text-[#e2e8f0]">
      {/* Header */}
      <header className="border-b border-[#2d3748] bg-[#1a1f2e] px-6 py-4">
        <div className="mx-auto max-w-[1800px]">
          <h1 className="pixel-font text-xl text-[#5cb85c] sm:text-2xl">Season Pass Builder</h1>
          <p className="mt-1 text-sm text-[#94a3b8]">Configure your Minecraft Season Pass system</p>
        </div>
      </header>

      <div className="mx-auto max-w-[1800px] p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Step Progress */}
            <div className="rounded-lg border border-[#2d3748] bg-[#1a1f2e] p-6">
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
                {STEPS.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => setCurrentStep(step.id)}
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 font-bold transition-colors ${
                        currentStep === step.id
                          ? "border-[#5cb85c] bg-[#5cb85c] text-white"
                          : currentStep > step.id
                            ? "border-[#3498db] bg-[#3498db] text-white"
                            : "border-[#2d3748] bg-[#0f1419] text-[#94a3b8]"
                      }`}
                    >
                      {step.id}
                    </button>
                    {index < STEPS.length - 1 && (
                      <div className={`mx-2 h-0.5 w-8 ${currentStep > step.id ? "bg-[#3498db]" : "bg-[#2d3748]"}`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-lg font-semibold text-[#e2e8f0]">
                  Step {currentStep}: {STEPS[currentStep - 1].title}
                </h2>
              </div>
            </div>

            {/* Step Content */}
            <div className="rounded-lg border border-[#2d3748] bg-[#1a1f2e] p-6">
              <CurrentStepComponent config={config} setConfig={setConfig} />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="flex items-center gap-2 rounded-lg bg-[#2d3748] px-6 py-3 font-medium transition-colors hover:bg-[#3d4858] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft size={20} />
                Back
              </button>

              <button
                onClick={() => setCurrentStep(Math.min(STEPS.length, currentStep + 1))}
                disabled={currentStep === STEPS.length || !canProceed}
                className="flex items-center gap-2 rounded-lg bg-[#2d3748] px-6 py-3 font-medium transition-colors hover:bg-[#3d4858] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <PreviewPanel config={config} />
        </div>
      </div>
    </div>
  )
}
