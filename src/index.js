import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QuestionnaireProvider } from "./context/QuestionnaireContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QuestionnaireProvider>
    <App />
  </QuestionnaireProvider>
);
