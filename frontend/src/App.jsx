import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Category from "./pages/Category";
import AuthLayout from "@/components/Layouts/AuthLayout";
import PrivateRouter from "./components/Layouts/PrivateRouter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "@/utils/userService";
import { setLoading, setUser } from "@/redux/slices/AuthSlice";
function App() {

  return (
    <Routes>
      {/* Private Routes */}
      <Route element={<PrivateRouter />}>
        <Route index element={<Home />} />
        <Route path="/:id" element={<Category />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
