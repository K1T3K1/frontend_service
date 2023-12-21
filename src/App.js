import React from "react";
import RegistrationForm from "./registrationView.js";
import LoginForm from "./loginView.js";
import StocksView from "./stocksView.js";
import WalletView from "./walletView.js";
import Navbar from "./navbar.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.scss";

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="page">
          <Navbar />
          <div className="mainBox">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/stocks" element={<StocksView />} />
              <Route path="/wallet" element={<WalletView />} />
              <Route element={<RegistrationForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
