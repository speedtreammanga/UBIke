import $ from 'jquery';
import Component from './models/Component';
import MembersAreaComponent from './components/MembersArea';
import SignUpModal from './components/SignUpModal';
import AdminAreaComponent from './components/AdminArea';

/**
 * The component responsible for displaying the main components
 * without having to go to another page.
 * - MembersAreaComponent
 * - AdminAreaComponent
 * 
 * This is the base of this app.
 */
class App extends Component {
    view: Component;

    /**
     * Setup the component and initialize its
     * view with the MembersAreaComponent
     */
    constructor() {
        super('#root', 'appContent');

        this.setState((prev) => ({
            appContent: this.render()
        }));

        this.view = new MembersAreaComponent();
        this._setJqueryTriggers();
    }

    /**
     * App's html
     */
    render() {
        return `
            <div
                id="app-content"
                style="text-align:center;"
            >
            </div>
        `;
    }

    /**
     * Set jquery triggers...
     */
    _setJqueryTriggers() {
        this._handleAdminPanelClick();
        this._handleSignUpClick();
    }
    
    /**
     * Handle `Admin Panel` button.
     * When on MembersArea, displays as 'Admin Panel'
     * and as 'Members Area' when on AdminPanel.
     */
    _handleAdminPanelClick() {
        $('Button#admin-panel-btn').click((e) => {
            this.view.remove();
            // going from admin panel to members area...
            if (this.view instanceof AdminAreaComponent) {
                this.view = new MembersAreaComponent();
                $('Button#sign-up-btn').show();
                $('Button#admin-panel-btn').html('Admin Panel');
            // going from members area to admin panel...
            } else {
                this.view = new AdminAreaComponent();
                $('Button#sign-up-btn').hide();
                $('Button#admin-panel-btn').html('Members Area');
            }
        });
    }

    /**
     * Display SignUp modal on 'Sign Up' button click
     */
    _handleSignUpClick() {
        $('Button#sign-up-btn').click((e) => {
            const signupModal = new SignUpModal('signup-modal-form');
        });
    }
}

const mainApp = new App();

