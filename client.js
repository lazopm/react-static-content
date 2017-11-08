import React from 'react';
import { hydrate } from 'react-dom';
import RenderIdProvider from './components/RenderIdProvider';
import App from './App';

hydrate( 
    <RenderIdProvider>
        <App/>
    </RenderIdProvider>,
    document.getElementById('root'),
);
