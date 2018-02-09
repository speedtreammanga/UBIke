/* @flow */
import $ from 'jquery';
import TransactionsService from './../../service/TransactionsService';
import Component from './../../models/Component';
import Transaction from './../../models/Transaction';

class Transactions extends Component {
    transactions: Transaction[] = [];
    constructor() {
        super('#admin-transactions-section', 'adminTransactionsContent');
        this._render();
    }

    _render() {
        this.setState((prevState) => ({
            adminTransactionsContent: this._buildTransactionsContent()
        }));

        if (this.transactions.length > 0) {
            setTimeout(() => {
                this._render();
            }, 1);
        }
    }

    _buildTransactionsContent() {
        return `
            <div id="adminTransactionsContent">
                <h2>
                    Active Transactions List&nbsp;
                    <button 
                        id="see-all-transaction-btn" 
                        class="ui tiny button green"
                    >
                        See All
                    </button>
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

    _buildTransactionsNodes() {
        this.transactions = TransactionsService.getNonReturnedBikeTransactions();
        return this.transactions
            .reduce((nodesSum, t: Transaction) => {
                nodesSum += `
                    <tr>
                        <td>${t.details.memberId}</td>
                        <td>${t.details.bikeId}</td>
                        <td>${this._getTimeLeft(t.details.countdown)}</td>
                    </tr>
                `;
                return nodesSum;
            }, '');
    }

    _getTimeLeft(countdown) {
        const now = new Date().getTime();
        const diff = countdown - now >= 0 
            ? countdown - now
            : 0;
        return diff;
    }
}

export default Transactions;