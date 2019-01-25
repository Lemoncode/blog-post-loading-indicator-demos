# Summary

# Steps

Work in progress:

- First let's install react promise tracker

```bash
npm install react-promise-tracker --save
```

- Now let's create a very basic spinner.

```javascript
import React from 'react';
import { promiseTrackerHoc } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import './spinner.css';

const InnerSpinner = (props) => (
  <h1>Hey some async call in progress ! </h1>
);

```

- React promise tracker implements an HoC that will inform to our spinner when a
tracker asynchronous is in progress, let's wrap the spinner with this Hoc.

```diff
import React from 'react';
+ import { promiseTrackerHoc } from 'react-promise-tracker';
```

```diff
import React from 'react';
import { promiseTrackerHoc } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import './spinner.css';

const InnerSpinner = (props) => (
  <h1>Hey some async call in progress ! </h1>
);

+ export const Spinner = promiseTrackerHoc(InnerSpinner);
```

- Now we have available a property called XXXX, we can use it to show / display
the spinner.

```diff
const InnerSpinner = (props) => (
+  props.trackedPromiseInProgress &&
  <h1>Hey some async call in progress ! </h1>
)
```

- Let's jump now to the place where we are making a fetch call, let's wrap
the fetch call with a _trackPromise_ method.

- now if we run the project we can see that the spinner is being shown
when the async call is in progress. If we want to track any async call
that returns a promise we just only need to wrap it.

- To wrap up this sample let's make a more professional looking spinner.
We will install a library called _react loader spinner_.

```bash
npm install react-loader-spinner --save
```

- Let's define the spinner, For the sake of simplicity we will define styles inline.

- Now if we run the application we get a better looking spinner.

- Hope you enjoyed this video, thanks for watching