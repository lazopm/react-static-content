# React Static Content
Sometimes we have large pieces of static content in our application state, such as articles, user comments, or most content coming from a CMS.  
Traditionally when server-side rendering, the initial HTML has two copies of this content, one in the markup and one in a script tag for rehydration.  
This is a proof of concept for a way to rehydrate static content in the client without having the state needed to render it.
