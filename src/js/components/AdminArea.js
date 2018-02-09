/* @flow */
import Component from '../models/Component';
import Bike from '../models/Bike';
import Transactions from './admin/Transactions';
import BannedMembers from './admin/BannedMembers';
import RacksAndReturnedBikes from './admin/RacksAndReturnedBikes';

class AdminArea extends Component {
    rackNodes: string = '';
    bikes: Bike[] = [];
    // _racksService: RacksService;

    constructor() {
        super('#app-content', 'AdminAreaContent');

        this.setState((prevState) => ({
            AdminAreaContent: this._buildAdminArea()
        }), () => {
            const a = new Transactions();
            const b = new BannedMembers();
            const c = new RacksAndReturnedBikes();
        });
    }

    _buildAdminArea() {
        return `
            <div id="AdminAreaContent">
                <div style="display: flex; flex-wrap: wrap;">
                    <div id="admin-transactions-section" style="flex: 1; margin-right: 12px;"></div>
                    <div id="admin-banned-members-section" style="flex: 1; margin-left: 12px;"></div>
                </div>

                <div id="racks-returned-bikes"></div>
            </div>
        `;
    }
}
export default AdminArea;