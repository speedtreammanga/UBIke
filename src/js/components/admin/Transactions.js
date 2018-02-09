/* @flow */
import $ from 'jquery';
import TransactionsService from './../../service/TransactionsService';
import Component from './../../models/Component';
import Transaction from './../../models/Transaction';
import AllTransactionsModal from './AllTransactionsModal';

/**
 * Transactions component for admin panel.
 */
class Transactions extends Component {
    transactions: Transaction[] = [];

    /**
     * Init.
     */
    constructor() {
        super('#admin-transactions-section', 'adminTransactionsContent');
        this._render();
    }

    /**
     * Sets state of component.
     */
    _render() {
        this.setState((prevState) => ({
            adminTransactionsContent: this._buildTransactionsContent()
        }), () => this._initJqueryTrigger());

        // render component each ms to update 
        // countdown while transactions > 0...
        if (this.transactions.length > 0) {
            setTimeout(() => {
                this._render();
            }, 1);
        }
    }

    /**
     * Returns the content of the component.
     */
    _buildTransactionsContent() {
        return `
            <div id="adminTransactionsContent">
                <h2>
                    Active Transactions List&nbsp;
                    ${this._buildSellAllButton()}
                </h2>
                <table
                    style="margin-bottom: 50px;"
                    class="ui unstackable compact single line green table"
                >
                    <thead>
                        <tr>
                            <th>Member#ID</th>
                            <th>Bike#ID</th>
                            <th>Time Left(ms)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this._buildTransactionsNodes()}
                    </tbody>
                </table>
            </div>
        `;
    }

    /**
     * Returns the See All button.
     */
    _buildSellAllButton() {
        let content = '';
        if (this.transactions.length == 0) {
            content = `
                <button 
                    id="see-all-transaction-btn" 
                    class="ui tiny button green"
                >
                    See All
                </button>
            `;
        }
        return content;
    }

    /**
     * Builds rows of the table with transactions info.
     */
    _buildTransactionsNodes() {
        this.transactions = TransactionsService.getNonReturnedBikeTransactions();
        return this.transactions
            .reduce((nodesSum, t: Transaction) => {
                nodesSum += `
                    <tr>
                        <td>${t.details.memberId}</td>
                        <td>${t.details.bikeId}</td>
                        <td>${t._getTimeLeft(t.details.countdown)}</td>
                    </tr>
                `;
                return nodesSum;
            }, '');
    }

    /**
     * Init jquery triggers.
     */
    _initJqueryTrigger() {
        // on see all button click...
        $('#see-all-transaction-btn').click(() => {
            // display new modal...
            const modal = new AllTransactionsModal('adminAllTransactions');
        });
    }
}

export default Transactions;