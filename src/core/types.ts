export type FactionId = 'USA' | 'GLA' | 'CHINA' | 'NEUTRAL';

export type GeneralId =
  | 'USA_STANDARD'
  | 'USA_AIRFORCE'     // General Malcolm "Ace" Granger
  | 'USA_LASER'        // General "Pinpoint" Townes
  | 'USA_SUPERWEAPON'  // General Alexis Alexander
  | 'GLA_STANDARD'
  | 'GLA_TOXIN'        // Dr. Thrax
  | 'GLA_DEMO'         // General Rodall "Demo" Juhziz
  | 'GLA_STEALTH'      // Prince Kassad
  | 'CHINA_STANDARD'
  | 'CHINA_TANK'       // General Ta Hun Kwai
  | 'CHINA_INFANTRY'   // General "Anvil" Shin Fai
  | 'CHINA_NUKE';      // General Tsing Shi Tao

export type DamageType =
  | 'SMALL_ARMS'
  | 'ARMOR_PIERCING'
  | 'EXPLOSIVE'
  | 'GATTLING'
  | 'LASER'
  | 'FLAME'
  | 'TOXIN'
  | 'SNIPER'
  | 'PARTICLE'
  | 'RADIATION'
  | 'MELEE_C4';

export type ArmorType =
  | 'INFANTRY'
  | 'LIGHT_VEHICLE'
  | 'HEAVY_ARMOR'
  | 'AIRCRAFT'
  | 'STRUCTURE'
  | 'FORTIFIED'
  | 'HERO';

export type VeterancyLevel = 0 | 1 | 2 | 3; // Regular, Veteran, Elite, Heroic

export type EntityCategory = 'UNIT' | 'BUILDING';

export type UnitLocomotion =
  | 'INFANTRY'
  | 'WHEELED'
  | 'TRACKED'
  | 'HOVER'
  | 'HELICOPTER'
  | 'JET';

export type Stance = 'AGGRESSIVE' | 'GUARD' | 'HOLD_GROUND';

export type OrderType =
  | 'IDLE'
  | 'MOVE'
  | 'ATTACK_MOVE'
  | 'ATTACK_TARGET'
  | 'PATROL'
  | 'CONSTRUCT'
  | 'REPAIR'
  | 'HARVEST'
  | 'RETURN_CARGO'
  | 'CAPTURE'
  | 'GARRISON'
  | 'SPECIAL_ABILITY'
  | 'HACK_CASH';

export type TerrainType =
  | 'SAND'
  | 'GRASS'
  | 'ROAD'
  | 'WATER'
  | 'CLIFF'
  | 'BRIDGE'
  | 'URBAN';

export type OverlordAddonType = 'NONE' | 'GATTLING' | 'SPEAKER' | 'BUNKER';

export type StrategyPlanType = 'NONE' | 'BOMBARDMENT' | 'HOLD_THE_LINE' | 'SEARCH_AND_DESTROY';

export interface Vec2 {
  x: number;
  y: number;
}

export interface WeaponStats {
  name: string;
  damage: number;
  damageType: DamageType;
  range: number;
  minRange?: number;
  cooldown: number; // seconds between shots
  splashRadius: number;
  projectileSpeed: number; // 0 for instant hitscan/laser
  projectileArc: number; // 0 = flat, >0 = parabolic arc height factor
  canTargetAir: boolean;
  canTargetGround: boolean;
  isGuided?: boolean; // Can be intercepted by point-defense laser or deflected by ECM
  leavesHazard?: 'TOXIN' | 'NAPALM' | 'RADIATION';
  clearsGarrison?: boolean;
  snipesDriver?: boolean;
  spinsUp?: boolean; // Gattling weapons accelerate fire rate
  burstCount?: number;
}

export interface AbilityDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  cooldown: number;
  cost?: number;
  targetType: 'NONE' | 'POINT' | 'UNIT_OR_BUILDING' | 'BUILDING_ONLY' | 'VEHICLE_ONLY';
  range?: number;
  requiresUpgrade?: string;
}

