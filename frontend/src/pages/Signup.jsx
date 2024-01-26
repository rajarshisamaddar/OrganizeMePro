import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { signupInitialValues, signupSchema } from "@/schema/AuthSchema";
import { Form, Formik } from "formik";
import InputField from "@/components/AuthForm/InputField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/AuthSlice";
import {jwtDecode} from "jwt-decode";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    const data = {
      ...values,
      style: {
        theme: "light",
        color: "#571089",
      },
    };
    console.log(data);
    axios
      .post("http://localhost:8800/api/v1/user/register", data)
      .then((response) => {
        console.log(response);
        dispatch(setUser(response.data))
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <Formik
      className="flex flex-col gap-3 w-full"
      initialValues={signupInitialValues}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form action="" className="flex flex-col gap-4 w-full">
          <InputField
            icon={<HiOutlineUserCircle />}
            name="fullName"
            type="text"
            placeholder="enter fullname..."
            errors={errors}
            touched={touched}
          />
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
            className="p-3 bg-primaryColor text-white dark:text-black font-semibold  rounded-md
          hover:bg-secondaryColor transition-transition"
          >
            Signup
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
