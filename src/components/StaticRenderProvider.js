import React, { Component, Children } from "react";
import PropTypes from 'prop-types';
import {
    CONTEXT_GET_MARKUP,
    CONTEXT_CACHE_MARKUP,
    CONTEXT_IS_SERVER,
} from '../symbols';

class StaticRenderProvider extends Component {
    constructor() {
        super();
        this.cache = {};
    }
    getMarkup(renderID) {
        const node = document.querySelector(
            `[data-render-id="${renderID}"`
        );
        if (!node) {
            //raise error
            return null;
        }
        return node.innerHTML;
    }
    render() {
        return Children.only(this.props.children)
    }
    getChildContext() {
        return {
            [CONTEXT_GET_ID]: this.getID.bind(this),
            [CONTEXT_IS_SERVER]: this.props.server,
        }
    }
}

StaticRenderProvider.defaultProps = {
    server: false,
};

StaticRenderProvider.childContextTypes = {
    [CONTEXT_GET_ID]: PropTypes.func,
    [CONTEXT_IS_SERVER]: PropTypes.bool,
}

export default StaticRenderProvider;
