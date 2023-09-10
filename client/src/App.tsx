import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Provider from "./components/Provider";
import UserProvider from "./components/Provider/UserProvider";
import Router from "./router";

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <UserProvider>
          <Router />
        </UserProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
