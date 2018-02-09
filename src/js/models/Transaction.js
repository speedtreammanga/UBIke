/* @flow */
import TransactionsService from "../service/TransactionsService";

/**
 * Transaction model.
 */
class Transaction {
    TIMELIMIT = 16;
    _details = {
        memberId: null,
        bikeId: null,
        countdown: null,
        returned: false,
        late: false
    }

    /**
     * Initializes a Transaction.
     * @param {number} memberId ID of the member
     * @param {number} bikeId ID of the bike
     * @param {any} countdown the countdown of the transaction
     * @param {boolean} late transaction status on lateness
     */
    constructor(memberId: number, bikeId: number, countdown?: any, late?:boolean) {
        this._details.memberId = memberId;
        this._details.bikeId = bikeId;
        this._details.countdown = countdown || this._setTimeLimit();
        this._details.late = late || false;
    }

    /**
     * Returns transaction details.
     */
    get details() {
        return {...this._details};
    }

    /**
     * Set countdown future time limit.
     */
    _setTimeLimit() {
        const now = new Date();
        // set time to 16 seconds from now...
        now.setMilliseconds(now.getMilliseconds() + this.TIMELIMIT*1000);
        setTimeout(() => {
            // make transaction go late in `TIMELIMIT*1000` seconds...
            TransactionsService.transactionRunningLate(this);
        }, this.TIMELIMIT*1000);
        return now.getTime();
    }

    /**
     * Make this transaction go late and 
     * set bike to returned
     */
    setLate() {
        this._details.late = true;
        this._details.returned = true;
    }

    /**
     * Returns the time left in milliseconds.
     * @param {number} countdown the countdown future limit
     */
    _getTimeLeft(countdown) {
        const now = new Date().getTime();
        const diff = countdown - now >= 0 
            ? countdown - now
            : 0;
        return diff;
    }
}

export default Transaction;