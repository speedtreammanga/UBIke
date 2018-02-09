/* @flow */
import Modal from '../../models/Modal';
import TransactionsService from '../../service/TransactionsService';
import Transaction from '../../models/Transaction';

/**
 * All Transactions Modal component.
 */
class AllTransactionsModal extends Modal {

    /**
     * Init.
     * @param {string} modalId ID of the new modal
     */
    constructor(modalId: string) {
        super(
            modalId,
            'All Transactions',
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
                class="ui unstackable compact single line green table"
            >
                <thead>
                    <tr>
                        <th>Member#ID</th>
                        <th>Bike#ID</th>
                        <th>Returned?</th>
                        <th>Late?</th>
                        <th>Time Left(ms)</th>
                    </tr>
                </thead>
                <tbody>
                    ${this._buildTransactionsNodes()}
                </tbody>
            </table>
        `;
    }

    /**
     * Builds content..
     */
    _buildTransactionsNodes() {
        this.transactions = TransactionsService.getTransactions();
        return this.transactions
            .reduce((nodesSum, t: Transaction) => {
                nodesSum += `
                    <tr>
                        <td>${t.details.memberId}</td>
                        <td>${t.details.bikeId}</td>
                        <td>${t.details.returned}</td>
                        <td>${t.details.late}</td>
                        <td>${t._getTimeLeft(t.details.countdown)}</td>
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
     * Dismiss on OK.
     */
    _handleOk() {
        this._handleCancel();
    }
}

export default AllTransactionsModal;