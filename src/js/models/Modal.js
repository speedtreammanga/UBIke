/* @flow */
import $ from 'jquery';
import Component from './Component';

/**
 * Basic Modal model.
 */
class Modal extends Component {
    _modalId: string;
    _cancelText: string;
    _okText: string;
    _header: string;
    _children: string;
    _errCallback: () => any;
    _okCallback: () => any;
    _cancelCallback: () => any;

    _css = {
        dimmer: `
            position: fixed;
            top: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
        `,
        modal: `
            top: 150px !important;
            width: auto !important;
        `
    };

    /**
     * Initializes Modal
     * @param {string} modalId set the ID attr of the modal.
     * @param {string} header title of the modal to be displayed.
     * @param {string} okText text for the ok button.
     * @param {string} cancelText text for the cancel button.
     * @param {function} errCallback function to call when an error happens.
     * @param {function} okCallback function to call when logic succeeds.
     */
    constructor(
        modalId: string,
        header: string,
        okText: string = 'continue',
        cancelText: string = 'cancel'
    ) {
        super('body', 'modal');
        this._modalId = modalId;
        this._header = header;
        this._okText = okText;
        this._cancelText = cancelText;
    }

    /**
     * Set the components of the modal.
     * @param {string} components Components to be displayed in the modal
     * @param {function} errCb Error callback
     * @param {function} okCb Ok callback
     * @param {function} cancelCb Cancel callback
     */
    setModalContent(components: string, errCb, okCb, cancelCb) {
        try {
            this._errCallback = errCb ? errCb : this._errCallback;
            this._okCallback = okCb ? okCb : this._okCallback;
            this._cancelCallback = cancelCb ? cancelCb : this._cancelCallback;
            this._children = components;
            this._updateModalInnerComponents();
        } catch (err) {
            this._errCallback(err);
        }
    }

    /**
     * Updates modal's content.
     */
    _updateModalInnerComponents() {
        this.setState((prevState) => ({
            modal: this._getModal()
        }), () => this._initJqueryTriggers());
    }

    /**
     * Modal's html.
     */
    _getModal() {
        return $(`
            <div id="modal">
            <div id="${this._modalId}" class="ui active tiny modal" style="${this._css.modal}">
                <div class="header">${this._header}</div>
                <div class="content">
                    ${this._children}
                </div>
                <div class="actions">
                    <button class="ui cancel button">${this._cancelText}</button>
                    <button class="ui primary button">${this._okText}</button>
                </div>
            </div>
            <div id="dimmer" class="active ui dimmer" style="${this._css.dimmer}"></div>
            </div>
        `);
    }

    /**
     * Dismiss modal.
     */
    dismiss() {
        this.remove();
    }

    /**
     * Returns Modal's ID.
     */
    get modalId(): string {
        return new String(this._modalId);
    }

    /**
     * Initializes jquery triggers.
     */
    _initJqueryTriggers() {
        // on OK button click...
        $(`#${this._modalId} button.ui.primary.button`).on('click', () => {
            this._okCallback();
        });

        // on Cancel button click...
        $(`#${this._modalId} button.ui.cancel.button`).on('click', () => {
            this._cancelCallback();
        });
    }
}

export default Modal;