/* eslint no-undef: 0 */
import {assert, expect, should} from 'chai';
import RacksService from '../js/service/Racks.service';

describe('Racks Service', () => {
  it('should have 21 bikes in total', () => {
    assert.lengthOf(RacksService._getBikesOnly(), 21);
  });

  it('should return a valid bike', () => {
    const bike = RacksService.pickABike();
    assert.equal(bike.isRented, false, "should return a non-rented bike only");
  });

  it('should get a bike by its id', () => {
    const bike = RacksService.getBikeById(1);
    assert.equal(bike.id, 1);
  });

  it('should return just available bikes', () => {
      const racks = RacksService.getNonRentedBikesOnly();
      racks.forEach((rack) => {
        rack.bikes.forEach((bike) => {
            assert.equal(bike.isRented, false);
        });
      });
  });

  it('should return a bike to a rack', () => {
    const bike = RacksService.getBikeById(1);
    RacksService.returnBikeToRack(bike);
    assert.equal(RacksService.getNonRentedBikesOnly()[0].bikes.length, 7);
  });
});