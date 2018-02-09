/* @flow */
import User from './User';

class Member extends User {
    fn: string;
    ln: string;
    phone: string;
    _isBanned: boolean;
    id: number;

    /**
     * Create a new Member object.
     * @param {string} fn first name of the member.
     * @param {string} ln last name of the member.
     * @param {string} phone emergency phone of the member.
     * @param {string} email email address of the member.
     */
    constructor(id, fn, ln, phone, email) {
        super(email);
        this.id = id;
        this.fn = fn;
        this.ln = ln;
        this.phone = phone;
        this.isBanned = false;
    }

    get isBanned() {
        return this._isBanned;
    }

    set isBanned(value) {
        this._isBanned = value;
    }
}
export default Member;