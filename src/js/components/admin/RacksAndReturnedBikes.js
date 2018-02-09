/* @flow */
import Component from '../../models/Component';
import Bike from '../../models/Bike';
import RacksService from '../../service/Racks.service';

class RacksAndReturnedBikes extends Component {
    rackNodes: string = '';
    bikes: Bike[] = [];
    // _racksService: RacksService;

    constructor() {
        super('#racks-returned-bikes', 'racksAndReturnedBikesContent');

        this.setState((prevState) => ({
            racksAndReturnedBikesContent: this._buildRacksAndReturnedBikes()
        }));
    }

    _buildRacksAndReturnedBikes() {
        return `
            <div id="racksAndReturnedBikesContent">
                <div class="ui stackable three column grid">
                    <div class="row racks-container">
                    ${this._fetchAvailableBikes()}
                    </div>
                </div>
            </div>
        `;
    }

    _fetchAvailableBikes = () => {
        this.rackNodes = '';
        const bikes = [];

        const availableBikes: {rack_id: number, bikes: Bike[]}[]
            = RacksService.getNonRentedBikesOnly();

        availableBikes.map((rack, index) => {
            bikes.push(...rack.bikes);
            this.rackNodes += this._buildRacksNodes(rack, index);
        });
        this.bikes = [...bikes];
        return this.rackNodes;
    }

    _buildRacksNodes = (rack: {rack_id: number, bikes: Bike[]}, index: number) => {
        let racks: string = '';
        racks += `
        <div class="column">
            <h2>Bike Rack #${index + 1}</h2>
            <table id="bike-rack-${index}" class="ui bike-rack-${index} unstackable single line blue table">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Bike Code</th>
                    </tr>
                </thead>
                <tbody>
                    ${this._buildBikeNodes(rack.bikes, index)}
                </tbody>
            </table>
        </div>
        `;
        return racks;
    }

    _buildBikeNodes = (rackBikes: Bike[], rackIndex: number) => {
        let bikes = '';
        rackBikes.forEach((bike: Bike, index: number) => {
            bikes += `
                <tr id="bike-${rackIndex + "-" + index}" class="bike bike-rack-${rackIndex}">
                    <td>${bike.id}</td>
                    <td>${bike.code}</td>
                </tr>
            `;
        });
        return bikes;
    }
}
export default RacksAndReturnedBikes;