"use client"

import type { SeasonPassConfig } from "../types"

interface StepProps {
  config: SeasonPassConfig
  setConfig: (config: SeasonPassConfig) => void
}

export default function StepCore({ config, setConfig }: StepProps) {
  const isValidSeasonId = (id: string) => /^S\d+$/.test(id)
  const seasonIdError = config.seasonId && !isValidSeasonId(config.seasonId)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Core Season Settings</h3>
        <p className="text-sm text-[#94a3b8]">Define the basic information for your season pass.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Season ID <span className="text-[#ef4444]">*</span>
          </label>
          <input
            type="text"
            value={config.seasonId}
            onChange={(e) => setConfig({ ...config, seasonId: e.target.value })}
            placeholder="S1"
            className={`w-full rounded-lg border ${
              seasonIdError ? "border-[#ef4444]" : "border-[#2d3748]"
            } bg-[#0f1419] px-4 py-2.5 text-[#e2e8f0] placeholder-[#94a3b8] focus:border-[#5cb85c] focus:outline-none`}
          />
          {seasonIdError && <p className="mt-1 text-xs text-[#ef4444]">Must follow pattern: S1, S2, S3, etc.</p>}
          <p className="mt-1 text-xs text-[#94a3b8]">Required format: S followed by a number (e.g., S1, S2, S3)</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Display Name <span className="text-[#ef4444]">*</span>
          </label>
          <input
            type="text"
            value={config.displayName}
            onChange={(e) => setConfig({ ...config, displayName: e.target.value })}
            placeholder="Season 1: The Beginning"
            className="w-full rounded-lg border border-[#2d3748] bg-[#0f1419] px-4 py-2.5 text-[#e2e8f0] placeholder-[#94a3b8] focus:border-[#5cb85c] focus:outline-none"
          />
          <p className="mt-1 text-xs text-[#94a3b8]">Player-facing name that will be shown in-game</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Start Date <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="date"
              value={config.startDate}
              onChange={(e) => setConfig({ ...config, startDate: e.target.value })}
              className="w-full rounded-lg border border-[#2d3748] bg-[#0f1419] px-4 py-2.5 text-[#e2e8f0] focus:border-[#5cb85c] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              End Date <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="date"
              value={config.endDate}
              onChange={(e) => setConfig({ ...config, endDate: e.target.value })}
              className="w-full rounded-lg border border-[#2d3748] bg-[#0f1419] px-4 py-2.5 text-[#e2e8f0] focus:border-[#5cb85c] focus:outline-none"
            />
          </div>
        </div>

        <div className="rounded-lg border border-[#3498db]/30 bg-[#3498db]/10 p-4">
          <p className="text-sm text-[#94a3b8]">
            ℹ️ Season duration: {(() => {
              const start = new Date(config.startDate)
              const end = new Date(config.endDate)
              const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
              return `${days} days (${Math.floor(days / 7)} weeks)`
            })()}
          </p>
        </div>
      </div>
    </div>
  )
}
