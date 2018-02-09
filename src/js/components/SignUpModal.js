/* @flow */
import $ from 'jquery';
import Modal from '../models/Modal';
import MembersService from '../service/Members.service';
import Member from '../models/Member';
import Alert from './Alert';

class SignUpModal extends Modal {
    formIsInvalid: boolean = false;
    errorMessage: string = '';
    _inputs: {}[];

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

    _setModalFields() {
        this._inputs = [
            {label: 'First Name', input: {id: 'signup-firstname', placeholder: 'Enter First Name'}},
            {label: 'Last Name', input: {id: 'signup-lastname', placeholder: 'Enter Last Name'}},
            {label: 'Emergency Phone', input: {id: 'signup-phone', placeholder: 'Enter Emergency Phone'}},
        ];
    }

    _getModalChildren() {
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

    _getLabel(text: string) {
        return `
            <p style="margin: 20px auto 5px;">
                ${text}
                <span style="color: red;">&nbsp;*</span>
            </p>
        `;
    }

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

    _handleError = (err) => console.warn('Something went wrong', err);

    _handleCancel = () => this.dismiss();

    _handleOk() {
        const newMember = {
            id: null,
            fn: $(`input#${this._inputs[0].input.id}`).val(),
            ln: $(`input#${this._inputs[1].input.id}`).val(),
            phone: $(`input#${this._inputs[2].input.id}`).val(),
            email: $('input#signup-email').val(),
        };
        this._verifyFieldsValidity({...newMember});
        if (this.formIsInvalid)
            return;

        MembersService.createMember({...newMember})
        .then((res) => {
            const alert = new Alert(`Welcome to UBIke ${newMember.fn}`, 'positive');
            this.dismiss();
        })
        .catch((err) => {
            this.formIsInvalid = true;
            this._displayError(err);
        });
    }

    _verifyFieldsValidity(memberInfo: Member) {
        let atLeastOneInputEmpty = false;
        Object.keys(memberInfo).forEach((key) => {
            if (key !== 'id' && memberInfo[key].length == 0) {
                atLeastOneInputEmpty = true;
            }
        });
        if (atLeastOneInputEmpty) {
            this.formIsInvalid = true;
            this._displayError('Fill out every input in the form to continue.');
            return;
        }
        this.formIsInvalid = false;
    }

    _displayError(errMessage) {
        this.errorMessage = errMessage;
        this.setModalContent(this._getModalChildren());
        return false;
    }

}

export default SignUpModal;