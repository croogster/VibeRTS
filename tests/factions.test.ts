import { describe, expect, it } from 'vitest';
import type { ArmorType, DamageType, FactionId } from '../src/core/types';
import {
  DAMAGE_MULTIPLIERS,
  GENERALS,
  getGeneralsByFaction,
  VETERANCY_DAMAGE_MULT,
  VETERANCY_HP_MULT,
  VETERANCY_ROF_MULT
} from '../src/data/factions';

const playableFactions = ['USA', 'GLA', 'CHINA'] satisfies FactionId[];
const damageTypes = [
  'SMALL_ARMS',
  'ARMOR_PIERCING',
  'EXPLOSIVE',
  'GATTLING',
  'LASER',
  'FLAME',
  'TOXIN',
  'SNIPER',
  'PARTICLE',
  'RADIATION',
  'MELEE_C4'
] satisfies DamageType[];
const armorTypes = [
  'INFANTRY',
  'LIGHT_VEHICLE',
  'HEAVY_ARMOR',
  'AIRCRAFT',
  'STRUCTURE',
  'FORTIFIED',
  'HERO'
] satisfies ArmorType[];

describe('draft commander data', () => {
  it('uses unique IDs that match their registry keys', () => {
    const generals = Object.values(GENERALS);
    expect(new Set(generals.map((general) => general.id)).size).toBe(generals.length);

    for (const [id, general] of Object.entries(GENERALS)) {
      expect(general.id).toBe(id);
      expect(id.startsWith(`${general.faction}_`)).toBe(true);
    }
  });

  it.each(playableFactions)('returns only the four %s commander drafts', (faction) => {
    const result = getGeneralsByFaction(faction);

    expect(result).toHaveLength(4);
    expect(result.every((general) => general.faction === faction)).toBe(true);
    expect(result.map((general) => general.id)).toEqual(
      Object.values(GENERALS)
        .filter((general) => general.faction === faction)
        .map((general) => general.id)
    );
  });

  it('returns no commanders for neutral entities', () => {
    expect(getGeneralsByFaction('NEUTRAL')).toEqual([]);
  });

  it('does not expose the registry array when filtering', () => {
    const result = getGeneralsByFaction('USA');
    result.pop();

    expect(getGeneralsByFaction('USA')).toHaveLength(4);
    expect(Object.values(GENERALS)).toHaveLength(12);
  });

  it.each(Object.values(GENERALS))('$id has usable presentation values and numeric modifiers', (general) => {
    expect(general.name.trim().length).toBeGreaterThan(0);
    expect(general.title.trim().length).toBeGreaterThan(0);
    expect(general.portraitColor).toMatch(/^#[0-9a-f]{6}$/i);
    expect(general.accentColor).toMatch(/^#[0-9a-f]{6}$/i);

    for (const modifiers of [
      general.costMultipliers,
      general.hpMultipliers,
      general.damageMultipliers,
      general.speedMultipliers
    ]) {
      for (const [blueprintId, multiplier] of Object.entries(modifiers)) {
        expect(blueprintId.startsWith(`${general.faction.toLowerCase()}_`)).toBe(true);
        expect(Number.isFinite(multiplier)).toBe(true);
        expect(multiplier).toBeGreaterThan(0);
      }
    }

    for (const upgradeId of general.startingUpgrades ?? []) {
      expect(upgradeId.startsWith(`upg_${general.faction.toLowerCase()}_`)).toBe(true);
    }
  });
});

describe('draft damage/armor matrix', () => {
  it('defines all supported damage types', () => {
    expect(Object.keys(DAMAGE_MULTIPLIERS).sort()).toEqual([...damageTypes].sort());
  });

  it.each(damageTypes)('%s defines finite, non-negative values for every armor class', (damageType) => {
    const matchups = DAMAGE_MULTIPLIERS[damageType];

    expect(Object.keys(matchups).sort()).toEqual([...armorTypes].sort());
    for (const armorType of armorTypes) {
      expect(Number.isFinite(matchups[armorType])).toBe(true);
      expect(matchups[armorType]).toBeGreaterThanOrEqual(0);
    }
  });

  it('preserves the explicit aircraft immunities in the reference data', () => {
    expect(DAMAGE_MULTIPLIERS.FLAME.AIRCRAFT).toBe(0);
    expect(DAMAGE_MULTIPLIERS.TOXIN.AIRCRAFT).toBe(0);
    expect(DAMAGE_MULTIPLIERS.MELEE_C4.AIRCRAFT).toBe(0);
  });
});

describe('draft veterancy multipliers', () => {
  it.each([
    ['damage', VETERANCY_DAMAGE_MULT],
    ['rate of fire', VETERANCY_ROF_MULT],
    ['health', VETERANCY_HP_MULT]
  ] as const)('%s starts at one and increases at each level', (_name, multipliers) => {
    expect(Object.keys(multipliers)).toEqual(['0', '1', '2', '3']);
    expect(multipliers[0]).toBe(1);

    const values = Object.values(multipliers);
    for (let level = 1; level < values.length; level++) {
      expect(Number.isFinite(values[level])).toBe(true);
      expect(values[level]).toBeGreaterThan(values[level - 1]);
    }
  });
});
