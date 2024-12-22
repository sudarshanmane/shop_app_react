import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import SellProducts from "./Components/SellProducts";
import AppLayout from "./Components/AppLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<AppLayout></AppLayout>}>
          <Route path="/sell-products" element={<SellProducts />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
