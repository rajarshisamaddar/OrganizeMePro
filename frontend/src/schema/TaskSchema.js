import * as yup from 'yup';

export const taskInitialValues = {
    title:"",
    description:"",
    dueDate:new Date()
}

export const taskSchema = yup.object().shape({
    title:yup.string().required('title is required'),
    description:yup.string().required('description is required'),
    dueDate:yup.date().required('due date is required')
})