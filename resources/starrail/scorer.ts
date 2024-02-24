import { Base, StarRail } from '#gc.model';

const ScoreMultipler: StarRail.ScoreRule = {
    "CRIT Rate": 2,
    "CRIT DMG": 1
}; // a very simple multipler

const spStat = ["CRIT Rate", "CRIT DMG"];

const findRule = (stat: Base.Stat, rule: StarRail.ScoreRule): number => {
    if (stat.name in rule) return rule[stat.name];
    return 0;
};

export const Scorer: StarRail.Scorer =
    (piece: StarRail.Piece) => {
        let score = 0;
        if (spStat.includes(piece.mainStat.name)) score = 10;
        piece.subStats.forEach(subStat => {
            score += subStat.value
                * findRule(subStat, ScoreMultipler);
        });
        return score;
    };
