import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSchema } from "@/schema/UserSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import InputField from "./InputField";
import { FaUserEdit } from "react-icons/fa";
import { updateUserDetails } from "@/utils/userService";
import { updateUser } from "@/redux/slices/AuthSlice";
const UpdateForm = ({ setOpenUpdate }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const initialValue = {
    fullName: user.fullName,
    username: user.username,
    email: user.email,
  };
  const handleSubmit = async (values) => {
    await updateUserDetails({ data: values, email: user.email });
    dispatch(updateUser(values));
    setOpenUpdate(false);
  };
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={userSchema}
      onSubmit={handleSubmit}
      className="h-full w-full"
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-4 w-full h-full text-cardBg">
          <div className=" sm:w-full  w-[90%] m-auto flex flex-col gap-1">
            <label htmlFor="fullName"className=
            {`font-semibold capitalize text-sm ${
              touched['fullName'] && errors['fullName'] ? "text-red-600" : "text-textColor"
            }`}>Full Name*</label>
            <div className="bg-background p-2 rounded-md w-full relative text-textColor">
              <FaUserEdit className="absolute top-1/2 -translate-y-1/2 right-2 text-primaryColor text-lg" />
              <Field
                name="fullName"
                type="text"
                placeholder="enter fullname..."
                className="outline-none w-full p-1 bg-transparent"
              />
            </div>
            <ErrorMessage
              name="fullName"
              className="text-red-600 text-sm"
              component="p"
            />
          </div>

          <div className=" sm:w-full  w-[90%] m-auto flex flex-col gap-1">
            <label htmlFor="username"className=
            {`font-semibold capitalize text-sm ${
              touched['username'] && errors['username'] ? "text-red-600" : "text-textColor"
            }`}>User Name*</label>
            <div className="bg-background p-2 rounded-md w-full relative text-textColor">
              <FaUserEdit className="absolute top-1/2 -translate-y-1/2 right-2 text-primaryColor text-lg" />
              <Field
                name="username"
                type="text"
                placeholder="enter username..."
                className="outline-none w-full p-1 bg-transparent"
              />
            </div>
            <ErrorMessage
              name="username"
              className="text-red-600 text-sm"
              component="p"
            />
          </div>

          <div className=" sm:w-full  w-[90%] m-auto flex flex-col gap-1">
            <label htmlFor="email"className=
            {`font-semibold capitalize text-sm ${
              touched['email'] && errors['email'] ? "text-red-600" : "text-textColor"
            }`}>Email*</label>
            <div className="bg-background p-2 rounded-md w-full relative text-textColor">
              <FaUserEdit className="absolute top-1/2 -translate-y-1/2 right-2 text-primaryColor text-lg" />
              <Field
                name="email"
                type="email"
                placeholder="enter email..."
                className="outline-none w-full p-1 bg-transparent"
              />
            </div>
            <ErrorMessage
              name="email"
              className="text-red-600 text-sm"
              component="p"
            />
          </div>


          <button
            type="submit"
            className="p-2 bg-primaryColor text-cardBg font-semibold text-xl rounded-md
          hover:bg-secondaryColor transition-transition w-[90%] m-auto sm:w-full"
          >
            update
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateForm;
