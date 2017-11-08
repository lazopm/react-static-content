import React from 'react';
import StaticContent from './components/StaticContent';
import AlertButton from './components/AlertButton';

const Content = ({ data }) => [
    <div key="1">DATA: {data}</div>,
    <AlertButton key="2"/>,
];

const App = ({ data }) => (
    <div>
        StaticContent:
        <div style={{background: 'rgba(0, 0, 255, .15)'}}>
            <StaticContent>
                <Content data={data}/>
            </StaticContent>
        </div>
        <ul>
            <li>Button and other event handlers don't work</li>
        </ul>
        <hr/>
        Regular div:
        <div style={{background: 'rgba(255, 0, 0, .15)'}}>
            <Content data={data}/>
        </div>
        <ul>
            <li>Button works</li>
            <li>Rehydration removes content from the dom (warning in console)</li>
        </ul>
    </div>
);

export default App;
