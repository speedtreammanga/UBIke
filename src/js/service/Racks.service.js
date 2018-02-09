/* @flow */
import { RACKS_BIKES_RELATIONSHIPS } from '../../config/datasource';
import Bike from '../models/Bike';

class RacksService {
    racksAndBikes = RACKS_BIKES_RELATIONSHIPS;
    availableRacksAndBikes = [];
    _instantiated = false;
    constructor() {
        this._getAvailableBikesForEachRack();
        this._instantiated = true;
    }

    getRacksAndBikes(): {rackId: number, bikes: Bike[]}[] {
        this._getAvailableBikesForEachRack();
        return [...this.racksAndBikes];
    }

    /**
     * Simulates the act of a member picking a bike to rent.
     */
    pickABike(): Bike {
        // this._getAvailableBikesForEachRack();
        const nbBikes = this.getNonRentedBikesOnly().reduce((total, rack) => total += rack.bikes.length, 0);
        // const nbBikes = this.racksAndBikes.reduce((total, rack) => total += rack.bikes.length, 0);
        const randomIndex = Math.floor(Math.random() * nbBikes);
        
        const bikes: Bike[] = this._getBikesOnly();
        const bike = bikes[randomIndex];
        return bike;
    }

    _getBikesOnly() {
       return this.racksAndBikes.reduce((bikeSum, rack) => {
            bikeSum.push(...rack.bikes);
            return bikeSum;
        }, []);
    }

    getBikeById(bikeId: number) {
        const bikes = this._getBikesOnly();
        const bike = bikes.find((bike: Bike) => bike.id === bikeId);
        return bike;
    }

    _getAvailableBikesForEachRack() {
        const availableBikes = this.racksAndBikes
            .map((rack: {rack_id: number, bikes: Bike[]}, index: number) => ({
                rack_id: rack.rack_id,
                bikes: rack.bikes.map((bike: Bike) => {
                    if (this._instantiated)
                        return bike;
                    return new Bike(bike.id, bike.code);
                })
            }));
        this.racksAndBikes = availableBikes;
        this.availableRacksAndBikes = availableBikes;
    }

    _fetchNonRentedBikesOnly() {
        const availableBikes = this.availableRacksAndBikes
        .map((rack: {rack_id: number, bikes: Bike[]}, index: number) => ({
            rack_id: rack.rack_id,
            bikes: rack.bikes.map((bike: Bike) => {
                if (this._instantiated)
                    return bike;
                return new Bike(bike.id, bike.code);
            })
            .filter((bike: Bike) => {
                if (!bike.isAlreadyRented()) {
                    return bike;
                }
                return false;
            })
        }));
        this.availableRacksAndBikes = availableBikes;
    }

    getNonRentedBikesOnly() {
        this._fetchNonRentedBikesOnly();
        return this.availableRacksAndBikes;
    }

    returnBikeToRack(bike: Bike) {
        this.getNonRentedBikesOnly()
            .find((rack) => rack.bikes.length < 10)
            .bikes.push(bike);
    }
}

export default new RacksService();