/* @flow */
import Transaction from '../models/Transaction';
import MembersService from './Members.service';
import RacksService from '../service/Racks.service';
import Member from '../models/Member';
import Bike from '../models/Bike';

class TransactionsService {
    _transactions: Transaction[] = [];
    LOCALSTORAGE_KEY = 'transactions';

    constructor() {
        this._transactions = [];
    }

    createTransaction(memberEmail: string, bikeId: number): Promise {
        return new Promise((resolve, reject) => {
            const memberId = MembersService.getMemberId(memberEmail);
            const member: Member = MembersService.getMember(memberEmail);

            if (member.id < 0) {
                reject('Invalid email.');
                return;
            }
            if (member.isBanned) {
                reject('You have been banned due to a late bike return.');
                return;
            }
            if (MembersService.hasARentedBike(memberEmail)) {
                reject('This member already has a bike!');
                return;
            }
            if (RacksService.getBikeById(bikeId).isAlreadyRented()) {
                reject('This bike is already rented');
                return;
            }

            const transaction = new Transaction(memberId, bikeId);
            this._transactions.push(transaction);
            resolve(transaction);
        });
    }

    returnTrue() {
        return true;
    }

    _fetchTransactions() {
        const jsonTransactions = JSON.parse(localStorage.getItem(this.LOCALSTORAGE_KEY));
        return jsonTransactions
        .map((t: {memberId: number, bikeId: number, countdown: any, late: boolean}) => 
            new Transaction(t.memberId, t.bikeId, t.countdown, t.late));
    }

    getTransactions() {
        return [...this._transactions];
    }

    getNonReturnedBikeTransactions() {
        const nonReturnedTransactions = this._transactions.filter((t: Transaction) => {
            if (!t.details.returned)
                return t;
        });
        return nonReturnedTransactions;
    }

    transactionRunningLate(transaction: Transaction) {
        const bike: Bike = RacksService.getBikeById(transaction.details.bikeId);
        bike.returnToRack();
        MembersService.banMemberFromService(transaction._details.memberId);
        transaction.setLate();
    }
}

export default new TransactionsService();
