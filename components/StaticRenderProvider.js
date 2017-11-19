import React, { Component, Children } from "react";
import PropTypes from 'prop-types';
import uuidv5 from 'uuid/v5';

const seed = "90123e1c-7512-523e-bb28-76fab9f2f73d";

class StaticRenderProvider extends Component {
    constructor() {
        super();
        this.count = 0;
    }
    getID() {
        //generates a unique id for each root StaticContent node.
        //since the values are pedictable, as long as react traverses the tree
        //in the same order in the client and server they will match
        const id = uuidv5(`${this.count}`, seed);
        this.count++;
        return id;
    }
    render() {
        return Children.only(this.props.children)
    }
    getChildContext() {
        return {
            getID: this.getID.bind(this),
            isServer: this.props.server,
        }
    }
}

StaticRenderProvider.defaultProps = {
    server: false,
};

StaticRenderProvider.childContextTypes = {
    getID: PropTypes.func,
    isServer: PropTypes.bool,
}

export default StaticRenderProvider;
