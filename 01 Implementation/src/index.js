import React from "react";
import { render } from "react-dom";
import { App } from "./app";
import { promiseTrackerHoc } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const InnerLoadingIndicator = props =>
  props.trackedPromiseInProgress && (
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
    </div>
  );

const LoadingIndicator = promiseTrackerHoc(InnerLoadingIndicator);

render(
  <div>
    <App />
    <LoadingIndicator />
  </div>,
  document.getElementById("root")
);
