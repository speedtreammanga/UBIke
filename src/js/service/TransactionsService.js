/* @flow */
import Transaction from '../models/Transaction';
import MembersService from './Members.service';
import RacksService from '../service/Racks.service';
import Member from '../models/Member';
import Bike from '../models/Bike';

/**
 * Service responsible to manage all Transactions.
 */
class TransactionsService {
    _transactions: Transaction[] = [];

    /**
     * Initializes transactions, simulates a GET to an API.
     */
    constructor() {
        this._transactions = [];
    }

    /**
     * Create a new transaction and appends it to the list
     * if `email` is valid, member is `not` banned, 
     * bike is `not` rented and member has `not rented` a bike.
     * @param {string} memberEmail Email address of a valid member.
     * @param {nummber} bikeId ID of an available bike.
     * @returns {Promise}
     */
    createTransaction(memberEmail: string, bikeId: number): Promise {
        return new Promise((resolve, reject) => {
            // fetch member from email...
            const member: Member = MembersService.getMember(memberEmail);

            // check if email is valid...
            if (!member || member.id < 0) {
                reject('Invalid email.');
                return;
            }
            // check if member has been banned or not...
            if (member.isBanned) {
                reject('You have been banned due to a late bike return.');
                return;
            }
            // check if member already has a bike...
            if (MembersService.hasARentedBike(memberEmail)) {
                reject('This member already has a bike!');
                return;
            }
            // check if bike has already been rented...
            if (RacksService.getBikeById(bikeId).isAlreadyRented()) {
                reject('This bike is already rented');
                return;
            }
            // create new transaction and append it to the list...
            const transaction = new Transaction(member.id, bikeId);
            this._transactions.push(transaction);
            resolve(transaction);
        });
    }

    /**
     * Returns the list of transactions.
     */
    getTransactions() {
        return [...this._transactions];
    }

    /**
     * Returns transactions for which the bike 
     * has not been returned yet.
     */
    getNonReturnedBikeTransactions() {
        const nonReturnedTransactions = this._transactions.filter((t: Transaction) => {
            if (!t.details.returned)
                return t;
        });
        return nonReturnedTransactions;
    }

    /**
     * Set a transaction as `running late`,
     * returns bike to rack and bans member from further transactions.
     * @param {Transaction} transaction The transaction which is running late.
     */
    transactionRunningLate(transaction: Transaction) {
        const bike: Bike = RacksService.getBikeById(transaction.details.bikeId);
        bike.returnToRack();
        MembersService.banMemberFromService(transaction._details.memberId);
        transaction.setLate();
    }
}

export default new TransactionsService();
