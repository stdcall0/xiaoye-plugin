import lodash from 'lodash';
export default class Lottery {
    constructor(objList, probList) {
        if (typeof probList === 'undefined') {
            this.length = objList.length;
            this.objList = objList;
            this.probList = Array(this.length).fill(1);
            this.updateProb();
        }
        else {
            this.length = Math.min(objList.length, probList.length);
            this.objList = objList;
            this.probList = probList;
            this.updateProb();
        }
    }
    updateProb() {
        this.probTotal = 0;
        this.probPrefix = [];
        this.probList.forEach(x => {
            this.probTotal += x;
            this.probPrefix.push(this.probTotal);
        });
    }
    choiceIndex() {
        let r = lodash.random(0, this.probTotal, true);
        let i = lodash.sortedIndex(this.probPrefix, r);
        if (i >= this.length)
            i = this.length - 1;
        return i;
    }
    choiceOne(self) {
        if (typeof self === "undefined")
            self = this;
        if (!self.length)
            return null;
        return self.objList[self.choiceIndex()];
    }
    choice() {
        return this.choiceOne(this);
    }
    choiceMulti(n) {
        return Array.from({ length: n }, this.choiceOne.bind(this));
    }
    filter(f) {
        let objList = [], probList = [];
        for (let i = 0; i < this.length; ++i)
            if (f(this.objList[i])) {
                objList.push(this.objList[i]);
                probList.push(this.probList[i]);
            }
        if (!objList)
            return null;
        return new Lottery(objList, probList);
    }
    sample(n) {
        if (n > this.length)
            return this.objList;
        let res = [];
        let used = Array(this.length).fill(false);
        for (let r = 0, i = 0; i < n; ++i) {
            do {
                r = this.choiceIndex();
            } while (used[r]);
            used[r] = true;
            res.push(this.objList[r]);
        }
        return res;
    }
}
;
