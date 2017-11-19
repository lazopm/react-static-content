import React from 'react';
import { hydrate } from 'react-dom';
import StaticRenderProvider from './components/StaticRenderProvider';
import App from './App';

hydrate( 
    <StaticRenderProvider>
        <App/>
    </StaticRenderProvider>,
    document.getElementById('root'),
);