export interface UnitBlueprint {
  id: string;
  name: string;
  faction: FactionId;
  cost: number;
  buildTime: number; // seconds
  maxHp: number;
  armor: ArmorType;
  locomotion: UnitLocomotion;
  speed: number; // world units per second
  turnSpeed: number; // radians per second
  radius: number;
  sightRange: number;
  isBuilder?: boolean;
  isHarvester?: boolean;
  harvestCapacity?: number;
  canCrushInfantry?: boolean;
  canBeCrushed?: boolean;
  isStealth?: boolean;
  stealthWhenStill?: boolean;
  isDetector?: boolean;
  detectorRange?: number;
  isHero?: boolean;
  maxInstances?: number;
  spawnCount?: number; // e.g., Red Guard spawns 2
  transportSlots?: number;
  fireports?: boolean; // passengers can shoot out (Humvee, Overlord Bunker, Helix)
  hasPointDefenseLaser?: boolean; // Paladin, Avenger, Airforce King Raptor
  pdlCooldown?: number;
  hasEcmField?: boolean; // China ECM Tank
  canSalvage?: boolean; // GLA vehicles
  hasHordeBonus?: boolean; // China Red Guard, Tank Hunter, Battlemaster
  healsInfantryAura?: boolean; // USA Ambulance
  propagandaAura?: boolean; // Speaker Tower addon
  producedAt: string; // Building blueprint ID
  prerequisites: string[]; // Building or Upgrade IDs
  primaryWeapon?: WeaponStats;
  secondaryWeapon?: WeaponStats; // e.g. anti-air or salvage upgraded weapon
  abilities: AbilityDefinition[];
  description: string;
  hotkey: string;
}

export interface BuildingBlueprint {
  id: string;
  name: string;
  faction: FactionId;
  cost: number;
  buildTime: number;
  maxHp: number;
  armor: ArmorType;
  footprint: { w: number; h: number }; // in grid tiles
  radius: number;
  sightRange: number;
  powerOutput: number; // >0 generates, <0 consumes
  providesRadar?: boolean;
  isCommandCenter?: boolean;
  isSupplyDropoff?: boolean;
  isSupplySource?: boolean;
  initialSupplies?: number;
  passiveIncomePerSec?: number; // Oil Derrick, Black Market, Supply Drop Zone
  globalVehicleRepair?: boolean; // Tech Repair Bay
  isSuperweapon?: boolean;
  superweaponType?: 'PARTICLE_CANNON' | 'NUCLEAR_MISSILE' | 'SCUD_STORM';
  superweaponCooldown?: number;
  isDefense?: boolean;
  isTunnelNetwork?: boolean; // Shared GLA tunnel garrison
  garrisonCapacity?: number;
  isGarrisonableNeutral?: boolean;
  isCapturableNeutral?: boolean;
  leavesRebuildHole?: boolean; // GLA buildings leave a hole when destroyed
  isRebuildHole?: boolean;
  isDetector?: boolean;
  detectorRange?: number;
  isStealth?: boolean; // Demo trap, Camo netted buildings
  propagandaAura?: boolean; // China Speaker Tower
  freeUnitOnBuild?: string; // Supply Center / Supply Stash spawns free harvester
  prerequisites: string[];
  trainsUnits: string[];
  researchesUpgrades: string[];
  primaryWeapon?: WeaponStats;
  abilities: AbilityDefinition[];
  description: string;
  hotkey: string;
}

export interface UpgradeBlueprint {
  id: string;
  name: string;
  faction: FactionId;
  cost: number;
  researchTime: number;
  researchedAt: string;
  prerequisites: string[];
  description: string;
  icon: string;
}

export interface GeneralPowerBlueprint {
  id: string;
  name: string;
  faction: FactionId;
  minRank: number; // 1, 3, or 5
  pointCost: number;
  cooldown: number; // 0 for passive unlocks
  isPassive?: boolean;
  unlocksUnit?: string;
  targetType: 'NONE' | 'POINT';
  radius?: number;
  description: string;
  icon: string;
}

export interface GeneralDefinition {
  id: GeneralId;
  name: string;
  title: string;
  faction: FactionId;
  portraitColor: string;
  accentColor: string;
  quote: string;
  specialties: string[];
  costMultipliers: Record<string, number>;
  hpMultipliers: Record<string, number>;
  damageMultipliers: Record<string, number>;
  speedMultipliers: Record<string, number>;
  powerBonus?: number;
  startingUpgrades?: string[];
}

