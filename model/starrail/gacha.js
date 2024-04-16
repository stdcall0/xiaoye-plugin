import { Lottery } from "#gc";
import { GachaItemType } from "./gachaitem.js";
;
export class GachaSubPool {
    constructor(items) {
        this.items = items;
        this.lot = new Lottery(items);
    }
    next() {
        const item = this.lot.choice();
        return {
            item,
            count: 0,
            isGuaranteed: false
        };
    }
}
;
// FIXME: This implementaion is way too complicated. It can be de-integrated and simplified.
export class GachaSubPoolUp {
    constructor(items) {
        this.items = items;
        this.lot = new Lottery(items);
        this.lotPerm = this.lot.filter(i => !i.up);
        this.lotPermWeap = this.lotPerm.filter(i => i.type == GachaItemType.Weapon);
        this.lotPermChar = this.lotPerm.filter(i => i.type == GachaItemType.Character);
        this.lotUp = this.lot.filter(i => i.up);
    }
    next(upGuaranteed) {
        if (upGuaranteed) {
            const item = this.lotUp.choice();
            return {
                item,
                count: 0,
                isGuaranteed: true
            };
        }
        else {
            // 50 50
            const isUp = new Lottery([true, false]).choice();
            if (isUp) {
                const item = this.lotUp.choice();
                return {
                    item,
                    count: 0,
                    isGuaranteed: false
                };
            }
            else {
                if (!this.lotPermChar.length || !this.lotPermWeap.length) {
                    const item = this.lotPerm.choice();
                    return {
                        item,
                        count: 0,
                        isGuaranteed: false
                    };
                }
                else {
                    // 50 50 for weap or char
                    const isWeap = new Lottery([true, false]).choice();
                    const item = isWeap ? this.lotPermWeap.choice() : this.lotPermChar.choice();
                    return {
                        item,
                        count: 0,
                        isGuaranteed: false
                    };
                }
            }
        }
    }
}
;
;
export const defaultGachaState = {
    last5: 0,
    last4: 0,
    up5Guaranteed: false,
    up4Guaranteed: false
};
export class Gacha {
    constructor(s = defaultGachaState) {
        this.s = s;
    }
    state() {
        return this.s;
    }
    get weight() {
        const five = this.s.last5 <= 72 ? 60 : 60 + 600 * (this.s.last5 - 72);
        const four = this.s.last4 <= 7 ? 510 : 510 + 5100 * (this.s.last4 - 7);
        return [
            five, // 5*
            four, // 4*
            9430 // 3*
        ];
    }
    next(pool) {
        const lot = new Lottery([5, 4, 3], this.weight, 10000);
        const sub = lot.choice();
        if (sub == 5) {
            let res = pool.five.next(this.s.up5Guaranteed);
            if (res.isGuaranteed) {
                this.s.up5Guaranteed = false;
            }
            else {
                this.s.up5Guaranteed = !res.item.up;
            }
            res = Object.assign(Object.assign({}, res), { count5: this.s.last5 + 1, count: this.s.last5 + 1 });
            this.s.last5 = 0;
            this.s.last4++;
            return res;
        }
        else if (sub == 4) {
            let res = pool.four.next(this.s.up4Guaranteed);
            if (res.isGuaranteed) {
                this.s.up4Guaranteed = false;
            }
            else {
                this.s.up4Guaranteed = !res.item.up;
            }
            res = Object.assign(Object.assign({}, res), { count5: this.s.last5 + 1, count: this.s.last4 + 1 });
            this.s.last5++;
            this.s.last4 = 0;
            return res;
        }
        else {
            this.s.last5++;
            this.s.last4++;
            return Object.assign(Object.assign({}, pool.three.next()), { count5: this.s.last5 });
        }
    }
    nextMulti(pool, n) {
        return Array.from({ length: n }, this.next.bind(this, pool));
    }
}
;