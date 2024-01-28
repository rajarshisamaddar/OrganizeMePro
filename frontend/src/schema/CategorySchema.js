import * as yup from 'yup';

export const categoryInitialValue = {
    title:"",
    description:"",
}


export const categorySchema = yup.object().shape({
    title:yup.string().required('title is required'),
    description:yup.string().required('description is required'),
})