export interface ProductionItem {
  id: string;
  kind: 'UNIT' | 'UPGRADE';
  progress: number; // seconds elapsed
  totalTime: number;
  costPaid: number;
}

export interface EntityOrder {
  type: OrderType;
  targetPos?: Vec2;
  targetEntityId?: number;
  blueprintId?: string;
  abilityId?: string;
  patrolOrigin?: Vec2;
}

export interface EntityState {
  id: number;
  blueprintId: string;
  category: EntityCategory;
  playerId: number;
  faction: FactionId;
  pos: Vec2;
  vel: Vec2;
  rotation: number;
  turretRotation: number;
  hp: number;
  maxHp: number;
  veterancy: VeterancyLevel;
  xp: number;
  salvageLevel: number; // 0, 1, 2 for GLA vehicles
  stance: Stance;
  order: EntityOrder;
  path: Vec2[];
  weaponCooldown: number;
  secondaryCooldown: number;
  pdlCooldown: number; // Point-defense laser cooldown
  spinUpLevel: number; // 0..1 for Gattling weapons
  abilityCooldowns: Record<string, number>;

  // Construction & Production
  isConstructing: boolean;
  constructionProgress: number; // 0..1
  productionQueue: ProductionItem[];
  rallyPoint?: Vec2;

  // Harvester / Resource state
  suppliesCarried: number;
  supplyRemaining: number; // For Supply Docks
  assignedSupplyId?: number;
  assignedDropoffId?: number;

  // Garrison / Transport / Tunnel
  garrisonedIds: number[];
  containerId?: number; // If inside a transport, building, or tunnel

  // Special Faction Mechanics
  overlordAddon: OverlordAddonType;
  strategyPlan: StrategyPlanType;
  nuclearOvercharge: boolean;
  rebuildTargetBlueprint?: string;
  rebuildTimer: number;
  disguisedAsBlueprint?: string;

  // Status effects & buffs
  disabledTimer: number; // EMP / Black Lotus disable
  frenzyTimer: number; // China Frenzy power
  hordeActive: boolean;
  propagandaActive: boolean;
  stealthActive: boolean;
  detectedTimer: number;
  hackerRankTimer: number;
  incomeTickTimer: number;

  // Aircraft state
  altitude: number;
  ammo: number;
  maxAmmo: number;
  homeAirfieldId?: number;
}

export interface ProjectileState {
  id: number;
  playerId: number;
  sourceEntityId: number;
  pos: Vec2;
  startPos: Vec2;
  targetPos: Vec2;
  targetEntityId?: number;
  speed: number;
  arcHeight: number;
  progress: number; // 0..1 for parabolic shells
  totalDist: number;
  damage: number;
  damageType: DamageType;
  splashRadius: number;
  isGuided: boolean;
  leavesHazard?: 'TOXIN' | 'NAPALM' | 'RADIATION';
  clearsGarrison?: boolean;
  snipesDriver?: boolean;
  color: string;
}

export interface HazardZoneState {
  id: number;
  playerId: number;
  type: 'TOXIN' | 'NAPALM' | 'RADIATION' | 'FIRESTORM';
  pos: Vec2;
  radius: number;
  damagePerSec: number;
  damageType: DamageType;
  remainingTime: number;
  maxTime: number;
  upgraded?: boolean; // Anthrax Beta / Black Napalm
}

export interface CrateState {
  id: number;
  type: 'SALVAGE' | 'CASH';
  pos: Vec2;
  value: number;
  remainingTime: number;
}

export interface ActiveSuperweaponTimer {
  id: string;
  playerId: number;
  buildingId: number;
  name: string;
  type: 'PARTICLE_CANNON' | 'NUCLEAR_MISSILE' | 'SCUD_STORM';
  remainingTime: number;
  totalTime: number;
}

export interface ActiveOrbitalBeam {
  id: number;
  playerId: number;
  pos: Vec2;
  targetPos: Vec2;
  remainingTime: number;
}

