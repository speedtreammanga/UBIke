import $ from 'jquery';
import Component from './models/Component';
import MembersArea from './components/MembersArea';
import SignUpModal from './components/SignUpModal';
import AdminArea from './components/AdminArea';

class App extends Component {
    view: Component;

    constructor() {
        super('#root', 'appContent');

        this.setState((prev) => ({
            appContent: this.render()
        }));

        this.view = new MembersArea();
        this._setJqueryTriggers();
    }

    render() {
        return `
            <div
                id="app-content"
                style="text-align:center;"
            >
            </div>
        `;
    }

    _setJqueryTriggers() {
        this._handleAdminPanelClick();
        this._handleSignUpClick();
    }
    
    _handleAdminPanelClick() {
        $('Button#admin-panel-btn').click((e) => {
            this.view.remove();
            // going from admin panel to members area...
            if (this.view instanceof AdminArea) {
                this.view = new MembersArea();
                $('Button#sign-up-btn').show();
                $('Button#admin-panel-btn').html('Admin Panel');
            // going from members area to admin panel...
            } else {
                this.view = new AdminArea();
                $('Button#sign-up-btn').hide();
                $('Button#admin-panel-btn').html('Members Area');
            }
        });
    }

    _handleSignUpClick() {
        $('Button#sign-up-btn').click((e) => {
            const signupModal = new SignUpModal('signup-modal-form');
        });
    }
}

const mainApp = new App();

