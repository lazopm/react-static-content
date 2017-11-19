import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    CONTEXT_GET_ID,
    CONTEXT_IS_SERVER,
    CONTEXT_IS_STATIC_CHILD,
} from '../symbols';

class StaticContent extends Component {
    constructor(props, context) {
        super();
        const renderID = !context[CONTEXT_IS_STATIC_CHILD] && context[CONTEXT_GET_ID]();
        this.state = {
            renderID, 
            markup: !context[CONTEXT_IS_SERVER] && this.findMarkup(renderID),
        };
        if (!context[CONTEXT_IS_SERVER]) {
            this.shouldComponentUpdate = () => false;
        }
    }
    findMarkup(renderID) {
        const node = document.querySelector(
            `[data-render-id="${renderID}"`
        );
        if (!node) {
            //raise error
            return null;
        }
        return node.innerHTML
    }
    getChildContext() {
        return { isStaticChild: true };
    }
    render() {
        const props = this.state.renderID && { 'data-render-id': this.state.renderID };
        return this.state.markup ? (
            <div {...props}
                dangerouslySetInnerHTML={{
                    __html: this.state.markup
                }}
            />
        ) : (
            <div {...props}>
                {this.props.children}
            </div>
        );
    }
}

StaticContent.childContextTypes = {
    [CONTEXT_IS_STATIC_CHILD]: PropTypes.bool,
};

StaticContent.contextTypes = {
    [CONTEXT_GET_ID]: PropTypes.func,
    [CONTEXT_IS_SERVER]: PropTypes.bool,
    [CONTEXT_IS_STATIC_CHILD]: PropTypes.bool,
};

export default StaticContent;
