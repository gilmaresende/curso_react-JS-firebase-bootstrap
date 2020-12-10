import React from "react";
import { store, persistor } from "../../src/store";

import Rotas from "./rotas";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Rotas />
      </PersistGate>
    </Provider>
  );
}

export default App;
