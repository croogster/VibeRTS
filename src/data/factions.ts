import type {
  ArmorType,
  DamageType,
  FactionId,
  GeneralDefinition,
  GeneralId,
  VeterancyLevel
} from '../core/types';

export const DAMAGE_MULTIPLIERS: Record<DamageType, Record<ArmorType, number>> = {
  SMALL_ARMS: {
    INFANTRY: 1.25,
    LIGHT_VEHICLE: 0.45,
    HEAVY_ARMOR: 0.15,
    AIRCRAFT: 0.55,
    STRUCTURE: 0.2,
    FORTIFIED: 0.08,
    HERO: 0.65
  },
  ARMOR_PIERCING: {
    INFANTRY: 0.45,
    LIGHT_VEHICLE: 1.2,
    HEAVY_ARMOR: 1.25,
    AIRCRAFT: 1.1,
    STRUCTURE: 0.85,
    FORTIFIED: 0.65,
    HERO: 0.6
  },
  EXPLOSIVE: {
    INFANTRY: 0.85,
    LIGHT_VEHICLE: 1.15,
    HEAVY_ARMOR: 1.0,
    AIRCRAFT: 0.9,
    STRUCTURE: 1.35,
    FORTIFIED: 1.15,
    HERO: 0.75
  },
  GATTLING: {
    INFANTRY: 1.4,
    LIGHT_VEHICLE: 0.95,
    HEAVY_ARMOR: 0.35,
    AIRCRAFT: 1.45,
    STRUCTURE: 0.4,
    FORTIFIED: 0.2,
    HERO: 0.8
  },
  LASER: {
    INFANTRY: 1.15,
    LIGHT_VEHICLE: 1.25,
    HEAVY_ARMOR: 1.25,
    AIRCRAFT: 1.35,
    STRUCTURE: 0.95,
    FORTIFIED: 0.8,
    HERO: 0.9
  },
  FLAME: {
    INFANTRY: 1.6,
    LIGHT_VEHICLE: 0.8,
    HEAVY_ARMOR: 0.4,
    AIRCRAFT: 0.0,
    STRUCTURE: 1.55,
    FORTIFIED: 1.2,
    HERO: 1.0
  },
  TOXIN: {
    INFANTRY: 1.75,
    LIGHT_VEHICLE: 0.75,
    HEAVY_ARMOR: 0.35,
    AIRCRAFT: 0.0,
    STRUCTURE: 0.35,
    FORTIFIED: 0.2,
    HERO: 0.95
  },
  SNIPER: {
    INFANTRY: 2.5,
    LIGHT_VEHICLE: 0.1,
    HEAVY_ARMOR: 0.05,
    AIRCRAFT: 0.1,
    STRUCTURE: 0.02,
    FORTIFIED: 0.01,
    HERO: 1.35
  },
  PARTICLE: {
    INFANTRY: 2.0,
    LIGHT_VEHICLE: 1.8,
    HEAVY_ARMOR: 1.6,
    AIRCRAFT: 1.5,
    STRUCTURE: 1.7,
    FORTIFIED: 1.5,
    HERO: 1.4
  },
  RADIATION: {
    INFANTRY: 1.8,
    LIGHT_VEHICLE: 1.1,
    HEAVY_ARMOR: 0.85,
    AIRCRAFT: 0.5,
    STRUCTURE: 1.15,
    FORTIFIED: 0.95,
    HERO: 1.1
  },
  MELEE_C4: {
    INFANTRY: 2.0,
    LIGHT_VEHICLE: 2.2,
    HEAVY_ARMOR: 2.0,
    AIRCRAFT: 0.0,
    STRUCTURE: 3.5,
    FORTIFIED: 3.0,
    HERO: 1.5
  }
};

export const VETERANCY_DAMAGE_MULT: Record<VeterancyLevel, number> = {
  0: 1.0,
  1: 1.15,
  2: 1.3,
  3: 1.5
};

export const VETERANCY_ROF_MULT: Record<VeterancyLevel, number> = {
  0: 1.0,
  1: 1.1,
  2: 1.22,
  3: 1.35
};

export const VETERANCY_HP_MULT: Record<VeterancyLevel, number> = {
  0: 1.0,
  1: 1.1,
  2: 1.2,
  3: 1.35
};

