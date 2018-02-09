/* @flow */
import $ from 'jquery';
import Modal from '../models/Modal';
import MembersService from '../service/Members.service';
import Member from '../models/Member';
import Alert from './Alert';

/**
 * SignUpModal component.
 */
class SignUpModal extends Modal {
    formIsInvalid: boolean = false;
    errorMessage: string = '';
    _inputs: {}[];

    /**
     * Init.
     * @param {string} modalId ID of the new modal
     */
    constructor(modalId: string) {
        super(
            modalId,
            'Welcome to UBIke',
            'Sign up',
            'Nervermind'
        );

        this._setModalFields();

        this.setModalContent(
            this._getModalChildren(),
            this._handleError,
            this._handleOk,
            this._handleCancel
        );
    }

    /**
     * Sets the majority of the fields.
     */
    _setModalFields() {
        this._inputs = [
            {label: 'First Name', input: {id: 'signup-firstname', placeholder: 'Enter First Name'}},
            {label: 'Last Name', input: {id: 'signup-lastname', placeholder: 'Enter Last Name'}},
            {label: 'Emergency Phone', input: {id: 'signup-phone', placeholder: 'Enter Emergency Phone'}},
        ];
    }

    /**
     * Returns the children of the Modal parent.
     */
    _getModalChildren() {
        // builds fields from array of fields...
        return `
            ${this._inputs.reduce((fields, field) => {
                fields += `
                    ${this._getLabel(field.label)}
                    ${this._getInput(field.input.id, field.input.placeholder)}
                `;
                return fields;
            }, '')}
            ${this._getLabel('Email address')}
            <div class="ui large right labeled input">
                <input id="signup-email" type="text" placeholder="Enter email">
                <div class="ui basic label">
                    @ubike.com
                </div>
            </div>
            ${
                this.formIsInvalid
                ? `<p style="color:red;">${this.errorMessage}</p>`
                : ''
            }
        `;
    }

    /**
     * Returns a label.
     * @param {string} text Text of the label
     */
    _getLabel(text: string) {
        return `
            <p style="margin: 20px auto 5px;">
                ${text}
                <span style="color: red;">&nbsp;*</span>
            </p>
        `;
    }

    /**
     * Returns an input field.
     * @param {string} id ID of the input field
     * @param {string} placeholder Placeholder of the input field
     */
    _getInput(id: string, placeholder: string) {
        return `
            <div class="ui input">
                <input
                    id="${id}"
                    type="text"
                    placeholder="${placeholder}"
                    value="${$(`input#${id}`).val() || ''}"
                >
            </div>
        `;
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
     * Create new Member upon form completion.
     */
    _handleOk() {
        const newMember = {
            id: null,
            fn: $(`input#${this._inputs[0].input.id}`).val(),
            ln: $(`input#${this._inputs[1].input.id}`).val(),
            phone: $(`input#${this._inputs[2].input.id}`).val(),
            email: $('input#signup-email').val(),
        };
        // checks everything looks good...
        this._verifyFieldsValidity({...newMember});
        if (this.formIsInvalid)
            return;
        // create new member...
        MembersService.createMember({...newMember})
        .then((res) => {
            // show cool alert to let users know...
            const alert = new Alert(`Welcome to UBIke ${newMember.fn}`, 'positive');
            this.dismiss();
        })
        .catch((err) => {
            // display error...
            this.formIsInvalid = true;
            this._displayError(err);
        });
    }

    /**
     * Checks whether or not there's an empty value for a key.
     * @param {Member} memberInfo Member
     */
    _verifyFieldsValidity(memberInfo: Member) {
        let atLeastOneInputEmpty = false;
        Object.keys(memberInfo).forEach((key) => {
            if (key !== 'id' && memberInfo[key].length == 0) {
                atLeastOneInputEmpty = true;
            }
        });
        // if an input is empty display error...
        if (atLeastOneInputEmpty) {
            this.formIsInvalid = true;
            this._displayError('Fill out every input in the form to continue.');
            return;
        }
        this.formIsInvalid = false;
    }

    /**
     * Displays the error message to notify users.
     * @param {string} errMessage Error message to display
     */
    _displayError(errMessage: string) {
        this.errorMessage = errMessage;
        this.setModalContent(this._getModalChildren());
        return false;
    }
}

export default SignUpModal;