import { Lottery } from "#gc";
export class GachaPool {
    constructor(fiveStarUpItems, fiveStarPermItems, fourStarItems, threeStarItems) {
        this.fiveStarUpItems = fiveStarUpItems;
        this.fiveStarPermItems = fiveStarPermItems;
        this.fourStarItems = fourStarItems;
        this.threeStarItems = threeStarItems;
    }
}
;
export class GachaState {
    constructor(pool, lastFour, lastFive, upGuaranteed) {
        this.pool = pool;
        this.lastFour = lastFour || 0;
        this.lastFive = lastFive || 0;
        this.upGuaranteed = upGuaranteed || false;
    }
    get weight() {
        const five = this.lastFive <= 72 ? 60 : 60 + 600 * (this.lastFive - 72);
        const four = this.lastFour <= 7 ? 510 : 510 + 5100 * (this.lastFour - 7);
        if (this.upGuaranteed)
            return [
                five, // 5* up
                0, // 5 * perm
                four, // 4* item
                9430 // 3* item
            ];
        else
            return [
                five / 2, // 5* up
                five / 2, // 5 * perm
                four, // 4* item
                9430 // 3* item
            ];
    }
    get lottery() {
        return new Lottery([
            this.pool.fiveStarUpItems,
            this.pool.fiveStarPermItems,
            this.pool.fourStarItems,
            this.pool.threeStarItems
        ], this.weight);
    }
    next() {
        const _lot = this.lottery;
        const itemsIndex = _lot.choiceIndex();
        const item = _lot.objList[itemsIndex].choice();
        if (itemsIndex <= 1) {
            this.lastFive = 0;
            this.lastFour += 1;
            this.upGuaranteed = itemsIndex == 1;
        }
        else if (itemsIndex == 2) {
            this.lastFour = 0;
            this.lastFive += 1;
        }
        else if (itemsIndex == 3) {
            this.lastFive += 1;
            this.lastFour += 1;
        }
        else
            throw new Error("Invalid item index");
        return item;
    }
    nextMulti(n) {
        return Array.from({ length: n }, this.next.bind(this));
    }
}
;