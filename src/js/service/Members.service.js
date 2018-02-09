/* @flow */
import { MEMBERS } from '../../config/datasource';
import Member from '../models/Member';
import TransactionsService from './TransactionsService';
import Transaction from '../models/Transaction';

/**
 * Service responsible to manage the members.
 */
class MembersService {
    _members: Member[] = [];
    /**
     * Initialize Service.
     */
    constructor() {
        this.members = this._fetchMembers();
    }
    
    /**
     * Returns the members.
     */
    get members(): Member[] {
        return [...this._members];
    }
    /**
     * Sets the members;
     */
    set members(value) {
        this._members = value;
    }

    /**
     * Fetches a list of members.
     */
    _fetchMembers() {
        return MEMBERS.map((m: Member) =>
            new Member(m.id, m.fname, m.lname, m.phone, m.email));
    }

    /**
     * Checks whether a member exists based on a given email address.
     * @param {string} email Email of member.
     */
    isValidMember(email: string) {
        return this._members.findIndex((member) => member.email === email) >= 0
            ? true
            : false;
    }

    /**
     * Checks whether a member has a bike based on a given email address.
     * @param {string} email Email of the member.
     */
    hasARentedBike(email: string) {
        const transaction = TransactionsService.getTransactions()
            .find((t: Transaction) => t.details.memberId === this.getMemberId(email) && t.details.returned === false);
        return transaction ? true : false;
    }

    /**
     * Returns a member based on an email address.
     * @param {string} email Email of the member.
     */
    getMember(email: string) {
        return this._members.find((m: Member) => m.email == email);
    }

    /**
     * Returns a member based on and ID.
     * @param {number} id ID of the member.
     */
    getMemberById(id: number) {
        return this._members.find((m: Member) => m.id === id);
    }

    /**
     * Returns a member based on a given member ID.
     * @param {string} email Email of the member.
     */
    getMemberId(email: string) {
        const member = this.getMember(email);
        // -1 means no member were found...
        const memberId = member && member.id >= 0 ? member.id : -1;
        return memberId;
    }

    /**
     * Create a new, valid, member and adds it to the
     * list of members.
     * @param {Member} newMember A Member-like object
     */
    createMember(newMember: Member) {
        return new Promise((resolve, reject) => {
            newMember.email += '@ubike.com';
            // checks whether a member already has the same email address...
            if (this._memberAlreadyExists(newMember.email)) {
                reject('This email has already been registered.');
                return;
            }
            try {
                // create the new member with a valid ID...
                const member = new Member(
                    this._generateIdForNewMember(),
                    newMember.fn,
                    newMember.ln,
                    newMember.phone,
                    newMember.email,
                );
                // push new member to members list...
                this._members.push(member);
                resolve();
            } catch (err) {
                reject('Uh-oh, could not create member, try again later.');
            }
        });
    }

    /**
     * Generates a member ID.
     */
    _generateIdForNewMember() {
        return this._members.length + 1;
    }

    /**
     * Checks whether or not a member with the same email address
     * already exists.
     * @param {string} email Member's email address.
     */
    _memberAlreadyExists(email: string) {
        const memberFound = this._members.findIndex((member) => {
            return member.email === email;
        });
        return memberFound >= 0 ? true : false;
    }

    /**
     * Bans a member based on a given member ID.
     * @param {number} memberId ID of the member.
     */
    banMemberFromService(memberId: number) {
        this.getMemberById(memberId).isBanned = true;
    }

    /**
     * Returns a list of all banned members.
     */
    getBannedMembers() {
        const bm = this._members.filter((m: Member) => m.isBanned === true);
        return bm;
    }
}

export default new MembersService();