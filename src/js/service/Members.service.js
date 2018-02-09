/* @flow */
import { MEMBERS } from '../../config/datasource';
import Member from '../models/Member';
import TransactionsService from './TransactionsService';
import Transaction from '../models/Transaction';

class MembersService {
    _members: Member[] = [];
    constructor() {
        this.members = this._fetchMembers();
    }
    
    get members(): Member[] {
        return [...this._members];
    }
    set members(value) {
        this._members = value;
    }

    _fetchMembers() {
        return MEMBERS.map((m: Member) =>
            new Member(m.id, m.fname, m.lname, m.phone, m.email));
    }

    isValidMember(email: string) {
        return this._members.findIndex((member) => member.email === email) >= 0
            ? true
            : false;
    }

    hasARentedBike(email: string) {
        const transaction = TransactionsService.getTransactions()
            .find((t: Transaction) => t.details.memberId === this.getMemberId(email) && t.details.returned === false);
        return transaction ? true : false;
    }

    getMember(email) {
        return this._members.find((m: Member) => m.email == email);
    }

    getMemberById(id: number) {
        return this._members.find((m: Member) => m.id === id);
    }

    getMemberId(email) {
        const member = this.getMember(email);
        const memberId = member && member.id >= 0 ? member.id : -1;
        return memberId;
    }

    createMember(newMember: Member) {
        return new Promise((resolve, reject) => {
            newMember.email += '@ubike.com';
            if (this._memberAlreadyExists(newMember.email)) {
                reject('This email has already been registered.');
                return;
            }
            try {
                const member = new Member(
                    this._generateIdForNewMember(),
                    newMember.fn,
                    newMember.ln,
                    newMember.phone,
                    newMember.email,
                );
        
                this._members.push(member);
                resolve();
            } catch (err) {
                reject('Uh-oh, could not create member, try again later.');
            }
        });
    }

    _generateIdForNewMember() {
        return this._members.length + 1;
    }

    _memberAlreadyExists(email: string) {
        const memberFound = this._members.findIndex((member) => {
            return member.email === email;
        });
        return memberFound >= 0 ? true : false;
    }

    banMemberFromService(memberId: number) {
        this.getMemberById(memberId).isBanned = true;
    }

    getBannedMembers() {
        const bm = this._members.filter((m: Member) => m.isBanned === true);
        return bm;
    }
}

export default new MembersService();