import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    username:yup.string().required("username is required"),
    email:yup.string().email().required('email is required'),
    password:yup.string().min(8).max(16).required('password is required')
})
export const loginInitialValues = {
    username:"",
    email:"",
    password:""
}


export const signupSchema = yup.object().shape({
    fullName:yup.string().required("fullname is required"),
    username:yup.string().required("username is required"),
    email:yup.string().email().required('email is required'),
    password:yup.string().min(8).max(16).required('password is required')
})
export const signupInitialValues = {
    fullName:"",
    username:"",
    email:"",
    password:""
}