import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StaticContent extends Component {
    constructor(props, context) {
        super();
        const renderId = !context.isStaticChild && context.getRenderId();
        this.state = { renderId };
        if (context.isClient) {
            this.state.markup = document.querySelector(`[data-render-id="${renderId}"`).innerHTML;
            this.shouldComponentUpdate = () => false;
        }
    }
    getChildContext() {
        return {
            isStaticChild: true,
        }
    }
    render() {
        const props = this.state.renderId && { 'data-render-id': this.state.renderId };
        return this.context.isClient ? (
            <div
                {...props}
                dangerouslySetInnerHTML={{__html: this.state.markup}}
            />
        ) : (
            <div {...props}>
                {this.props.children}
            </div>
        );
    }
}

StaticContent.childContextTypes = {
    isStaticChild: PropTypes.bool,
};

StaticContent.contextTypes = {
    getRenderId: PropTypes.func,
    isClient: PropTypes.bool,
    isStaticChild: PropTypes.bool,
};

export default StaticContent;
