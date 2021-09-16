import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { useSelector } from "react-redux";
import React from "react";

import AppRouter from "./navigation/AppRouter";

function App() {
  const auth = useSelector(state => state.auth);
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
