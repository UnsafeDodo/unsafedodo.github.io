export interface Mission {
  id: string
  name: string // Renamed title to name to match server requirements
  description: string
  trigger: string // Changed from 'objective' to 'trigger' for clarity
  goal?: number
  filters?: Record<string, any> // Changed filters to accept any JSON object instead of just string key-value pairs
}

export interface WeeklyMission {
  id: string
  typeKey: string
  goal: number
  exp: number
  title: string
  desc: string
  filters?: Record<string, any>
}

export interface SeasonalMission {
  id: string
  typeKey: string
  goal: number
  exp: number
  title: string
  desc: string
  filters?: Record<string, any>
}

export interface PassTier {
  level: number
  free: string[]
  premium: string[]
}

export interface SeasonPassConfig {
  seasonId: string
  displayName: string
  startDate: string
  endDate: string

  maxLevel: number
  xpPerLevel: number
  weeklyXpCap: number

  dailyMissions: Mission[]
  dailyRewards: string[] // Added dailyRewards as an array of command strings
  weeklyMissions: WeeklyMission[]
  seasonalMissions: SeasonalMission[] // Changed from Mission[] to SeasonalMission[]

  passTiers: PassTier[]
}

export const defaultConfig: SeasonPassConfig = {
  seasonId: "S1",
  displayName: "Season 1: The Beginning",
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],

  maxLevel: 50,
  xpPerLevel: 1000,
  weeklyXpCap: 10000,

  dailyMissions: [],
  dailyRewards: [], // Added default empty dailyRewards array
  weeklyMissions: [],
  seasonalMissions: [], // Changed from Mission[] to SeasonalMission[]

  passTiers: [],
}
