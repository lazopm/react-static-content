# React Static Content 
rehydrate server rendered static content without the data

```javascript
//server
ReactDOMServer.renderToString(
    <StaticRenderProvider server>
        <StaticContent>
            <Table data={giantDataObject} />
        </StaticContent>
    </StaticRenderProvider>
);

//client
ReactDOM.rehydrate(
    <StaticRenderProvider>
        <StaticContent>
            <Table data={null} />
        </StaticContent>
    </StaticRenderProvider>,
    document.getElementById('root'),
);
```
