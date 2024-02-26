import { StarRail } from '#gc.model';
import { Rule } from '../rule.js';
const Weight = {
    "ATK": 0.75,
    "FlatATK": 0.75,
    "SPD": 1,
    "CRIT Rate": 1,
    "CRIT DMG": 1,
    "Energy Regeneration Rate": 0.75,
    "Effect Hit Rate": 1,
    "Quantum DMG Boost": 1
};
export const SilverWolfScorer = new StarRail.Scorer("Silver Wolf", "银狼", Rule.All, Weight);
