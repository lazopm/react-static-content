import React from 'react';
import StaticContent from './StaticContent';
import AlertButton from './AlertButton';

const App = ({ data }) => (
    <div>
        <AlertButton/>
        <StaticContent>
            {data}
        </StaticContent>
    </div>
);

export default App;
