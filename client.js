import React from 'react';
import { hydrate } from 'react-dom';
import App from './App';

import RenderIdProvider from './RenderIdProvider';
hydrate( 
    <RenderIdProvider>
        <App/>
    </RenderIdProvider>,
    document.getElementById('root'),
);
