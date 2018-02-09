/* @flow */
import Component from '../models/Component';

class Alert extends Component {
    _message: string;
    _outcome: string;

    /**
     * @param {string} message text to be displayed in the alert box.
     * @param {string} outcome wheter the alert is 
     * `positive`, `info`, `warning`, or `negative`
     */
    constructor(message: string = "Alert", outcome: string = "") {
        super('body', 'alertContent');
        this._message = message;
        this._outcome = outcome;

        this.setState((prev) => ({
            alertContent: this._render()
        }));
        setTimeout(() => {
            this.dismiss();
        }, 2000);
    }

    _render() {
        return `
            <div
                id="alertContent"
                class="ui ${this._outcome} message"
                style="text-align: center; width: fit-content; margin: 30px auto;"
            >
                <div class="header">
                    ${this._message}
                </div>
            </div>
        `;
    }

    dismiss() {
        this.remove();
    }
}

export default Alert;