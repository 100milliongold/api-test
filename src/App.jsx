import React from "react";
import CoinList from "./components/CoinList";

import style from "./App.module.css";

function App() {
  return (
    <div className={style.container}>
      <CoinList />
    </div>
  );
}

export default App;
