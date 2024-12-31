import React from "react";
import { CustomForm, CustomInputFormProps } from "../components/form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase/auth";

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

interface FormikValProps {
  displayName: string;
  email: string;
  password: string;
}

// functions

const handleLogin = async (vals: FormikValProps) => {
  const { email, password } = vals;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    console.log("User created:", userCredential.user);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const Register: React.FC = () => {
  return (
    <CustomForm
      inputs={inputs}
      onSubmit={(vals: FormikValProps) => handleLogin(vals)}
      submitLable={"Sign Up"}
    ></CustomForm>
  );
};

export default Register;
