import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const LoginCheck = (values) => {
  const theCurrentUsers =
    JSON.parse(localStorage.getItem("userCollection")) || [];
  Object.assign(values, { userFavourites: [] });
  theCurrentUsers.push(values);
  localStorage.setItem("userCollection", JSON.stringify(theCurrentUsers));
};
export const SignUpForm = () => {
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      LoginCheck(values);
    },
  });
  return (
    <form className="QuestionForm" onSubmit={formik.handleSubmit}>
      <input
        className="input-boxes"
        id="firstName"
        type="text"
        {...formik.getFieldProps("firstName")}
        placeholder="Name"
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null}

      <input
        className="input-boxes"
        id="password"
        type="password"
        placeholder="Enter Password"
        {...formik.getFieldProps("password")}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}

      <input
        className="input-boxes"
        id="email"
        type="email"
        placeholder="Enter Email"
        {...formik.getFieldProps("email")}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <button
        className="btn btn-info text-white input-button"
        type="submit"
        onClick={() => {
          Navigate("/");
        }}
      >
        SignUp{" "}
      </button>
      <button
        id="account-button"
        className="btn btn-info text-white input-button"
        type="submit"
        onClick={() => {
          Navigate("/login");
        }}
      >
        Already have an Account{" "}
      </button>
    </form>
  );
};