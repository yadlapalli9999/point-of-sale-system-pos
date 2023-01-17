import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ListItems from "./pages/ListItems";
import "antd/dist/reset.css";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BillPage from "./pages/BillPage";
import CustomerPage from "./pages/CustomerPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list"
            element={
              <ProtectedRoute>
                <ListItems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer"
            element={
              <ProtectedRoute>
                <CustomerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bill"
            element={
              <ProtectedRoute>
                <BillPage />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
// export default ProtectedRoute
