import React from 'react';
import StaticContent from './components/StaticContent';
import AlertButton from './components/AlertButton';

const Content = ({ data }) => [
    <div key="1">DATA: {data}</div>,
    <AlertButton key="2"/>,
];

const App = ({ data }) => (
    <div>
        <h1>React Experiment</h1>
        {"This is wrapped in <StaticContent>:"}
        <div style={{background: 'rgba(0, 0, 255, .15)'}}>
            <StaticContent>
                <Content data={data}/>
            </StaticContent>
        </div>
        <ul>
            <li>Button and other event handlers don't work</li>
            <li>Rehydration doesn't clear content</li>
        </ul>
        <hr/>
        {'This is a regular <div>:'}
        <div style={{background: 'rgba(255, 0, 0, .15)'}}>
            <Content data={data}/>
        </div>
        <ul>
            <li>Button works</li>
            <li>Rehydration removes content from the dom (warning in console)</li>
        </ul>
        <hr/>
        {"Nested <StaticContent> nodes don't generate uuids for even more html size reduction (inspect dom)"}
        <div style={{background: 'rgba(0, 0, 255, .15)'}}>
            <StaticContent>
                root {data}
                <StaticContent>
                    ----nested {data} 
                    <StaticContent>
                        --------nested {data}
                    </StaticContent>
                </StaticContent>
            </StaticContent>
        </div>
        <hr/>
        <p>
            This should work as long as we have a way to match StaticContent elements to their corresponding dom nodes in the client.
        </p>
        <p>
            {'For this example I used the order in which React raverses the tree on the initial render to match the uuids, see components/RenderIdProvider.'}
        </p>
        <p>
            StaticContent provides a context variable "isStaticChild" that we could use to signal our data fetching components to NOT store the data in the apollo cache that gets dumped into window
        </p>
    </div>
);

export default App;
