import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { MdDescription, MdOutlineTitle } from "react-icons/md";
import DatePicker from "react-datepicker";
import Markdown from "react-markdown";
import "react-datepicker/dist/react-datepicker.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import MarkDownEditor from "./MarkDownEditor";
const Shared = ({ initialValues, validationSchema, handleSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className="h-full w-full text-sm"
    >
      {({ values, errors, touched, handleChange }) => (
        <Form className="flex flex-col gap-4 w-full h-full text-cardBg text-sm my-8">
          <div className="sm:w-full  w-[90%] m-auto flex flex-col gap-1">
            <label
              htmlFor="dueDate"
              className={`font-semibold capitalize text-sm ${
                touched["dueDate"] && errors["dueDate"]
                  ? "text-red-600"
                  : "text-textColor"
              }`}
            >
              Due Date*
            </label>
            <div className="bg-background p-2 rounded-md w-fit text-textColor">
              <DatePicker
                className="bg-transparent p-1 outline-none"
                name="dueDate"
                selected={values["dueDate"]}
                onChange={(date) => {
                  const event = {
                    target: {
                      name: "dueDate",
                      value: date,
                    },
                  };
                  handleChange(event);
                }}
              />
            </div>
            <ErrorMessage
              name="dueDate"
              className="text-red-600 text-sm"
              component="p"
            />
          </div>
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
            <div className="w-full grid grid-cols-2 bg-background p-2 rounded-md sm:grid-cols-1 sm:gap-3 relative text-textColor ">
              <div className="border-r border-border p-2 sm:border sm:border-border">
                <MdDescription className="absolute top-2 right-2 text-primaryColor text-lg" />
                <Field
                  name="description"
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows={window.innerWidth < 600 ? 10 : 19}
                      placeholder="enter description..."
                      className="  custom-scroll outline-none w-full p-1 bg-transparent resize-none"
                    ></textarea>
                  )}
                />
              </div>
              <div className="p-2 w-full sm:border sm:border-border overflow-wrap-break-word h-[25rem] sm:h-[13rem] overflow-y-scroll custom-scroll">
                <MarkDownEditor markdown={values["description"]} />
              </div>
            </div>
            <ErrorMessage
              name="description"
              className="text-red-600 text-sm"
              component="p"
            />
          </div>

          <button
            type="submit"
            className="p-2 mt-4 bg-primaryColor text-cardBg font-semibold text-xl rounded-md
          hover:bg-secondaryColor transition-transition w-[90%] m-auto sm:w-full"
          >
            Add
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Shared;
