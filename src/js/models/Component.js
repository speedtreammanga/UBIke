/* @flow */
import $ from 'jquery';

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

    setNodeElement(node) { this.nodeElement = node; }
    setDomNode(domNode) { this.domNode = domNode; }
    
    _repaint() {
        // console.log('componentUniqueID:', this._componentUniqueIdentifier);
        if (this._componentUniqueIdentifier !== undefined) {
            this.remove();
            // console.log('updating component', this.domNode, this.nodeElement);
        } else {
            this._componentUniqueIdentifier = new ComponentId(`${this.domNode}${this.nodeElement}`);
        }
        // console.log('component rendered');
        $(this.domNode).append(this.state[this.nodeElement]);
    }

    remove() {
        // console.log('removing id', `#${this.nodeElement}`);
        $(`#${this.nodeElement}`).remove();
    }

    setState(f: (prevState: {}) => any, cb?: () => any) {
        const writeState = function writeState(stateObj, callback) {
            for (const key in stateObj) { this.state[key] = stateObj[key]; }
            this.stateBusy = false;
            this._repaint();
            if (typeof callback === 'function') { callback(); }
        }.bind(this);

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

class ComponentId {
    _value: string;
    constructor(val: string) {
        this._value = this._makeHash(new String(val));
    }

    get hash() {
        return this._value;
    }

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