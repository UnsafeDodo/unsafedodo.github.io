"use client"

import type { SeasonPassConfig } from "../types"

interface StepProps {
  config: SeasonPassConfig
  setConfig: (config: SeasonPassConfig) => void
}

export default function StepProgression({ config, setConfig }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Progression Settings</h3>
        <p className="text-sm text-[#94a3b8]">Configure how players progress through the season pass levels.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Maximum Level <span className="text-[#ef4444]">*</span>
          </label>
          <input
            type="number"
            min="1"
            value={config.maxLevel}
            onChange={(e) => setConfig({ ...config, maxLevel: Number.parseInt(e.target.value) || 1 })}
            className="w-full rounded-lg border border-[#2d3748] bg-[#0f1419] px-4 py-2.5 text-[#e2e8f0] focus:border-[#5cb85c] focus:outline-none"
          />
          <p className="mt-1 text-xs text-[#94a3b8]">Total number of levels in this season pass (typically 50-100)</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            XP Per Level <span className="text-[#ef4444]">*</span>
          </label>
          <input
            type="number"
            min="1"
            value={config.xpPerLevel}
            onChange={(e) => setConfig({ ...config, xpPerLevel: Number.parseInt(e.target.value) || 1 })}
            className="w-full rounded-lg border border-[#2d3748] bg-[#0f1419] px-4 py-2.5 text-[#e2e8f0] focus:border-[#5cb85c] focus:outline-none"
          />
          <p className="mt-1 text-xs text-[#94a3b8]">Amount of XP required to advance one level</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Weekly XP Cap <span className="text-[#ef4444]">*</span>
          </label>
          <input
            type="number"
            min="0"
            value={config.weeklyXpCap}
            onChange={(e) => setConfig({ ...config, weeklyXpCap: Number.parseInt(e.target.value) || 0 })}
            className="w-full rounded-lg border border-[#2d3748] bg-[#0f1419] px-4 py-2.5 text-[#e2e8f0] focus:border-[#5cb85c] focus:outline-none"
          />
          <p className="mt-1 text-xs text-[#94a3b8]">Maximum XP a player can earn per week (0 = no cap)</p>
        </div>

        <div className="rounded-lg border border-[#5cb85c]/30 bg-[#5cb85c]/10 p-4">
          <h4 className="mb-2 font-semibold text-[#e2e8f0]">Progression Summary</h4>
          <div className="space-y-1 text-sm text-[#94a3b8]">
            <p>
              • Total XP to max out:{" "}
              <span className="font-semibold text-[#e2e8f0]">{config.maxLevel * config.xpPerLevel}</span>
            </p>
            <p>
              • Levels per week (at cap):{" "}
              <span className="font-semibold text-[#e2e8f0]">
                {config.weeklyXpCap > 0 ? Math.floor(config.weeklyXpCap / config.xpPerLevel) : "∞"}
              </span>
            </p>
            <p>
              • Weeks to complete (at cap):{" "}
              <span className="font-semibold text-[#e2e8f0]">
                {config.weeklyXpCap > 0 ? Math.ceil((config.maxLevel * config.xpPerLevel) / config.weeklyXpCap) : "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
