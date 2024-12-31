import React from "react";
import { CustomForm, CustomInputFormProps } from "../components/form";

//inputs
const inputs: CustomInputFormProps[] = [
  {
    type: "text",
    name: "username",
    label: "User Name",
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

const Login: React.FC = () => {
  return (
    <CustomForm
      inputs={inputs}
      resetFrom
      onSubmit={() => null}
      submitLable={"Login"}
    ></CustomForm>
  );
};

export default Login;