export const GENERALS: Record<GeneralId, GeneralDefinition> = {
  USA_STANDARD: {
    id: 'USA_STANDARD',
    name: 'General Bradley',
    title: 'USA High Command',
    faction: 'USA',
    portraitColor: '#2563eb',
    accentColor: '#60a5fa',
    quote: 'Precision, technology, and overwhelming air superiority.',
    specialties: [
      'Balanced combined-arms arsenal (Crusaders, Paladins, Raptors, Tomahawks)',
      'Strategy Center Battle Plans (Bombardment, Hold the Line, Search & Destroy)',
      'Chinook Air Supply & late-game Supply Drop Zones'
    ],
    costMultipliers: {},
    hpMultipliers: {},
    damageMultipliers: {},
    speedMultipliers: {}
  },
  USA_AIRFORCE: {
    id: 'USA_AIRFORCE',
    name: 'Gen. Malcolm "Ace" Granger',
    title: 'US Air Force General',
    faction: 'USA',
    portraitColor: '#1d4ed8',
    accentColor: '#93c5fd',
    quote: 'Control the skies, and the ground beneath is already yours.',
    specialties: [
      'Aircraft cost -20% and have +20% armor & point-defense lasers',
      'King Raptors carry 50% more missiles; Comanches move 15% faster',
      'Starts with Countermeasures researched'
    ],
    costMultipliers: {
      usa_raptor: 0.8,
      usa_aurora: 0.82,
      usa_comanche: 0.8,
      usa_chinook: 0.85,
      usa_airfield: 0.8
    },
    hpMultipliers: {
      usa_raptor: 1.25,
      usa_aurora: 1.2,
      usa_comanche: 1.2,
      usa_chinook: 1.2
    },
    damageMultipliers: {
      usa_raptor: 1.2,
      usa_comanche: 1.15
    },
    speedMultipliers: {
      usa_comanche: 1.15,
      usa_raptor: 1.1
    },
    startingUpgrades: ['upg_usa_countermeasures']
  },
  USA_LASER: {
    id: 'USA_LASER',
    name: 'Gen. "Pinpoint" Townes',
    title: 'US Laser Weapons General',
    faction: 'USA',
    portraitColor: '#0284c7',
    accentColor: '#38bdf8',
    quote: 'Why waste ammunition when a megawatt beam never misses?',
    specialties: [
      'Crusader & Paladin weapons enhanced with high-intensity laser beams (+20% damage)',
      'Patriot Missile Systems & Avengers deal +25% laser damage; Cold Fusion Reactors produce +25% power',
      'Particle Cannon costs -15%'
    ],
    costMultipliers: {
      usa_particle_cannon: 0.85,
      usa_avenger: 0.85,
      usa_patriot: 0.9
    },
    hpMultipliers: {},
    damageMultipliers: {
      usa_crusader: 1.2,
      usa_paladin: 1.2,
      usa_patriot: 1.25,
      usa_avenger: 1.25
    },
    speedMultipliers: {},
    powerBonus: 4
  },
  USA_SUPERWEAPON: {
    id: 'USA_SUPERWEAPON',
    name: 'Gen. Alexis Alexander',
    title: 'US Superweapon & Defense General',
    faction: 'USA',
    portraitColor: '#4338ca',
    accentColor: '#818cf8',
    quote: 'My defenses are impenetrable, and my Particle Cannons are already charged.',
    specialties: [
      'Particle Cannon costs -25% and charges 20% faster',
      'Patriot Defense Systems have +30% HP & +20% damage; Cold Fusion Reactors cost -20%',
      'Aurora Alpha Bombers deal +25% fuel-air blast damage'
    ],
    costMultipliers: {
      usa_particle_cannon: 0.75,
      usa_reactor: 0.8,
      usa_patriot: 0.85,
      usa_aurora: 0.9
    },
    hpMultipliers: {
      usa_patriot: 1.3,
      usa_particle_cannon: 1.25
    },
    damageMultipliers: {
      usa_patriot: 1.2,
      usa_aurora: 1.25
    },
    speedMultipliers: {},
    powerBonus: 3
  },
  GLA_STANDARD: {
    id: 'GLA_STANDARD',
    name: 'General Mohmar',
    title: 'GLA High Command',
    faction: 'GLA',
    portraitColor: '#15803d',
    accentColor: '#4ade80',
    quote: 'No power grid to bomb. No front line to break. We strike from everywhere.',
    specialties: [
      'Requires zero electricity; destroyed structures leave Rebuild Holes',
      'Vehicles upgrade weapons by collecting Salvage Crates from wrecked enemies',
      'Tunnel Networks teleport garrisoned armies across the map instantly'
    ],
    costMultipliers: {},
    hpMultipliers: {},
    damageMultipliers: {},
    speedMultipliers: {}
  },
  GLA_TOXIN: {
    id: 'GLA_TOXIN',
    name: 'Dr. Thrax',
    title: 'GLA Chemical & Toxin General',
    faction: 'GLA',
    portraitColor: '#16a34a',
    accentColor: '#86efac',
    quote: 'A little drop of Anthrax Gamma makes the whole battlefield glow!',
    specialties: [
      'Starts with Anthrax Beta & Toxin Shells already researched',
      'Toxin Tractors, Scud Launchers, and Stinger Sites deal +25% chemical damage',
      'Scud Storm costs -15%'
    ],
    costMultipliers: {
      gla_toxin_tractor: 0.85,
      gla_scud_launcher: 0.9,
      gla_scud_storm: 0.85
    },
    hpMultipliers: {
      gla_toxin_tractor: 1.2
    },
    damageMultipliers: {
      gla_toxin_tractor: 1.25,
      gla_scud_launcher: 1.2,
      gla_rebel: 1.15,
      gla_scorpion: 1.15
    },
    speedMultipliers: {},
    startingUpgrades: ['upg_gla_anthrax_beta', 'upg_gla_toxin_shells']
  },
  GLA_DEMO: {
    id: 'GLA_DEMO',
    name: 'Gen. Rodall "Demo" Juhziz',
    title: 'GLA Demolition General',
    faction: 'GLA',
    portraitColor: '#b45309',
    accentColor: '#fbbf24',
    quote: 'Everything looks better when it is blown into a thousand pieces!',
    specialties: [
      'Terrorists, Bomb Trucks, Demo Traps, and Scud Launchers deal +30% explosive damage',
      'Demo Traps and Bomb Trucks cost -25%',
      'Rocket Buggies and RPG Troopers deal +15% blast damage'
    ],
    costMultipliers: {
      gla_terrorist: 0.75,
      gla_bomb_truck: 0.75,
      gla_demo_trap: 0.7,
      gla_scud_launcher: 0.9
    },
    hpMultipliers: {
      gla_bomb_truck: 1.2
    },
    damageMultipliers: {
      gla_terrorist: 1.3,
      gla_bomb_truck: 1.3,
      gla_demo_trap: 1.35,
      gla_scud_launcher: 1.2,
      gla_rocket_buggy: 1.15,
      gla_rpg_trooper: 1.15
    },
    speedMultipliers: {
      gla_terrorist: 1.15,
      gla_bomb_truck: 1.1
    }
  },
  GLA_STEALTH: {
    id: 'GLA_STEALTH',
    name: 'Prince Kassad',
    title: 'GLA Camouflage & Ambush General',
    faction: 'GLA',
    portraitColor: '#0f766e',
    accentColor: '#2dd4bf',
    quote: 'You cannot target what you cannot see.',
    specialties: [
      'Starts with Camo Netting researched — defensive structures and tunnels are stealthed',
      'Jarmen Kell, Rebels, Technicals, and Quad Cannons move 15% faster',
      'Tunnel Networks and Stinger Sites cost -20%'
    ],
    costMultipliers: {
      gla_tunnel: 0.8,
      gla_stinger: 0.8,
      gla_jarmen: 0.85,
      gla_rebel: 0.85
    },
    hpMultipliers: {},
    damageMultipliers: {
      gla_jarmen: 1.2,
      gla_quad: 1.15
    },
    speedMultipliers: {
      gla_technical: 1.15,
      gla_quad: 1.15,
      gla_rebel: 1.15,
      gla_jarmen: 1.15
    },
    startingUpgrades: ['upg_gla_camo_netting']
  },
  CHINA_STANDARD: {
    id: 'CHINA_STANDARD',
    name: 'General Chen',
    title: 'PLA High Command',
    faction: 'CHINA',
    portraitColor: '#b91c1c',
    accentColor: '#f87171',
    quote: 'Steel, fire, and the unstoppable might of the People’s Liberation Army.',
    specialties: [
      'Horde Bonus (+25% fire rate when 5+ Red Guards, Tank Hunters, or Battlemasters group up)',
      'Overlord Tanks & Helix Helicopters customizable with Gattling, Speaker Tower, or Bunker',
      'Hackers & Internet Center generate untethered cyber income'
    ],
    costMultipliers: {},
    hpMultipliers: {},
    damageMultipliers: {},
    speedMultipliers: {}
  },
  CHINA_TANK: {
    id: 'CHINA_TANK',
    name: 'Gen. Ta Hun Kwai',
    title: 'PLA Armored Division General',
    faction: 'CHINA',
    portraitColor: '#991b1b',
    accentColor: '#fca5a5',
    quote: 'Crush them beneath columns of Emperor Overlords and Battlemasters!',
    specialties: [
      'Battlemaster, Overlord, Gattling, Dragon, and ECM Tanks cost -20% and have +15% HP',
      'Overlord Tanks come with a built-in Speaker Tower aura by default',
      'Starts with Nuclear Tanks speed upgrade researched'
    ],
    costMultipliers: {
      china_battlemaster: 0.8,
      china_overlord: 0.82,
      china_gattling_tank: 0.8,
      china_dragon_tank: 0.85,
      china_ecm_tank: 0.85
    },
    hpMultipliers: {
      china_battlemaster: 1.15,
      china_overlord: 1.18,
      china_gattling_tank: 1.15
    },
    damageMultipliers: {
      china_battlemaster: 1.15,
      china_overlord: 1.15
    },
    speedMultipliers: {
      china_battlemaster: 1.1,
      china_overlord: 1.1
    },
    startingUpgrades: ['upg_china_nuclear_tanks']
  },
  CHINA_INFANTRY: {
    id: 'CHINA_INFANTRY',
    name: 'Gen. "Anvil" Shin Fai',
    title: 'PLA Infantry & Garrison General',
    faction: 'CHINA',
    portraitColor: '#c2410c',
    accentColor: '#fdba74',
    quote: 'Our infantry divisions outnumber their bullets ten to one.',
    specialties: [
      'Red Guards, Tank Hunters, Hackers, and Troop Crawlers cost -20% and have +30% HP',
      'Starts with Nationalism researched (stronger Horde Bonus)',
      'Bunkers and Gattling Cannons have +25% durability'
    ],
    costMultipliers: {
      china_red_guard: 0.8,
      china_tank_hunter: 0.8,
      china_hacker: 0.82,
      china_troop_crawler: 0.8,
      china_bunker: 0.8
    },
    hpMultipliers: {
      china_red_guard: 1.3,
      china_tank_hunter: 1.3,
      china_troop_crawler: 1.25,
      china_bunker: 1.25,
      china_gattling_cannon: 1.25
    },
    damageMultipliers: {
      china_red_guard: 1.25,
      china_tank_hunter: 1.2
    },
    speedMultipliers: {
      china_red_guard: 1.15,
      china_tank_hunter: 1.15
    },
    startingUpgrades: ['upg_china_nationalism']
  },
  CHINA_NUKE: {
    id: 'CHINA_NUKE',
    name: 'Gen. Tsing Shi Tao',
    title: 'PLA Tactical Nuclear General',
    faction: 'CHINA',
    portraitColor: '#7c2d12',
    accentColor: '#fb923c',
    quote: 'Feel the warm glow of atomic superiority!',
    specialties: [
      'Starts with Uranium Shells & Nuclear Tanks already researched',
      'Nuke Cannons, Nuclear Reactors, and Nuclear Missile Silos cost -20%',
      'Battlemasters and Overlords deal +20% atomic cannon damage'
    ],
    costMultipliers: {
      china_nuke_cannon: 0.8,
      china_reactor: 0.8,
      china_nuke_silo: 0.8
    },
    hpMultipliers: {
      china_reactor: 1.25,
      china_nuke_cannon: 1.2
    },
    damageMultipliers: {
      china_battlemaster: 1.2,
      china_overlord: 1.2,
      china_nuke_cannon: 1.25
    },
    speedMultipliers: {
      china_battlemaster: 1.15,
      china_overlord: 1.12
    },
    powerBonus: 4,
    startingUpgrades: ['upg_china_uranium_shells', 'upg_china_nuclear_tanks']
  }
};

export function getGeneralsByFaction(faction: FactionId): GeneralDefinition[] {
  return Object.values(GENERALS).filter((g) => g.faction === faction);
}
