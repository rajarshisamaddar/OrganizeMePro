import * as yup from 'yup';

export const categoryInitialValue = {
    title:"",
    description:"",
}

export const teamInitialValue = {
    email:""
}

export const categorySchema = yup.object().shape({
    title:yup.string().required('title is required'),
    description:yup.string().required('description is required'),
});

export const teamSchema = yup.object().shape({
    email:yup.string().email().required('email is required')
})

