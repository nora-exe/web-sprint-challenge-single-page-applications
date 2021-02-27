import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup.string()
        .trim()
        .required('We need your name! Please fill out')
        .min(2, 'Name must be at least 2 characters here'),
    sizes: yup.string()
        .required('How much pizza do you want?'),
    sauce: yup.string()
        .required(''),
})

export default formSchema