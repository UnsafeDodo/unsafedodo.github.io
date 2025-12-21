import type { SeasonPassConfig } from "../types"

interface PreviewPanelProps {
  config: SeasonPassConfig
}

export default function PreviewPanel({ config }: PreviewPanelProps) {
  const totalWeeklyXp = config.weeklyMissions.reduce((sum, m) => sum + (m.exp || 0), 0)
  const totalSeasonalXp = config.seasonalMissions.reduce((sum, m) => sum + (m.exp || 0), 0)

  return (
    <div className="sticky top-6 h-fit rounded-lg border border-[#2d3748] bg-[#1a1f2e] p-6">
      <h3 className="mb-4 text-lg font-semibold text-[#5cb85c]">Live Preview</h3>

      <div className="space-y-4 text-sm">
        <div>
          <h4 className="mb-2 font-semibold text-[#e2e8f0]">Season Info</h4>
          <div className="space-y-1 rounded-lg bg-[#0f1419] p-3 text-[#94a3b8]">
            <p>
              <span className="text-[#e2e8f0]">ID:</span> {config.seasonId || "Not set"}
            </p>
            <p>
              <span className="text-[#e2e8f0]">Name:</span> {config.displayName || "Not set"}
            </p>
            <p>
              <span className="text-[#e2e8f0]">Duration:</span> {config.startDate} to {config.endDate}
            </p>
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-semibold text-[#e2e8f0]">Missions</h4>
          <div className="space-y-2 rounded-lg bg-[#0f1419] p-3 text-[#94a3b8]">
            <div>
              <p className="font-medium text-[#e2e8f0]">Daily Missions: {config.dailyMissions.length}</p>
              {config.dailyMissions.length > 0 && (
                <p className="text-xs pl-2">
                  Triggers: {config.dailyMissions.map((m) => m.trigger).filter(Boolean).length} configured
                </p>
              )}
            </div>
            <div>
              <p className="font-medium text-[#e2e8f0]">Weekly Missions: {config.weeklyMissions.length}</p>
              {config.weeklyMissions.length > 0 && (
                <p className="text-xs pl-2">
                  Total XP: {totalWeeklyXp} | Avg Goal:{" "}
                  {Math.round(
                    config.weeklyMissions.reduce((sum, m) => sum + (m.goal || 0), 0) / config.weeklyMissions.length ||
                      0,
                  )}
                </p>
              )}
            </div>
            <div>
              <p className="font-medium text-[#e2e8f0]">Seasonal Missions: {config.seasonalMissions.length}</p>
              {config.seasonalMissions.length > 0 && (
                <p className="text-xs pl-2">
                  Total XP: {totalSeasonalXp} | Avg Goal:{" "}
                  {Math.round(
                    config.seasonalMissions.reduce((sum, m) => sum + (m.goal || 0), 0) /
                      config.seasonalMissions.length || 0,
                  )}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-semibold text-[#e2e8f0]">Rewards</h4>
          <div className="space-y-2 rounded-lg bg-[#0f1419] p-3 text-[#94a3b8]">
            <div>
              <p className="font-medium text-[#e2e8f0]">Daily Rewards: {config.dailyRewards.length}</p>
              {config.dailyRewards.length > 0 && (
                <p className="text-xs pl-2">
                  {config.dailyRewards.length} command{config.dailyRewards.length !== 1 ? "s" : ""} per day
                </p>
              )}
            </div>
            <div>
              <p className="font-medium text-[#e2e8f0]">Pass Tiers: {config.passTiers.length}</p>
              {config.passTiers.length > 0 && (
                <>
                  <p className="text-xs pl-2">
                    Free: {config.passTiers.reduce((sum, tier) => sum + tier.free.length, 0)} rewards
                  </p>
                  <p className="text-xs pl-2">
                    Premium: {config.passTiers.reduce((sum, tier) => sum + tier.premium.length, 0)} rewards
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-[#5cb85c]/30 bg-[#5cb85c]/10 p-4">
        <p className="text-xs leading-relaxed text-[#94a3b8]">
          💡 <span className="font-semibold text-[#e2e8f0]">Tip:</span> Navigate through each step to configure your
          season pass. Export the final JSON to use in your Minecraft server.
        </p>
      </div>
    </div>
  )
}
