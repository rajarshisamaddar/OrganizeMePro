import React from "react";
import { Field, ErrorMessage } from "formik";
const InputField = ({ name, type, placeholder, icon, touched, errors }) => {
  return (
    <div>
      <label htmlFor={name} className={`font-semibold capitalize text-sm ${touched[name]&&errors[name]?"text-red-600":"text-textColor"}`}>
        {name}*
      </label>
      <div
        className={`bg-background mt-1
    p-2 w-full rounded-borderRadius  focus-within:ring-1 border flex items-center gap-x-2
    ${
      touched[name] && errors[name]
        ? "border-red-600 ring-red-600 "
        : "border-transparent ring-black "
    }`}
      >
        <div
          className={`text-2xl ${
            touched[name] && errors[name] ? "text-red-600" : "text-primaryColor"
          } font-bold`}
        >
          {icon}
        </div>

        <Field
          name={name}
          type={type}
          placeholder={placeholder}
          className={`outline-none w-full p-1 bg-transparent`}
        />
      </div>

      <ErrorMessage
        name={name}
        component="p"
        className="text-sm my-1 text-red-600 font-semibold"
      />
    </div>
  );
};

export default InputField;
