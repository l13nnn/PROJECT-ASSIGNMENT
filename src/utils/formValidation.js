import * as yup from 'yup';

export const registerValidation = yup.object().shape({
    username: yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
    email: yup.string()
        .email("Must be a valid email format")
        .required("Email is required"), 
    password: yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});