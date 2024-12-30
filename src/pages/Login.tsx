import { Box, Paper } from "@mui/material";
import React from "react";
import { CustomForm, CustomInputFormProps } from "../components/form";

//inputs
const inputs: CustomInputFormProps[] = [
  {
    type: "text",
    name: "username",
    label: "User_Name",
    placeholder: "admin",
    validate: { required: true },
    autoComplete: "false",
    colProps: { xs: 12 },
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "admin",
    validate: { required: true },
    colProps: { xs: 12 },
  },
];

const Login: React.FC = () => {
  return (
    <Box>
      <Paper sx={{ height: 200 }}>
        <CustomForm
          formName="form"
          inputs={inputs}
          resetFrom
          onSubmit={() => null}
          submitLable={"Login"}
        ></CustomForm>
      </Paper>
    </Box>
  );
};

export default Login;
