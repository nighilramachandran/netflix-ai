import React from "react";
import { CustomForm, CustomInputFormProps } from "../../components/form";
import { useAppDispatch } from "../../redux/hooks";
import { ResigterUserAsyncFunc } from "../../redux/auth";
import { AuthProps } from "../../interfaces";

// inputs
const inputs: CustomInputFormProps[] = [
  {
    type: "text",
    name: "displayName",
    label: "Full Name",
    placeholder: "Full Name",
    validate: { required: true },
    colProps: { size: { xs: 12 } },
  },
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

const Register: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleRegister = async (vals: AuthProps) => {
    dispatch(ResigterUserAsyncFunc(vals));
  };
  return (
    <CustomForm
      inputs={inputs}
      onSubmit={(vals: AuthProps) => handleRegister(vals)}
      submitLable={"Sign Up"}
    ></CustomForm>
  );
};

export default Register;
