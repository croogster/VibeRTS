import './style.css';
import { DAMAGE_MULTIPLIERS, GENERALS } from './data/factions';

const generals = Object.values(GENERALS);
const factionCount = new Set(generals.map((general) => general.faction)).size;
const matchupCount = Object.values(DAMAGE_MULTIPLIERS).reduce(
  (total, matchups) => total + Object.keys(matchups).length,
  0
);
const summary = document.querySelector<HTMLParagraphElement>('#data-summary');

if (summary) {
  summary.textContent =
    `${factionCount} draft factions · ${generals.length} draft commander profiles · ` +
    `${matchupCount} damage/armor values loaded`;
}
