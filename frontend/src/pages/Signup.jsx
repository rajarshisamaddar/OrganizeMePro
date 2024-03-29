import React, { useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { signupInitialValues, signupSchema } from "@/schema/AuthSchema";
import { Form, Formik } from "formik";
import InputField from "@/components/Auth/InputField";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/AuthSlice";
import {  signupUser } from "@/utils/authService";
import { getUser } from "@/utils/userService";
import { backgroundColorGenerator } from "@/data/randomColor";
const Signup = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    const color = backgroundColorGenerator();
    const data = {
      ...values,
      style: {
        theme: "light",
        color: color,
      },
    };
    await signupUser(data);
    const userData = await getUser();
    console.log(userData);
    dispatch(setUser(userData));
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
