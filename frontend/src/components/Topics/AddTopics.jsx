import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { backgroundColorGenerator } from "@/data/randomColor";
import { RxCross2 } from "react-icons/rx";
import CrudLayout from "../Layouts/CrudLayout";
import { addCategory, setAdd } from "@/redux/slices/categorySlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { categoryInitialValue, categorySchema } from "@/schema/CategorySchema";
import { MdOutlineTitle } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { addNewCategory } from "@/utils/categoryService";
const AddTopics = () => {
  const { add } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    const data = {
      ...values,
      style: {
        theme: backgroundColorGenerator(),
      },
    };
    const category = await addNewCategory(data);
    dispatch(addCategory(category));
    dispatch(setAdd(false));
  };
  return (
    add && (
      <CrudLayout>
        <div
          className="absolute top-0 right-0 bg-primaryColor text-2xl text-cardBg cursor-pointer
         hover:bg-secondaryColor transition-transition"
          onClick={() => dispatch(setAdd(false))}
        >
          <RxCross2 />
        </div>

        <div className="w-full h-full flex flex-col items-center">
          <div className="text-xl">Add Topic</div>
          <Formik
            initialValues={categoryInitialValue}
            validationSchema={categorySchema}
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

export default AddTopics;
