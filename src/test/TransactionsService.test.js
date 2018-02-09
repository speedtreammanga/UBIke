/* eslint no-undef: 0 */
import {assert, expect, should} from 'chai';
import TransactionsService from '../js/service/TransactionsService';

describe('Transactions Service', () => {
  it('should return an Empty Array of Transactions', () => {
    assert.lengthOf(TransactionsService.getTransactions(), 0, 
    'transactions should be empty at the start.');
  });
});