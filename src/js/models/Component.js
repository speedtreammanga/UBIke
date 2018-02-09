/* @flow */
import $ from 'jquery';

/**
 * Component model.
 */
class Component {
    nodeElement: string;
    domNode: string;
    state: Object;
    stateBusy: boolean = false;
    _componentUniqueIdentifier: ComponentId;

    /**
     * Initialize a component
     * @param {string} domNode the DOM Node to which we wish to append our components.
     * E.g: '.myElement', '#myElement', etc.
     * @param {string} nodeElement the `state` param to append to the DOM Node during rendenring.
     */
    constructor(domNode: string, nodeElement: string) {
        this.setDomNode(domNode);
        this.setNodeElement(nodeElement);
        this.state = {};
    }

    /**
     * Set the `NodeElement`.
     * @param {string} node Node of the DOM to which we want to append our component to.
     */
    setNodeElement(node) { this.nodeElement = node; }
    /**
     * Set the `DomNode`.
     * @param {string} domNode DOM Node to append to `NodeElement`.
     * Also used as the ID of the component.
     */
    setDomNode(domNode) { this.domNode = domNode; }
    
    /**
     * Redraw the component.
     */
    _repaint() {
        // if component exists, remove it from DOM...
        if (this._componentUniqueIdentifier !== undefined) {
            this.remove();
        } else {
            // ...else generate its unique ID...
            this._componentUniqueIdentifier = new ComponentId(`${this.domNode}${this.nodeElement}`);
        }
        // ...and append component to DOM
        $(this.domNode).append(this.state[this.nodeElement]);
    }

    /**
     * Removes the component from the DOM.
     */
    remove() {
        $(`#${this.nodeElement}`).remove();
    }

    /**
     * Update the state of the component.
     * @param {function} f prevState returning the new `state`
     * @param {callback} cb callback to execute after `state` is set
     */
    setState(f: (prevState: {}) => any, cb?: () => any) {
        // append new key/value pairs to the state object...
        const writeState = function writeState(stateObj, callback) {
            for (const key in stateObj) { this.state[key] = stateObj[key]; }
            this.stateBusy = false;
            this._repaint();
            if (typeof callback === 'function') { callback(); }
        }.bind(this);

        // executes setState again if the state is already busy,
        // else execute `writeState`...
        try {
            if (!this.stateBusy) {
                this.stateBusy = true;
                writeState(f({...this.state}), cb);
                return;
            }
            this.setState(f, cb);
        } catch (err) {
            this.stateBusy = false;
            throw new Error('Something went wrong during `setState()`', err);
        }
    }
}

/**
 * ComponentID model.
 */
class ComponentId {
    _value: string;
    /**
     * Initializes.
     * @param {string} val the value to go from
     */
    constructor(val: string) {
        this._value = this._makeHash(new String(val));
    }

    /**
     * Returns hash.
     */
    get hash() {
        return this._value;
    }

    /**
     * Generates hash from string.
     * @param {string} val value to generate hash from
     */
    _makeHash(val: string) {
        val += `${new Date().getMilliseconds()}`;
        return val
            .split('')
            .reduce((hash, char) => {
                hash += char.charCodeAt(0).toString();
                return hash;
            }, '');
    }
}

export default Component;