import * as yup from 'yup';

export const formValidation = yup.object().shape({
    email: yup.string()
        .email("Must be a valid email format")
        .required("Email is required"), 
    password: yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});