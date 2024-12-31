import React from "react";
import { CustomForm, CustomInputFormProps } from "../components/form";

//inputs
const inputs: CustomInputFormProps[] = [
  {
    type: "text",
    name: "username",
    label: "Full Name",
    placeholder: "Full Name",
    validate: { required: true },
    colProps: { size: { xs: 12 } },
  },
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

const Register: React.FC = () => {
  return (
    <CustomForm
      inputs={inputs}
      resetFrom
      onSubmit={() => null}
      submitLable={"Sign Up"}
    ></CustomForm>
  );
};

export default Register;
