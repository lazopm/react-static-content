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
        if (renderID in this.cache) {
            return this.cache[renderID];
        }
        const node = document.querySelector(
            `[data-render-id="${renderID}"`
        );
        if (!node) {
            //raise warning
            return null;
        }
        return node.innerHTML;
    }
    cacheMarkup(renderID, markup) {
        if (renderID in this.cache) {
            return;
        }
        this.cache[renderID] = markup;
    }
    render() {
        return Children.only(this.props.children)
    }
    getChildContext() {
        return {
            [CONTEXT_GET_MARKUP]: this.getMarkup.bind(this), 
            [CONTEXT_CACHE_MARKUP]: this.cacheMarkup.bind(this),
            [CONTEXT_IS_SERVER]: this.props.server,
        }
    }
}

StaticRenderProvider.defaultProps = {
    server: false,
};

StaticRenderProvider.childContextTypes = {
    [CONTEXT_GET_MARKUP]: PropTypes.func,
    [CONTEXT_CACHE_MARKUP]: PropTypes.func,
    [CONTEXT_IS_SERVER]: PropTypes.bool,
}

export default StaticRenderProvider;
