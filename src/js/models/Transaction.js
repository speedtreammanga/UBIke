/* @flow */
import TransactionsService from "../service/TransactionsService";

class Transaction {
    TIMELIMIT = 16;
    _details = {
        memberId: null,
        bikeId: null,
        countdown: null,
        returned: false,
        late: false
    }

    constructor(memberId: number, bikeId: number, countdown?: any, late?:boolean) {
        this._details.memberId = memberId;
        this._details.bikeId = bikeId;
        this._details.countdown = countdown || this._setTimeLimit();
        this._details.late = late || false;
    }

    get details() {
        return {...this._details};
    }

    _getNow() {
        return new Date().toLocaleTimeString()
            .split(':')
            .map((c: string) => parseInt(c));
    }

    _setTimeLimit() {
        const now = new Date();
        now.setMilliseconds(now.getMilliseconds() + this.TIMELIMIT*1000);
        setTimeout(() => {
            TransactionsService.transactionRunningLate(this);
        }, this.TIMELIMIT*1000);
        return now.getTime();
    }

    setLate() {
        this._details.late = true;
        this._details.returned = true;
    }
}

export default Transaction;