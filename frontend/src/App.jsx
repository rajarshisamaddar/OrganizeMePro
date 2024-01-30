import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Category from "./pages/Category";
import AuthLayout from "@/components/Layouts/AuthLayout";
import PrivateRouter from "./components/Layouts/PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "@/utils/userService";
import { setLoading, setUser } from "@/redux/slices/AuthSlice";
import AddTaskPage from "./pages/AddTaskPage";
import Tasks from "./pages/Tasks";
import EditTask from "./pages/EditTask";
import { Toaster } from "react-hot-toast";
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userDetails = async () => {
    dispatch(setLoading(true));
    try {
      const userData = await getUser();
      dispatch(setUser(userData));
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
    <>
      <Routes>
        {/* Private Routes */}
        <Route element={<PrivateRouter />}>
          <Route index element={<Home />} />
          <Route path="/:id" element={<Category />} />
          <Route path="addTask/:id" element={<AddTaskPage />} />
          <Route path="viewTask/:id" element={<Tasks />} />
          <Route path="editTask/:id" element={<EditTask />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
