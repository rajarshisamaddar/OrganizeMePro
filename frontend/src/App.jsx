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
import AddTaskPage from "./pages/AddTaskPage";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = async () => {
    dispatch(setLoading(true));
    try {
      const userData = await getUser();
      if (userData) {
        dispatch(setUser(userData));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    userDetails();
  }, []);
  return (
    <Routes>
      {/* Private Routes */}
      <Route element={<PrivateRouter />}>
        <Route index element={<Home />} />
        <Route path="/:id" element={<Category />} />
        <Route path="addTask/:id" element={<AddTaskPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
