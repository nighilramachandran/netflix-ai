import React from "react";
import { CustomForm, CustomInputFormProps } from "../../components/form";
import { AuthProps } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AuthUserAsyncFunc } from "../../redux/auth";

// inputs
const inputs: CustomInputFormProps[] = [
  {
    type: "text",
    name: "email",
    label: "Email",
    placeholder: "username@example.com",
    validate: {
      required: true,
      rule: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
      rule_message: "Enter a valid email",
    },
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
  const { status } = useAppSelector((state) => state.Auth);

  const dispatch = useAppDispatch();

  const handleLogin = async (vals: AuthProps) => {
    dispatch(AuthUserAsyncFunc(vals, "login"));
  };

  console.log("status", status);

  return (
    <CustomForm
      inputs={inputs}
      onSubmit={(vals: AuthProps) => handleLogin(vals)}
      status={status}
      submitLable={"Log In"}
    ></CustomForm>
  );
};

export default Login;
