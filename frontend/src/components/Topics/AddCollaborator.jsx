import React from "react";
import CrudLayout from "../Layouts/CrudLayout";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { isDarkColor } from "@/data/randomColor";
import { getAcronym } from "@/data/getAcronym";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { teamInitialValue, teamSchema } from "@/schema/CategorySchema";
import { addCollaborators } from "@/utils/categoryService";
import { useDispatch } from "react-redux";
import { updateCategorySlice } from "@/redux/slices/categorySlice";
import toast from "react-hot-toast";
const AddCollaborator = ({ setEditMember, category }) => {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    const data = {
      categoryId: category._id,
      ...values,
    };
    const member = await addCollaborators(data);
    dispatch(updateCategorySlice(member.category));
    toast.success("Member added Successfully");
    setEditMember(false);
  };
  return (
    <CrudLayout onClick={() => setEditMember(false)}>
      <div className="flex flex-col w-full justify-center items-center gap-3">
        <div
          className={`flex text-base font-bold justify-center items-center h-[3rem] w-[3rem] rounded-full border border-border ${
            isDarkColor(category.style.theme) === true
              ? "text-white"
              : "text-black"
          }`}
          style={{ backgroundColor: category.style.theme }}
        >
          {getAcronym(category.title)}
        </div>
        <h1 className="text-lg font-semibold text-textColor">
          Add Collaborators
        </h1>
        <Formik
          initialValues={teamInitialValue}
          validationSchema={teamSchema}
          onSubmit={handleSubmit}
          className="h-full w-full text-sm"
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-4 w-full h-full text-cardBg text-sm">
              <div className="sm:w-full  w-[90%] m-auto flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className={`font-semibold capitalize text-sm ${
                    touched["email"] && errors["email"]
                      ? "text-red-600"
                      : "text-textColor"
                  }`}
                >
                  Email*
                </label>
                <div className="bg-background p-2 rounded-md w-full relative text-textColor">
                  <MdOutlineMarkEmailUnread className="absolute top-1/2 -translate-y-1/2 right-2 text-primaryColor text-lg" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="enter email of memebr..."
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
                className="p-2 bg-primaryColor text-cardBg font-semibold text-base rounded-md
                  hover:bg-secondaryColor transition-transition w-[90%] m-auto sm:w-full"
              >
                Add Collaborator
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </CrudLayout>
  );
};

export default AddCollaborator;
