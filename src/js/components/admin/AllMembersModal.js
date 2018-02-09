
/* @flow */
import Modal from '../../models/Modal';
import MembersService from '../../service/Members.service';
import Member from '../../models/Member';

/**
 * All Members Modal component.
 */
class AllMembersModal extends Modal {

    /**
     * Init.
     * @param {string} modalId ID of the new modal
     */
    constructor(modalId: string) {
        super(
            modalId,
            'All Members',
            'Ok',
            'Dismiss'
        );

        this.setModalContent(
            this._getModalChildren(),
            this._handleError,
            this._handleOk,
            this._handleCancel
        );
    }

    /**
     * Returns the children of the Modal parent.
     */
    _getModalChildren() {
        return `
            <table
                style="margin-bottom: 50px;"
                class="ui unstackable compact single line red table"
            >
                <thead>
                    <tr>
                        <th>Member#ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Banned?</th>
                    </tr>
                </thead>
                <tbody>
                    ${this._buildMembersNodes()}
                </tbody>
            </table>
        `;
    }

    /**
     * Builds content..
     */
    _buildMembersNodes() {
        this.members = MembersService.members;
        return this.members
            .reduce((nodesSum, m: Member) => {
                nodesSum += `
                    <tr class="${m.isBanned ? 'error': ''}">
                        <td>${m.id}</td>
                        <td>${m.fn}</td>
                        <td>${m.ln}</td>
                        <td>${m.phone}</td>
                        <td>${m.email}</td>
                        <td>${m.isBanned}</td>
                    </tr>
                `;
                return nodesSum;
            }, '');
    }

    /**
     * handles error...
     */
    _handleError = (err) => console.warn('Something went wrong', err);

    /**
     * Close on cancel...
     */
    _handleCancel = () => this.dismiss();

    /**
     * Dismiss on OK
     */
    _handleOk() {
        this._handleCancel();
    }
}

export default AllMembersModal;