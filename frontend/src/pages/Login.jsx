import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { loginSchema, loginInitialValues } from "@/schema/AuthSchema";
import { Form, Formik } from "formik";
import InputField from "@/components/AuthForm/InputField";
import { setUser } from "@/redux/slices/AuthSlice";
import { CiUser } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    axios.post('http://localhost:8800/api/v1/user/login',values)
    .then((response)=>{
      console.log(response.data);
      dispatch(setUser(response.data));
      navigate("/");
    })
    .catch((error)=>{
      console.log(error)
    })

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
