import { Base } from '#gc.model';
import { DisplayModes, Render, Path } from '#gc';
export var RelicType;
(function (RelicType) {
    RelicType[RelicType["Inner"] = 0] = "Inner";
    RelicType[RelicType["Outer"] = 1] = "Outer";
})(RelicType || (RelicType = {}));
;
;
export class ConstantStat extends Base.ConstantStat {
    get imagePath() {
        return Path.Image + "/sr/" + this.name + ".webp";
    }
}
;
export class RandomStat extends Base.RandomStat {
    get imagePath() {
        return Path.Image + "/sr/" + this.name + ".webp";
    }
}
;
export class Piece extends Base.Piece {
    constructor(name, displayName, mainStatList, subStatList, subStatCount) {
        super(name, displayName, mainStatList, subStatList, subStatCount);
        this.name = name;
        this.displayName = displayName;
        this.mainStatList = mainStatList;
        this.subStatList = subStatList;
        this.subStatCount = subStatCount;
    }
    get level() {
        return 0 + this.upgradeCount * 3;
    }
    generateText(score) {
        if (!this.pieceData)
            return null;
        let res;
        res = `${this.displayName} ${this.pieceData.displayName}\nLv. ${this.level}`;
        res += `  |  ${DisplayModes.Float2D(score)}\n\n`;
        res += `${this.mainStat.displayName} ${this.mainStat.displayValue}\n\n`;
        this.subStats.forEach(subStat => res += `${subStat.displayName} ${subStat.displayValue}\n`);
        return res.trimEnd();
    }
    async generateImage(score) {
        // TODO: generate Artifact Image for Star Rail
        // Might need to check for relic type (inner & outer)
        throw new Error("Not Implemented"); // not implemented yet
        if (!this.pieceData)
            return null;
        const data = {
            tplFile: Path.HTML + 'starrail_relic.html',
            pluResPath: Path.Process,
            artifactPiece: this,
            artifactScore: DisplayModes.Float1D(score),
            locked: false
        };
        return Render.render("starrail_relic", data);
    }
}
;
export class Set extends Base.Set {
    constructor(name, displayName, aliases, type, pieceList, pieceData) {
        super(name, displayName, aliases, pieceList, pieceData);
        this.name = name;
        this.displayName = displayName;
        this.aliases = aliases;
        this.type = type;
        this.pieceList = pieceList;
        this.pieceData = pieceData;
    }
}
;
export class Domain extends Base.Domain {
}
;
;
;
