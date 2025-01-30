import { formValidation } from "../utils/loginValidation.js";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const fetchData = async (values, { setSubmitting, setStatus }) => {
        try {
            const response = await fetch('http://localhost:3000/users');
            const users = await response.json();
            const user = users.find(user => user.email === values.email && user.password === values.password);
            if (user) {
                localStorage.setItem('userId', user.id);
                setStatus(`Login successful!, $ {user.username}`);
                navigate('/dashboard', { state: {username: user.username} });
            } else {
                setStatus("Login failed. Please try again.");
            }
        } catch (error) {
            setStatus("Error logging in: " + error.message);
        }
        setSubmitting(false);
    };

    return (
        <>
            <div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={formValidation}
                    onSubmit={fetchData}
                >
                    {({ isSubmitting, status }) => (
                        <Form>
                            <div className="loginForm">
                                <div className="title">
                                    <h1>Welcome Back!</h1>
                                </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <Field type="email" id="email" name="email" />
                                <ErrorMessage name="email" component={"div"} style={{ color: 'red' }} />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <Field type="password" id="password" name="password" />
                                <ErrorMessage name="password" component={"div"} style={{ color: 'red' }} />
                            </div>
                            <button type="submit" disabled={isSubmitting}>Login</button>
                            {status && <p>{status}</p>}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}

export default Login;