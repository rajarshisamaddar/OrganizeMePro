import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Category from "./pages/Category";
import AuthLayout from "@/components/Layouts/AuthLayout";
import PrivateRouter from "./components/Layouts/PrivateRouter";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <Routes>
      {/* Private Routes */}
      <Route element={<PrivateRouter />}>
        <Route index element={<Home />} />
        <Route path="/:topic/:id" element={<Category />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
      </Route>
    </Routes>
  );
}

export default App;
