/* @flow */
import Component from '../models/Component';
import Bike from '../models/Bike';
import Transactions from './admin/Transactions';
import BannedMembers from './admin/BannedMembers';
import RacksAndReturnedBikes from './admin/RacksAndReturnedBikes';

/**
 * Admin Area Component.
 */
class AdminAreaComponent extends Component {
    rackNodes: string = '';
    bikes: Bike[] = [];

    /**
     * Init.
     */
    constructor() {
        super('#app-content', 'AdminAreaContent');

        this.setState((prevState) => ({
            AdminAreaContent: this._buildAdminArea()
        }), () => {
            // init all admin area only components...
            new Transactions();
            new BannedMembers();
            new RacksAndReturnedBikes();
        });
    }

    /**
     * Returns Admin Area's HTML.
     */
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
export default AdminAreaComponent;