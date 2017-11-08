import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import RenderIdProvider from './RenderIdProvider';
import App from './App';

const app = express();
app.use('/assets', express.static('build'));
app.get('/', (req, res) => {
    const html = renderToString(
        <RenderIdProvider server>
            <App data={`server only data ${Math.random()}`}/>
        </RenderIdProvider>
    );
    res.send(`
        <html>
            <body>
                <div id="root">${html}</div>
                <script src="/assets/app.bundle.js"></script>
            </body>
        </html>
    `);
});
app.listen(3333)
