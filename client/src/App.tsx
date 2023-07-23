import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Provider from "./components/Provider";
import Router from "./router";

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Router />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
