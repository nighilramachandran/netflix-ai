import React from "react";
import { CustomForm, CustomInputFormProps } from "../components/form";
import { FormikProps } from "formik";

// inputs
const inputs: CustomInputFormProps[] = [
  {
    type: "text",
    name: "email",
    label: "Email",
    placeholder: "Email",
    validate: { required: true },
    colProps: { size: { xs: 12 } },
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Password",
    validate: { required: true },
    colProps: { size: { xs: 12 } },
  },
];

// functions

const handleLogin = (vals: FormikProps<any>) => {};

const Login: React.FC = () => {
  return (
    <CustomForm
      inputs={inputs}
      resetFrom
      onSubmit={(vals) => handleLogin(vals)}
      submitLable={"Sign Up"}
    ></CustomForm>
  );
};

export default Login;
