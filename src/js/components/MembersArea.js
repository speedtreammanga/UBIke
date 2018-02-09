/* @flow */
import $ from 'jquery';
import Component from '../models/Component';
import Alert from './Alert';
import RacksService from '../service/Racks.service';
import Bike from '../models/Bike';

class MembersArea extends Component {
    emailInvalid: boolean = false;

    constructor() {
        super('#app-content', 'MembersAreaContent');
        this._render();
    }

    _render() {
        this.setState((prevState) => ({
            MembersAreaContent: this._buildPageContent()
        }), () => this._initJqueryTriggers());
        
    }

    _buildPageContent() {
        return `
            <div id="MembersAreaContent">
            <p>Enter your UBIke key to rent a bike.</p>
            <div class="ui large right labeled input">
                <input class="rent-member-email" type="text" placeholder="Enter email">
                <div class="ui basic label">
                    @ubike.com
                </div>
            </div>
            <button id="rent" class="ui primary button">Rent</button>
            ${
                this.emailInvalid
                ? `<p style="margin: 20px 0; color: red;">${this.errorMessage}</p>`
                : ''
            }
            </div>
        `;
    }

    _initJqueryTriggers() {
        $('button#rent.button').on('click', (e) => {
            this.emailInvalid = false;
            const emailEntered = `${$('input.rent-member-email').val()}@ubike.com`;
            this._rentBike(emailEntered);
        });
    }

    _rentBike(memberEmail) {
        try {
            const bike: Bike = RacksService.pickABike();
            bike.rent(memberEmail)
            .then((res) => {
                this._render();
                const alert = new Alert('Bike rented', 'positive');
            })
            .catch((err) => {
                this.emailInvalid = true;
                this._displayError(err);
            });
        } catch (err) {
            this.emailInvalid = true;
            this._displayError(err);
        }
    }

    _displayError(errMessage) {
        this.errorMessage = errMessage;
        this._render();
        return false;
    }
}

export default MembersArea;