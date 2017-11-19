# React Static Content 
rehydrate server rendered static content without the data

```javascript
//server
ReactDOMServer.renderToString(
    <StaticRenderProvider server>
        <StaticContent renderID="big-table">
            <Table data={giantDataObject} />
        </StaticContent>
    </StaticRenderProvider>
);

//client
ReactDOM.rehydrate(
    <StaticRenderProvider>
        <StaticContent renderID="big-table">
            <Table data={null} />
        </StaticContent>
    </StaticRenderProvider>,
    document.getElementById('root'),
);
```
