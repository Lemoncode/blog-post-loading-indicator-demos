# Summary

In this sample we are going to add a http loading indicator to our application, it will take care by itself to show/hide whenever there are tracked asynchronous calls in progress.

# Steps

Let's get started

- First let's install the library react promise tracker

```bash
npm install react-promise-tracker --save
```

- Let's create a very basic loading indicator, let's call it _InnerLoadingIndicator_.

_./src/index_

```diff
import React, { Component } from 'react';
import { render } from 'react-dom';
import { App } from './app';

 
+ const LoadingIndicator = props => {
+   return (
+    <h1>Hey some async call in progress ! </h1>
+  );  
+ }

render(
  <div>
    <App />
  </div>,
  document.getElementById('root'));
```

- Now we need a way to know whether the loading indicator needs
  to be shown or not. React promise tracker implements a High Order Component that can report the current status to our loading indicator component.

Let's start by importing the _promiseTrackerHoc_

_./src/index_

```diff
import React from 'react';
+ import { usePromiseTracker } from "react-promise-tracker";
```

Use the _react-promise-tracker_  _usePromiseTracker_ hook.

_./src/index_

```diff
 const LoadingIndicator = props => {
+   const { promiseInProgress } = usePromiseTracker();

   return (
+     promiseInProgress && 
    <h1>Hey some async call in progress ! </h1>
  );  
 }
```

- We can now instantiate this component at our application entry point level

_./src/index.ts_

```diff
render(
  <div>
    <App />
+   <LoadingIndicator/>
  </div>,
  document.getElementById('root'));
```

- Let's jump now to the place where we are making a fetch call, we will wrap
  the fetch call with a _trackPromise_ method.

First we will add the import to the react promise tracker library

_./app.js_

```diff
import { UserTable, LoadButton } from './components';
import './app.css';
+ import { trackPromise } from 'react-promise-tracker';
```

Then we will wrap the fetch call with a _trackPromise_ method:

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

- now if we run the project we can see that the loading indicator is being shown when the asynchronous call is in progress. If we want to track any async call that returns a promise we just only need to wrap it with the _trackPromise_ method, _react-promise-tracker_.

- To wrap up this sample let's make a more professional looking _loadingIndicator_. We will install a library called _react loader spinner_.

```bash
npm install react-loader-spinner --save
```

- Let's define the spinner, For the sake of simplicity we will define the styles inline.

First le't add the corresponding import:

_./src/index.js_

```diff
import React, { Component } from 'react';
import { render } from 'react-dom';
import { App } from './app';
+ import Loader from 'react-loader-spinner';
```

- Now let's pimp our loading indicator:
  - We will center the spinner to be displayedf.
  - We will add one of the spinners that read-loader-spinner offers.

_./src/index.js_

```diff
const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress && 
-        <h1>Hey some async call in progress ! </h1>;
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
};
```

- Now if we run the application we can see that we are getting a better looking loading indicator.

```bash
npm start
```

- If you want to learn more about React-Promise-Tracker you can check it's github page, it contains live samples plus documentation.

https://github.com/Lemoncode/react-promise-tracker



