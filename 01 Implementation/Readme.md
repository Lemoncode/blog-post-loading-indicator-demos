# Summary

# Steps

Work in progress:

- First let's install react promise tracker

```bash
npm install react-promise-tracker --save
```

- Now let's create a very basic loading indicator, let's call it spinner.

_./src/index_

```diff
import React, { Component } from 'react';
import { render } from 'react-dom';
import { App } from './app';

+ const InnerLoadingIndicator = props => (
+   <h1>Hey some async call in progress ! </h1>
+ );

render(
  <div>
    <App />
  </div>,
  document.getElementById('root'));
```

- Now we need a way to know whether the loading indicator needs
  to be shown or not. React promise tracker implements a High Order Component that can report the current status to our loading indicator.

Let's start by importing the _promiseTrackerHoc_

_./src/index_

```diff
import React from 'react';
+ import { promiseTrackerHoc } from 'react-promise-tracker';
```

Wrap our _spinner_ component with the _promiseTrackerHoc_

_./src/index_

```diff
const InnerLoadingIndicator = (props) => (
  <h1>Hey some async call in progress ! </h1>
);

+ const LoadingIndicator = promiseTrackerHoc(InnerLoadingIndicator);
```

- Now we have available a property called _trackedPromiseInProgress_, we can use it to show / display the loading indicator depending on that flag value.

_./src/index.ts_

```diff
const InnerLoadingIndicator = (props) => (
+  props.trackedPromiseInProgress &&
  <h1>Hey some async call in progress ! </h1>
)
```

- We can now instantiate this component at our application entry point.

_./src/index.ts_

```diff
render(
  <div>
    <App />
+   <LoadingIndicator/>
  </div>,
  document.getElementById('root'));
```

- Let's jump now to the place where we are making a fetch call, let's wrap
  the fetch call with a _trackPromise_ method.

First we will add the import to the react promise tracker library

_./app.js_

```diff
import { UserTable, LoadButton } from './components';
import './app.css';
+ import { trackPromise } from 'react-promise-tracker';
```

The we will wrap the fetch call with a _trackPromise_ method:

_app.js_

```diff
  onLoadTables() {
    this.setState({
      users: [],
    });

+   trackPromise(
    userAPI.fetchUsers()
      .then((users) => {
        this.setState({
          users,
        })
-      });
+      }));
  }
```

- now if we run the project we can see that the loading indicator is being shown when the async call is in progress. If we want to track any async call
  that returns a promise we just only need to wrap it with the _trackPromiseTracking_, _react-promise-tracker_ will take of keeping
  the count of parallel async calls being completed.

- To wrap up this sample let's make a more professional looking loadingIndicator. We will install a library called _react loader spinner_.

```bash
npm install react-loader-spinner --save
```

- Let's define the spinner, For the sake of simplicity we will define styles inline.

First le't add the corresponding import:

_./src/index.js_

```diff
import React, { Component } from 'react';
import { render } from 'react-dom';
import { App } from './app';
+ import Loader from 'react-loader-spinner';
```

_./src/index.js_

```diff
const InnerLoadingIndicator = (props) => (
  props.trackedPromiseInProgress &&
-  <h1>Hey some async call in progress ! </h1>
+    <div
+      style={{
+        width: "100%",
+        height: "100",
+        display: "flex",
+        justifyContent: "center",
+        alignItems: "center"
+      }}
+    >
+      <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
+    </div>
)
```

- Now if we run the application we get a professional looking spinner.

- If you want to learn more about React-Promise-Tracker you can check
  it's github page, it contains live samples plus documentation.

- Hope you enjoyed this video, thanks for watching
