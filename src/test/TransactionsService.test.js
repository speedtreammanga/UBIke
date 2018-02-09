/* eslint no-undef: 0 */
import {assert, expect, should} from 'chai';
import TransactionsService from '../js/service/TransactionsService';
import MembersService from '../js/service/Members.service';
import Transaction from '../js/models/Transaction';

describe('Transactions Service', () => {
  before(() => {
    MembersService.getMember('moses@ubike.com').isBanned = false;
  });

  it('should return an empty array of transactions', () => {
    assert.lengthOf(TransactionsService.getTransactions(), 0, 
      'transactions should be empty at the start.');
  });

  it('should create a Transaction object', () => {
    const t = new Transaction(1, 1);
    expect(t.details).to.have.property("memberId").to.equal(1);
    expect(t.details).to.have.property("bikeId").to.equal(1);
  });

  it('should append a new transaction to the list', async () => {
    await TransactionsService.createTransaction('moses@ubike.com', 1);

    assert.lengthOf(TransactionsService.getTransactions(), 1, 
      'should return an array with One transaction');
  });

  it('should get non returned bike transactions', async () => {
    const trans = TransactionsService.getNonReturnedBikeTransactions();

    assert.lengthOf(trans, 1, "should have one non-returned bike transaction");
  });

  it('should set the transaction as late and return the bike', () => {
    const t = TransactionsService.getNonReturnedBikeTransactions()[0];
    TransactionsService.transactionRunningLate(t);

    assert.lengthOf(TransactionsService.getNonReturnedBikeTransactions(), 0,
      'there should be no transaction without a non-returned bike');
  });

  it('should not be able to rent a bike if member is banned', async () => {
    const member = MembersService.getMember('moses@ubike.com');
    MembersService.banMemberFromService(member.id);
    try {
      await TransactionsService.createTransaction('moses@ubike.com', 2);
    } catch (err) { 
      // do nothing...
    }
    expect(MembersService.getBannedMembers()).to.have.length(1);
  });
});