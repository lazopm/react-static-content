import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRenderProvider from './components/StaticRenderProvider';
import App from './App';

const PORT = process.env.PORT;
const app = express();
app.use('/assets', express.static('build'));
app.get('/', (req, res) => {
    const html = renderToString(
        <StaticRenderProvider server>
            <App data={`server generated ${Math.random()}`}/>
        </StaticRenderProvider>
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
app.listen(PORT, '0.0.0.0', () =>
    console.log(`Serving on port ${PORT}`)
);
