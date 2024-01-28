import * as yup from 'yup';

export const userSchema = yup.object().shape({
    fullName:yup.string().required("full name required"),
    username:yup.string().required('username required'),
    email:yup.string().email().required('email.required'),
    
})