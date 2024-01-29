import React, { useState } from "react";
import CrudLayout from "../Layouts/CrudLayout";
import { useDispatch, useSelector } from "react-redux";
import { toogleAdd } from "@/redux/slices/tasksSlice";
import SharedForm from "../Topics/SharedForm";
import { taskInitialValues, taskSchema } from "@/schema/TaskSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { MdDescription, MdOutlineTitle } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddTasks = () => {
  const { taskToogle } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [dueDate, setDueDate] = useState(new Date());
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    taskToogle && (
      <CrudLayout onClick={() => dispatch(toogleAdd(false))} isTask={true}>
        <div className="flex w-full flex-col items-center gap-3 justify-center">
          <h1 className="text-xl font-semibold">Add Task</h1>
          <Formik
            initialValues={taskInitialValues}
            validationSchema={taskSchema}
            onSubmit={handleSubmit}
            className="h-full w-full text-sm"
          >
            {({ values, errors, touched, handleChange }) => (
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
                          rows="12"
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
                  <div className="bg-background p-2 rounded-md w-full relative text-black">
                    <DatePicker
                    className="p-2 bg-background w-full"
                      name="dueDate"
                      selected={values["dueDate"]}
                      onChange={(date) =>{
                        const event = {
                            target:{
                                name:"dueDate",
                                value:date,
                            }
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
                <button
                  type="submit"
                  className="p-2 bg-primaryColor text-cardBg font-semibold text-xl rounded-md
                    hover:bg-secondaryColor transition-transition w-[90%] m-auto sm:w-full"
                >
                  Add
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </CrudLayout>
    )
  );
};

export default AddTasks;
