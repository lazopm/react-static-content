import React, { Component, Children } from "react";
import PropTypes from 'prop-types';
import uuidv5 from 'uuid/v5';

const seed = "90123e1c-7512-523e-bb28-76fab9f2f73d";

class RenderIdProvider extends Component {
    constructor() {
        super();
        this.store = [];
    }
    getId() {
        //generates a unique id for each root StaticContent node.
        //since the values are pedictable, as long as react traverses the tree
        //in the same order in the client and server they will match
        const id = uuidv5(String(this.store.length), seed);
        this.store.push(id);
        return id;
    }
    render() {
        return Children.only(this.props.children)
    }
    getChildContext() {
        return {
            getRenderId: this.getId.bind(this),
            isClient: !this.props.server,
        }
    }
}

RenderIdProvider.defaultProps = {
    server: false,
};

RenderIdProvider.childContextTypes = {
    getRenderId: PropTypes.func,
    isClient: PropTypes.bool,
}

export default RenderIdProvider;