export interface VisualEffectState {
  id: number;
  type:
    | 'EXPLOSION'
    | 'LASER_BEAM'
    | 'PDL_ZAP'
    | 'MUZZLE_FLASH'
    | 'NUKE_BLAST'
    | 'HEAL_PULSE'
    | 'CASH_FLOAT'
    | 'CRATER'
    | 'AIRSTRIKE_JET'
    | 'PARADROP_PLANE'
    | 'RADAR_PING';
  pos: Vec2;
  endPos?: Vec2;
  radius: number;
  color: string;
  text?: string;
  elapsed: number;
  duration: number;
  payload?: {
    playerId?: number;
    dropTriggered?: boolean;
    targetPos?: Vec2;
    powerId?: string;
  };
}

export type AIDifficulty = 'CASUAL' | 'TACTICAL' | 'BRUTAL';

export interface PlayerState {
  id: number;
  name: string;
  faction: FactionId;
  general: GeneralId;
  team: number;
  color: string;
  isHuman: boolean;
  aiDifficulty: AIDifficulty;
  credits: number;
  powerProduced: number;
  powerConsumed: number;
  lowPower: boolean;
  rank: number; // 1 to 5
  xp: number;
  nextRankXp: number;
  generalPoints: number;
  completedUpgrades: string[];
  unlockedPowers: string[];
  powerCooldowns: Record<string, number>;
  tunnelGarrisonIds: number[]; // Shared GLA Tunnel Network contents
  defeated: boolean;
  stats: {
    unitsCreated: number;
    unitsLost: number;
    unitsDestroyed: number;
    buildingsConstructed: number;
    buildingsDestroyed: number;
    creditsEarned: number;
  };
}

export interface MapData {
  id: string;
  name: string;
  description: string;
  width: number; // world units (e.g. 3200)
  height: number; // world units (e.g. 3200)
  tileSize: number; // e.g. 40
  cols: number;
  rows: number;
  tiles: TerrainType[]; // length = cols * rows
  elevation: number[]; // 0 = ground, 1 = high cliff, -1 = water
  spawnPoints: Vec2[];
  neutralBuildings: Array<{
    blueprintId: string;
    pos: Vec2;
    supplies?: number;
  }>;
}

export interface CampaignMission {
  id: string;
  chapter: number;
  title: string;
  subtitle: string;
  playerFaction: FactionId;
  playerGeneral: GeneralId;
  enemyFaction: FactionId;
  enemyGeneral: GeneralId;
  mapId: string;
  startingCredits: number;
  enemyStartingCredits: number;
  briefing: string;
  objectives: string[];
  preplacedEnemyBuildings?: Array<{ blueprintId: string; offset: Vec2 }>;
  preplacedPlayerUnits?: Array<{ blueprintId: string; offset: Vec2 }>;
}

export interface SaveGameSnapshot {
  version: number;
  saveName: string;
  timestamp: number;
  elapsedTime: number;
  missionId?: string;
  nextEntityId: number;
  map: MapData;
  players: PlayerState[];
  entities: EntityState[];
  projectiles: ProjectileState[];
  hazards: HazardZoneState[];
  crates: CrateState[];
  superweapons: ActiveSuperweaponTimer[];
  orbitalBeams: ActiveOrbitalBeam[];
  exploredGrid: number[]; // compact bitmask per tile
  cameraPos: Vec2;
}

export interface CareerMissionRecord {
  missionId: string;
  completed: boolean;
  bestDifficulty: AIDifficulty;
  stars: number; // 1..3
  bestTimeSec: number;
}

export interface CareerProfile {
  commanderName: string;
  totalVictories: number;
  totalDefeats: number;
  totalUnitsDestroyed: number;
  totalCreditsHarvested: number;
  campaignProgress: Record<string, CareerMissionRecord>;
  generalsChallengeWins: Record<GeneralId, boolean>;
  achievements: string[];
  settings: {
    musicVolume: number;
    sfxVolume: number;
    voiceAlerts: boolean;
    scrollSpeed: number;
    showHealthBars: 'ALWAYS' | 'DAMAGED' | 'SELECTED';
  };
}
