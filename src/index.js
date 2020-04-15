import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Amplify from "aws-amplify";
import config from "./config.json";
//import * as serviceWorker from "./serviceWorker";
import SimpleReactLightbox from "simple-react-lightbox";

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

ReactDOM.render(
  <SimpleReactLightbox>
    <App />
  </SimpleReactLightbox>,
  document.getElementById("root")
);
//serviceWorker.unregister();

ReactDOM.render(<App />, document.getElementById("root"));
// serviceWorker.unregister();
