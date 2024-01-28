import React, { useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { loginSchema, loginInitialValues } from "@/schema/AuthSchema";
import { Form, Formik } from "formik";
import InputField from "@/components/Auth/InputField";
import { setUser } from "@/redux/slices/AuthSlice";
import { CiUser } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {loginUser } from "@/utils/authService";
import { getUser } from "@/utils/userService";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.auth);
  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[user])

  const handleSubmit = async(values) => {
    await loginUser(values);
    const userData = await getUser();
    console.log(userData);
    dispatch(setUser(userData));
  };
  return (
    <Formik
      className="flex flex-col gap-4 w-full"
      initialValues={loginInitialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form action="" className="flex flex-col gap-4 w-full">
          <InputField
            icon={<CiUser />}
            name="username"
            type="text"
            placeholder="enter username..."
            errors={errors}
            touched={touched}
          />
          <InputField
            icon={<AiOutlineMail />}
            name="email"
            type="email"
            placeholder="enter email..."
            errors={errors}
            touched={touched}
          />
          <InputField
            icon={<CiLock />}
            name="password"
            type="password"
            placeholder="enter password..."
            errors={errors}
            touched={touched}
          />
          <button
            type="submit"
            className="p-2 bg-primaryColor text-white dark:text-black font-semibold text-xl rounded-md
          hover:bg-secondaryColor transition-transition"
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
