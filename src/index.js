import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main.js";

import "./components/Base/CoverFlow/CoverFlow.scss";
import "./components/Base/PageLoadingEffects/PageLoadingEffects.scss";
import "./components/Base/PageLoadingEffects/BookIcon.scss";
import "./components/Base/Base.scss";
import "./components/Main.scss";
import "./components/CollectionPage/CollectionPage.scss";
import "./components/DetailPage/DetailPage.scss";

ReactDOM.render(<Main />, document.getElementById("app"));
