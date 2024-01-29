import { Field, Formik, Form, ErrorMessage } from "formik";
import React from "react";
import { MdDescription, MdOutlineTitle } from "react-icons/md";

const SharedForm = ({initialValue, validationSchema, handleSubmit, type}) => {
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className="h-full w-full text-sm"
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-4 w-full h-full text-cardBg text-sm">
          <div className="sm:w-full  w-[90%] m-auto flex flex-col gap-1">
            <label
              htmlFor="title"
              className={`font-semibold capitalize text-sm ${
                touched["title"] && errors["title"]
                  ? "text-red-600"
                  : "text-textColor"
              }`}
            >
              Title*
            </label>
            <div className="bg-background p-2 rounded-md w-full relative text-textColor">
              <MdOutlineTitle className="absolute top-1/2 -translate-y-1/2 right-2 text-primaryColor text-lg" />
              <Field
                name="title"
                type="text"
                placeholder="enter title..."
                className="outline-none w-full p-1 bg-transparent"
              />
            </div>
            <ErrorMessage
              name="title"
              className="text-red-600 text-sm"
              component="p"
            />
          </div>

          <div className="sm:w-full  w-[90%] m-auto flex flex-col gap-1">
            <label
              htmlFor="description"
              className={`font-semibold capitalize text-sm ${
                touched["description"] && errors["description"]
                  ? "text-red-600"
                  : "text-textColor"
              }`}
            >
              Description*
            </label>
            <div className="bg-background p-2 rounded-md w-full relative text-textColor">
              <MdDescription className="absolute top-2 right-2 text-primaryColor text-lg" />
              <Field
                name="description"
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows="6"
                    placeholder="enter description..."
                    className="outline-none w-full p-1 bg-transparent resize-none"
                  ></textarea>
                )}
              />
            </div>
            <ErrorMessage
              name="description"
              className="text-red-600 text-sm"
              component="p"
            />
          </div>

          <button
            type="submit"
            className="p-2 bg-primaryColor text-cardBg font-semibold text-xl rounded-md
              hover:bg-secondaryColor transition-transition w-[90%] m-auto sm:w-full"
          >
            {type}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SharedForm;
