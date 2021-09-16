import React from "react";
import Toolbar from "../../containers/Toolbar/Toolbar";

const Home = props => {
  return (
    <>
      <Toolbar />
      <main className="mainWrapper relative">
        {props.children}
      </main>
    </>
  );
};

export default Home;
