import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { CustomForm, CustomInputFormProps } from "../../components/form";
import { firebaseAuth } from "../../utils/firebase/auth";

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

interface FormilValProp {
  email: string;
  password: string;
}

// functions

const handleLogin = async (vals: FormilValProp) => {
  const { email, password } = vals;

  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    console.log("User Logged:", userCredential.user);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const Login: React.FC = () => {
  return (
    <CustomForm
      inputs={inputs}
      onSubmit={(vals: FormilValProp) => handleLogin(vals)}
      submitLable={"Log In"}
    ></CustomForm>
  );
};

export default Login;
