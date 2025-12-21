"use client"

import { CheckCircle2, AlertCircle, Download } from "lucide-react"
import { useState } from "react"
import type { SeasonPassConfig } from "../types"
import JSZip from "jszip"

interface StepProps {
  config: SeasonPassConfig
}

export default function StepSummary({ config }: StepProps) {
  const [activeJsonTab, setActiveJsonTab] = useState<"daily" | "dailyrewards" | "weekly" | "seasonal" | "pass_tiers">(
    "daily",
  )

  const validations = [
    { label: "Season ID set", valid: config.seasonId.length > 0 && /^S\d+$/.test(config.seasonId) },
    { label: "Display name set", valid: config.displayName.length > 0 },
    { label: "Valid date range", valid: new Date(config.endDate) > new Date(config.startDate) },
    {
      label: "At least 1 mission",
      valid: config.dailyMissions.length + config.weeklyMissions.length + config.seasonalMissions.length > 0,
    },
    {
      label: "At least 1 pass tier or daily reward",
      valid: config.passTiers.length > 0 || config.dailyRewards.length > 0,
    },
  ]

  const allValid = validations.every((v) => v.valid)

  const jsonExports = {
    daily: config.dailyMissions,
    dailyrewards: config.dailyRewards,
    weekly: config.weeklyMissions,
    seasonal: config.seasonalMissions,
    pass_tiers: config.passTiers,
  }

  const handleExport = async () => {
    const zip = new JSZip()
    const seasonFolder = zip.folder(config.seasonId)

    if (!seasonFolder) return

    seasonFolder.file("daily.json", JSON.stringify(config.dailyMissions, null, 2))
    seasonFolder.file("dailyrewards.json", JSON.stringify(config.dailyRewards, null, 2))
    seasonFolder.file("weekly.json", JSON.stringify(config.weeklyMissions, null, 2))
    seasonFolder.file("seasonal.json", JSON.stringify(config.seasonalMissions, null, 2))
    seasonFolder.file("pass_tiers.json", JSON.stringify(config.passTiers, null, 2))

    // Generate the ZIP file
    const blob = await zip.generateAsync({ type: "blob" })

    // Download the ZIP file
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${config.seasonId}.zip`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Configuration Summary</h3>
        <p className="text-sm text-[#94a3b8]">Review your season pass configuration before exporting.</p>
      </div>

      {/* Validation Status */}
      <div className="rounded-lg border border-[#2d3748] bg-[#0f1419] p-6">
        <h4 className="mb-4 font-semibold text-[#e2e8f0]">Validation Checklist</h4>
        <div className="space-y-2">
          {validations.map((validation, index) => (
            <div key={index} className="flex items-center gap-3">
              {validation.valid ? (
                <CheckCircle2 size={18} className="text-[#5cb85c]" />
              ) : (
                <AlertCircle size={18} className="text-[#ef4444]" />
              )}
              <span className={validation.valid ? "text-[#94a3b8]" : "text-[#ef4444]"}>{validation.label}</span>
            </div>
          ))}
        </div>

        {allValid ? (
          <div className="mt-4 rounded-lg border border-[#5cb85c]/30 bg-[#5cb85c]/10 p-4">
            <p className="text-sm text-[#5cb85c]">✓ Configuration is valid and ready to export!</p>
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 p-4">
            <p className="text-sm text-[#ef4444]">⚠ Please fix the validation errors before exporting.</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-[#2d3748] bg-[#0f1419] p-4">
          <h4 className="mb-3 font-semibold text-[#e2e8f0]">Season Overview</h4>
          <div className="space-y-2 text-sm text-[#94a3b8]">
            <p>• ID: {config.seasonId}</p>
            <p>• Name: {config.displayName}</p>
            <p>
              • Duration: {(() => {
                const start = new Date(config.startDate)
                const end = new Date(config.endDate)
                const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
                return `${days} days (${Math.floor(days / 7)} weeks)`
              })()}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-[#2d3748] bg-[#0f1419] p-4">
          <h4 className="mb-3 font-semibold text-[#e2e8f0]">Content Stats</h4>
          <div className="space-y-2 text-sm text-[#94a3b8]">
            <p>• Daily missions: {config.dailyMissions.length}</p>
            <p>• Weekly missions: {config.weeklyMissions.length}</p>
            <p>• Seasonal missions: {config.seasonalMissions.length}</p>
            <p>• Daily rewards: {config.dailyRewards.length}</p>
            <p>• Pass tiers: {config.passTiers.length} levels</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleExport}
          disabled={!allValid}
          className={`flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors ${
            allValid ? "bg-[#5cb85c] text-white hover:bg-[#4a9e4a]" : "cursor-not-allowed bg-[#2d3748] text-[#64748b]"
          }`}
        >
          <Download size={20} />
          Export Season {config.seasonId}
        </button>
      </div>

      {/* JSON Preview with Tabs */}
      <div className="rounded-lg border border-[#2d3748] bg-[#0f1419] p-4">
        <h4 className="mb-3 font-semibold text-[#e2e8f0]">JSON Preview</h4>

        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveJsonTab("daily")}
            className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
              activeJsonTab === "daily" ? "bg-[#5cb85c] text-white" : "bg-[#2d3748] text-[#94a3b8] hover:bg-[#3d4758]"
            }`}
          >
            daily.json
          </button>
          <button
            onClick={() => setActiveJsonTab("dailyrewards")}
            className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
              activeJsonTab === "dailyrewards"
                ? "bg-[#5cb85c] text-white"
                : "bg-[#2d3748] text-[#94a3b8] hover:bg-[#3d4758]"
            }`}
          >
            dailyrewards.json
          </button>
          <button
            onClick={() => setActiveJsonTab("weekly")}
            className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
              activeJsonTab === "weekly" ? "bg-[#5cb85c] text-white" : "bg-[#2d3748] text-[#94a3b8] hover:bg-[#3d4758]"
            }`}
          >
            weekly.json
          </button>
          <button
            onClick={() => setActiveJsonTab("seasonal")}
            className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
              activeJsonTab === "seasonal"
                ? "bg-[#5cb85c] text-white"
                : "bg-[#2d3748] text-[#94a3b8] hover:bg-[#3d4758]"
            }`}
          >
            seasonal.json
          </button>
          <button
            onClick={() => setActiveJsonTab("pass_tiers")}
            className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
              activeJsonTab === "pass_tiers"
                ? "bg-[#5cb85c] text-white"
                : "bg-[#2d3748] text-[#94a3b8] hover:bg-[#3d4758]"
            }`}
          >
            pass_tiers.json
          </button>
        </div>

        <pre className="max-h-96 overflow-auto rounded bg-[#000000] p-4 text-xs text-[#94a3b8]">
          {JSON.stringify(jsonExports[activeJsonTab], null, 2)}
        </pre>
      </div>
    </div>
  )
}
