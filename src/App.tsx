import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { FourOFour, Login, Dashboard } from "./pages";
import ErrorBoundary from "./hocs/ErrorBoundary";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <ProtectedRoute exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact component={FourOFour} />
          </Switch>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
};

export default App;
