import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    CONTEXT_GET_MARKUP,
    CONTEXT_CACHE_MARKUP,
    CONTEXT_IS_SERVER,
    CONTEXT_IS_STATIC_CHILD,
} from '../constants';

class StaticContent extends Component {
    constructor(props, context) {
        super();
        const renderID = !context[CONTEXT_IS_STATIC_CHILD] && props.renderID;
        this.state = {
            renderID, 
            markup: !context[CONTEXT_IS_SERVER] && context[CONTEXT_GET_MARKUP](renderID),
        };
        if (!context[CONTEXT_IS_SERVER]) {
            this.shouldComponentUpdate = () => false;
            this.componentWillUnmount = () => 
                this.context[CONTEXT_CACHE_MARKUP](renderID, this.state.markup);
        }
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
    [CONTEXT_GET_MARKUP]: PropTypes.func,
    [CONTEXT_CACHE_MARKUP]: PropTypes.func,
    [CONTEXT_IS_SERVER]: PropTypes.bool,
    [CONTEXT_IS_STATIC_CHILD]: PropTypes.bool,
};

export default StaticContent;
