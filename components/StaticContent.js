import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StaticContent extends Component {
    constructor(props, context) {
        super();
        const renderID = !context.isStaticChild && context.getID();
        this.state = {
            renderID, 
            markup: !context.isServer
                && document.querySelector(
                    `[data-render-id="${renderID}"`
                ).innerHTML
        };
    }
    shouldComponentUpdate() {
        return false;
    }
    getChildContext() {
        return { isStaticChild: true };
    }
    render() {
        const props = this.state.renderID && { 'data-render-id': this.state.renderID };
        return this.context.isServer ? (
            <div {...props}>
                {this.props.children}
            </div>
        ) : (
            <div
                {...props}
                dangerouslySetInnerHTML={{
                    __html: this.state.markup
                }}
            />
        );
    }
}

StaticContent.childContextTypes = {
    isStaticChild: PropTypes.bool,
};

StaticContent.contextTypes = {
    getID: PropTypes.func,
    isServer: PropTypes.bool,
    isStaticChild: PropTypes.bool,
};

export default StaticContent;
