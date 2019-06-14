import React from "react";
import Login from "./pages/Login";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import SecuredRoute from "./components/secudedRoute";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/login" component={Login} />
        <SecuredRoute exact path="/loginsecure" component={Login} />
      </BrowserRouter>
    </div>
  );
};

export default App;
