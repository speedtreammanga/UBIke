/* @flow */
import TransactionsService from '../service/TransactionsService';
import RacksService from '../service/Racks.service';

class Bike {
    id: number;
    code: string;
    isRented: boolean = false;

    constructor(id, code) {
        this.id = id;
        this.code = code;
    }

    /**
     * 
     * @param {string} memberEmail the email address of the member renting this bike.
     */
    rent(memberEmail: string) {
        return new Promise((resolve, reject) => {
            if (this.isRented) {
                reject('Uh-oh, someone already has that bike.');
                return;
            }
            TransactionsService.createTransaction(new String(memberEmail), this.id)
            .then((res) => {
                this.isRented = true;
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    isAlreadyRented() {
        // const foundAtIndex = TransactionsService.transactions
        //     .findIndex((t: Transaction) => t.details.bikeId === this.id);
        // return foundAtIndex >= 0 ? true : false;
        return this.isRented;
    }

    returnToRack() {
        this.isRented = false;
        RacksService.returnBikeToRack(this);
    }
}

export default Bike;