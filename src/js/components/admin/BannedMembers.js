import $ from 'jquery';
import Component from '../../models/Component';
import MembersService from '../../service/Members.service';
import Member from '../../models/Member';
import AllMembersModal from './AllMembersModal';

/**
 * Banned Members Component.
 */
class BannedMembers extends Component {
    bannedMembers: Member[] = [];

    /**
     * Init.
     */
    constructor() {
        super('#admin-banned-members-section', 'adminBannedMembersContent');
        this._render();
    }

    /**
     * Set state of component.
     */
    _render() {
        this.setState((prevState) => ({
            adminBannedMembersContent: this._buildBannedMembersContent()
        }), () => this._initJqueryTrigger());
    }

    /**
     * Return component HTML.
     */
    _buildBannedMembersContent() {
        return `
            <div id="adminBannedMembersContent">
                <h2>
                    Banned Members
                    <button 
                        id="see-all-members-btn" 
                        class="ui tiny button red"
                    >
                        See All
                    </button>
                </h2>
                <table
                    style="margin-bottom: 50px;"
                    class="ui unstackable compact single line red table"
                >
                    <thead>
                        <tr>
                            <th>Member#ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Emergency Phone</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this._buildBannedMembersNodes()}
                    </tbody>
                </table>
            </div>
        `;
    }

    /**
     * Build members table `tr`s.
     */
    _buildBannedMembersNodes() {
        this.bannedMembers = MembersService.getBannedMembers();
        return this.bannedMembers
            .reduce((nodesSum, m: Member) => {
                nodesSum += `
                    <tr>
                        <td>${m.id}</td>
                        <td>${m.fn}</td>
                        <td>${m.ln}</td>
                        <td>${m.phone}</td>
                        <td>${m.email}</td>
                    </tr>
                `;
                return nodesSum;
            }, '');
    }

    /**
     * Init jquery triggers.
     */
    _initJqueryTrigger() {
        // on see all click...
        $('#see-all-members-btn').click(() => {
            const modal = new AllMembersModal('adminAllTransactions');
        });
    }
}

export default BannedMembers;