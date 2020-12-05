import React from "react";
import store from "../../src/store";

import Rotas from "./rotas";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Rotas />
    </Provider>
  );
}

export default App;
