"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import type { SeasonPassConfig, Reward } from "../types"

interface StepProps {
  config: SeasonPassConfig
  setConfig: (config: SeasonPassConfig) => void
}

export default function StepRewards({ config, setConfig }: StepProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const addReward = () => {
    const newReward: Reward = {
      level: config.rewards.length + 1,
      type: "free",
      rewardType: "item",
      rewardId: "minecraft:diamond",
      rewardName: "Diamond",
      amount: 1,
    }
    setConfig({ ...config, rewards: [...config.rewards, newReward] })
    setEditingIndex(config.rewards.length)
  }

  const updateReward = (index: number, updated: Reward) => {
    const newRewards = [...config.rewards]
    newRewards[index] = updated
    setConfig({ ...config, rewards: newRewards })
  }

  const deleteReward = (index: number) => {
    setConfig({ ...config, rewards: config.rewards.filter((_, i) => i !== index) })
    setEditingIndex(null)
  }

  const sortedRewards = [...config.rewards].sort((a, b) => a.level - b.level)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Reward Tiers</h3>
        <p className="text-sm text-[#94a3b8]">
          Configure rewards for each level. Create both free and premium tier rewards.
        </p>
      </div>

      <div className="space-y-4">
        {sortedRewards.map((reward, index) => {
          const originalIndex = config.rewards.findIndex((r) => r === reward)
          return (
            <div
              key={originalIndex}
              className={`rounded-lg border p-4 ${
                reward.type === "premium" ? "border-[#3498db] bg-[#3498db]/5" : "border-[#2d3748] bg-[#0f1419]"
              }`}
            >
              {editingIndex === originalIndex ? (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="number"
                      value={reward.level}
                      onChange={(e) =>
                        updateReward(originalIndex, { ...reward, level: Number.parseInt(e.target.value) || 1 })
                      }
                      placeholder="Level"
                      className="rounded border border-[#2d3748] bg-[#1a1f2e] px-3 py-2 text-sm"
                    />
                    <select
                      value={reward.type}
                      onChange={(e) =>
                        updateReward(originalIndex, { ...reward, type: e.target.value as "free" | "premium" })
                      }
                      className="rounded border border-[#2d3748] bg-[#1a1f2e] px-3 py-2 text-sm"
                    >
                      <option value="free">Free Tier</option>
                      <option value="premium">Premium Tier</option>
                    </select>
                  </div>
                  <select
                    value={reward.rewardType}
                    onChange={(e) => updateReward(originalIndex, { ...reward, rewardType: e.target.value as any })}
                    className="w-full rounded border border-[#2d3748] bg-[#1a1f2e] px-3 py-2 text-sm"
                  >
                    <option value="item">Item</option>
                    <option value="currency">Currency</option>
                    <option value="cosmetic">Cosmetic</option>
                    <option value="title">Title</option>
                  </select>
                  <input
                    type="text"
                    value={reward.rewardId}
                    onChange={(e) => updateReward(originalIndex, { ...reward, rewardId: e.target.value })}
                    placeholder="Reward ID (e.g., minecraft:diamond)"
                    className="w-full rounded border border-[#2d3748] bg-[#1a1f2e] px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={reward.rewardName}
                    onChange={(e) => updateReward(originalIndex, { ...reward, rewardName: e.target.value })}
                    placeholder="Display Name"
                    className="w-full rounded border border-[#2d3748] bg-[#1a1f2e] px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    value={reward.amount}
                    onChange={(e) =>
                      updateReward(originalIndex, { ...reward, amount: Number.parseInt(e.target.value) || 1 })
                    }
                    placeholder="Amount"
                    className="w-full rounded border border-[#2d3748] bg-[#1a1f2e] px-3 py-2 text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="rounded bg-[#5cb85c] px-4 py-1.5 text-sm font-medium hover:bg-[#4a9d4a]"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => deleteReward(originalIndex)}
                      className="flex items-center gap-1 rounded bg-[#ef4444] px-4 py-1.5 text-sm font-medium hover:bg-[#dc2626]"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div onClick={() => setEditingIndex(originalIndex)} className="cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a1f2e] font-bold">
                        {reward.level}
                      </span>
                      <div>
                        <h4 className="font-semibold text-[#e2e8f0]">{reward.rewardName}</h4>
                        <p className="text-xs text-[#94a3b8]">
                          {reward.rewardType} × {reward.amount}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        reward.type === "premium" ? "bg-[#3498db] text-white" : "bg-[#5cb85c] text-white"
                      }`}
                    >
                      {reward.type === "premium" ? "⭐ Premium" : "🆓 Free"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        <button
          onClick={addReward}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#2d3748] py-4 text-sm font-medium text-[#94a3b8] transition-colors hover:border-[#5cb85c] hover:text-[#5cb85c]"
        >
          <Plus size={18} />
          Add Reward
        </button>
      </div>
    </div>
  )
}
