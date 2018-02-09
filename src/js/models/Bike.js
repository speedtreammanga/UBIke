/* @flow */
import TransactionsService from '../service/TransactionsService';
import RacksService from '../service/Racks.service';

/** 
 * Bike model.
*/
class Bike {
    id: number;
    code: string;
    isRented: boolean = false;

    /**
     * Initializes.
     * @param {number} id ID of the bike
     * @param {string} code Colour code of the bike
     */
    constructor(id: number, code: string) {
        this.id = id;
        this.code = code;
    }

    /**
     * Rent the bike by creating new Transaction.
     * @param {string} memberEmail the email address of the member renting this bike.
     */
    rent(memberEmail: string) {
        return new Promise((resolve, reject) => {
            if (this.isRented) {
                reject('Uh-oh, someone already has that bike.');
                return;
            }
            // new transaction...
            TransactionsService.createTransaction(new String(memberEmail), this.id)
            .then((res) => {
                // set bike to rented...
                this.isRented = true;
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * Returns whether or not the bike is rented.
     */
    isAlreadyRented() {
        return this.isRented;
    }

    /**
     * Returns bike to rack.
     */
    returnToRack() {
        this.isRented = false;
        RacksService.returnBikeToRack(this);
    }
}

export default Bike;