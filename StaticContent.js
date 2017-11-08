import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StaticContent extends Component {
    constructor(props, context) {
        super();
        const renderId = context.getRenderId();
        if (context.isClient) {
            this.state = {
                markup: document.querySelector(`[data-render-id="${renderId}"`).innerHTML,
                renderId,
            };
            this.shouldComponentUpdate = () => false;
        }
        else {
            this.state = { renderId };
        }
    }
    render() {
        return this.context.isClient ? (
            <div
                data-render-id={this.state.renderId}
                dangerouslySetInnerHTML={{__html: this.state.markup}}
            />
        ) : (
            <div data-render-id={this.state.renderId}>
                {this.props.children}
            </div>
        );
    }
}

StaticContent.contextTypes = {
   getRenderId: PropTypes.func,
   isClient: PropTypes.bool,
};

export default StaticContent;
