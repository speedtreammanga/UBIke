/* eslint no-undef: 0 */
import {assert, expect, should} from 'chai';
import MembersService from '../js/service/Members.service';

describe('Members Service', () => {
  it('should have five members total at the start', () => {
    assert.lengthOf(MembersService.members, 5, 
      'there is five members during init');
  });

  it('should return true if email corresponds to a member', () => {
      assert.isTrue(MembersService.isValidMember('moses@ubike.com'),
        'should find the user with email `moses@ubike.com`');
  });

  it('should return no transactions as no member has a rented bike yet', () => {
    const transaction = MembersService.hasARentedBike('moses@ubike.com');
    assert.isFalse(transaction, "shouldn't find any transaction");
  });

  it('should return an ID for a new member', () => {
    assert.equal(MembersService._generateIdForNewMember(), 6,
        "next ID for new member should be 7");
  });

  it('should return true if a member already exists', () => {
      assert.isTrue(MembersService._memberAlreadyExists('moses@ubike.com'));
  });

  it('should return no banned members has no one has been banned yet', () => {
    expect(MembersService.getBannedMembers()).to.have.length(0);
  });

  it('should return a member based on his email', () => {
      const member = MembersService.getMember('moses@ubike.com');
      expect(member).to.have.property("email").to.equal('moses@ubike.com');
  });

  it('should ban a member successfully', () => {
    const member = MembersService.getMember('moses@ubike.com');
    MembersService.banMemberFromService(member.id);
    expect(MembersService.getBannedMembers()).to.have.length(1);
  });

  it('should create a new member', async () => {
    const newMember = {
        id: null,
        fn: 'Bruce',
        ln: 'Wayne',
        phone: '777-897-4654',
        email: 'bruce.w@ubike.com',
    };
    await MembersService.createMember(newMember);
    assert.lengthOf(MembersService.members, 6, 
        'there should now be six members');
  });

});