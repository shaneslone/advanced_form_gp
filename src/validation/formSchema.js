// Here goes the schema for the form
import * as yup from "yup";

export default yup.object().shape({
  username: yup
    .string()
    .required("username is required")
    .min(3, "username must be 3 character"),
  email: yup
    .string()
    .email("must be a valid email address")
    .required("email is required"),
  role: yup
    .string()
    .oneOf(["tl", "instructor", "alumni", "student"], "role is required"),
  civil: yup.string().oneOf(["married", "single"], "Civil status is required"),
  coding: yup.boolean(),
  reading: yup.boolean(),
  hiking: yup.boolean(),
});

// const formSchema = Yup.object().shape({
//   email: Yup.string()
//     .email("Must be a valid email address.")
//     .required("Must include email address."),
//   password: Yup.string()
//     .required("Password is Required")
//     .min(6, "Passwords must be at least 6 characters long."),
//   terms: Yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
//   // required isn't required for checkboxes.
// });
