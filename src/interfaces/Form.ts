import { ButtonProps, SelectProps, TextFieldProps } from "@mui/material";
import { FormikProps } from "formik";
import { ReactNode } from "react";

export type InputType =
  | "text"
  | "password"
  | "email"
  | "checkbox"
  | "number"
  | "integer"
  | "file"
  | "textarea"
  | "select";

interface CustomInputAttributes {
  type: InputType;
  name: string;
  label?: string | React.ReactElement;
  icon?: string;
  auth?: boolean;
  ignore?: boolean;
  errorMessage?: any;
  accessor?: string | ((row: any) => any);
  formName?: string;
  options?: (string | number)[] | any[];
  optionsRender?: string[];
  getOptionLabel?: (option: any) => any;

  inputButton?: (
    formik: FormikProps<any>
  ) => { content: ReactNode } & ButtonProps;
}

export type CustomInputProps = TextFieldProps &
  SelectProps &
  CustomInputAttributes &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
