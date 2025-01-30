import { registerValidation } from "../utils/formValidation.js";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';

function Home () {

const [users, setUser] = useState([])

const fetchUsers = async () => {
  const response = await fetch('http://localhost:3000/users');
  const data = await response.json();
  setUser(data);
};

const addUser = async (username, email, password) => {
  try {
  const dataUsers = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify({
      username,
      email,
      password
    }),
  });
  if (dataUsers.ok) {
    alert('User added successfully');
  } else {
    alert('Failed to add user');
  }
} catch (error) {
  console.error("This is error", error);
}
  const response = await dataUsers.json();
  return response    
}

useEffect(() => {
  fetchUsers();
}, []);

return (
  <>

    <Formik
      initialValues={{ username: '', email: '', password: ''}}
      validationSchema={registerValidation}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);
        addUser(values.username, values.email, values.password)
          .then(() => {
            alert ('User added successfully');
            resetForm();
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting }) => (
      <Form>
        <div className="loginForm">
        <div className="title">
          <h1>Welcome!</h1>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <Field type="username" id="username" name="username" />
          <ErrorMessage name="username" component={"div"} style={{ color: 'red' }}/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" component={"div"} style={{ color: 'red' }}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" component={"div"} style={{ color: 'red' }}/>
        </div>
        <button type="submit" disabled={isSubmitting} >Submit</button>
        </div>
      </Form>
      )}
    </Formik>
  </>
)

}

export default Home;