/* @flow */
import { RACKS_BIKES_RELATIONSHIPS } from '../../config/datasource';
import Bike from '../models/Bike';

/**
 * Service responsible for managing the bike stations.
 */
class RacksService {
    racksAndBikes = RACKS_BIKES_RELATIONSHIPS;
    availableRacksAndBikes = [];
    _instantiated = false;

    /**
     * Initializes the racks and their bikes.
     */
    constructor() {
        this._getAvailableBikesForEachRack();
        this._instantiated = true;
    }

    /**
     * Get the racks and every bike.
     * @returns {{rackId, bike}} 
     */
    getRacksAndBikes(): {rackId: number, bikes: Bike[]}[] {
        this._getAvailableBikesForEachRack();
        return [...this.racksAndBikes];
    }


    /**
     * Simulates the act of a member picking a bike to rent.
     */
    pickABike(): Bike {
        // total nb of bikes available...
        const nbBikes = this.getNonRentedBikesOnly().reduce((total, rack) => total += rack.bikes.length, 0);
        // generate random index...
        const randomIndex = Math.floor(Math.random() * nbBikes);
        const bikes: Bike[] = this._getBikesOnly();
        // pick a random bike...
        const bike = bikes[randomIndex];
        return bike;
    }

    /**
     * Get a list of all the bikes only.
     */
    _getBikesOnly() {
       return this.racksAndBikes.reduce((bikeSum, rack) => {
            bikeSum.push(...rack.bikes);
            return bikeSum;
        }, []);
    }

    /**
     * Get a bike by a given bike ID.
     * @param {number} bikeId ID of the bike to find.
     */
    getBikeById(bikeId: number) {
        const bikes = this._getBikesOnly();
        // find matching bike...
        const bike = bikes.find((bike: Bike) => bike.id === bikeId);
        return bike;
    }

    /**
     * Builds the racks and their bikes...
     */
    _getAvailableBikesForEachRack() {
        const availableBikes = this.racksAndBikes
            .map((rack: {rack_id: number, bikes: Bike[]}, index: number) => ({
                rack_id: rack.rack_id,
                bikes: rack.bikes.map((bike: Bike) => {
                    // if instantiated, do not create `new Bike` else,
                    // there will be a `type` disparity later on...
                    if (this._instantiated)
                        return bike;
                    return new Bike(bike.id, bike.code);
                })
            }));
        this.racksAndBikes = availableBikes;
        this.availableRacksAndBikes = availableBikes;
    }

    /**
     * Builds the racks and the `available` bikes only...
     */
    _fetchNonRentedBikesOnly() {
        const availableBikes = this.availableRacksAndBikes
        .map((rack: {rack_id: number, bikes: Bike[]}, index: number) => ({
            rack_id: rack.rack_id,
            bikes: rack.bikes.map((bike: Bike) => {
                // if instantiated, do not create `new Bike` else,
                // there will be a `type` disparity later on...
                if (this._instantiated)
                    return bike;
                return new Bike(bike.id, bike.code);
            })
            .filter((bike: Bike) => !bike.isAlreadyRented()) //<- get only the bikes which are not already rented.
        }));
        this.availableRacksAndBikes = availableBikes;
    }

    /**
     * Get the racks and their non-rented bikes.
     */
    getNonRentedBikesOnly() {
        this._fetchNonRentedBikesOnly();
        return this.availableRacksAndBikes;
    }

    /**
     * Returns a bike to an available rack.
     * @param {Bike} bike The bike to return.
     */
    returnBikeToRack(bike: Bike) {
        this.getNonRentedBikesOnly()
            .find((rack) => rack.bikes.length < 10)
            .bikes.push(bike);
    }
}

export default new RacksService();