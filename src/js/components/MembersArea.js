/* @flow */
import $ from 'jquery';
import Component from '../models/Component';
import Alert from './Alert';
import RacksService from '../service/Racks.service';
import Bike from '../models/Bike';

/**
 * Members Area Component.
 */
class MembersAreaComponent extends Component {
    emailInvalid: boolean = false;

    /**
     * Init.
     */
    constructor() {
        super('#app-content', 'MembersAreaContent');
        this._render();
    }

    /**
     * Set state of this component.
     */
    _render() {
        this.setState((prevState) => ({
            MembersAreaContent: this._buildPageContent()
        }), () => this._initJqueryTriggers());
        
    }

    /**
     * Members Area HTML.
     */
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

    /**
     * Rent a bike for a member for a given email address.
     * @param {string} memberEmail Email of the member
     */
    _rentBike(memberEmail: string) {
        try {
            // pick an available bike...
            const bike: Bike = RacksService.pickABike();
            bike.rent(memberEmail)
            .then((res) => {
                this._render();
                // display cool alert...
                const alert = new Alert('Bike rented', 'positive');
            })
            .catch((err) => {
                // display any error...
                this.emailInvalid = true;
                this._displayError(err);
            });
        } catch (err) {
            // display any error...
            this.emailInvalid = true;
            this._displayError(err);
        }
    }

    /**
     * Display any error by a given string.
     * @param {string} errMessage Error message
     */
    _displayError(errMessage: string) {
        this.errorMessage = errMessage;
        this._render();
        return false;
    }

    /**
     * Init jquery triggers.
     */
    _initJqueryTriggers() {
        // on `Rent` button click...
        $('button#rent.button').on('click', (e) => {
            this.emailInvalid = false;
            const emailEntered = `${$('input.rent-member-email').val()}@ubike.com`;
            this._rentBike(emailEntered);
        });
    }
}

export default MembersAreaComponent;