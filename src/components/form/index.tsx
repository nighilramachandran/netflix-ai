import React, { ReactNode, useEffect, useMemo } from "react";
import { FormikProps, useFormik } from "formik";

import Grid2, { Grid2Props } from "@mui/material/Grid2";
import { FormInput } from "./FormInput";
import LoadingButton from "@mui/lab/LoadingButton";
import { CustomInputProps, RequestStatus } from "../../interfaces";

interface InputValidation {
  required?: boolean;
  rule?: RegExp;
  rule_message?: string;
  required_message?: string;
  same?: string;
  difference?: string;
}

type ComponentReturnType = ReactNode | ReactNode[];

export type CustomInputFormProps = CustomInputProps & {
  validate?: InputValidation;
  component?: (formik: FormikProps<any>) => ComponentReturnType;
  colProps?: Grid2Props;
  showPrecision?: number;
  hide?: boolean;
};

interface props {
  inputs: CustomInputFormProps[];
  onSubmit: (data: any, formik: FormikProps<any>) => void;
  status?: RequestStatus;
  submitLable?: string;
  resetFrom?: boolean;
  fromJustify?: "center" | "start" | "end" | "between";
  fromAlignItems?: "center" | "start" | "end" | "between";
  actionCol?: Grid2Props;
  setFormik?: (formik: FormikProps<any>) => void;
}

export const CustomForm: React.FC<props> = (props) => {
  const {
    inputs = [],
    onSubmit,
    status,
    submitLable = "submit",
    resetFrom,
    fromJustify = "start",
    actionCol = { size: { xs: 12 } },
    fromAlignItems = "center",
    setFormik,
    ...restProps
  } = props;

  const { formValidate, initialValues } = useMemo(() => {
    // Define formik values
    const initValues: any = {};
    //for each input in form set : initial Value
    inputs.forEach((input) => {
      if (!input.ignore) {
        initValues[input.name] = "";
      }
    });

    //for each input in form set : error value
    const validate: (data: any) => any = (data: any) => {
      const errors: any = {};
      inputs.forEach((input) => {
        const fieldName =
          input.label && typeof input.label
            ? input.label
            : input.placeholder || input.name;

        if (input.name) {
          if (input.validate?.required) {
            if (data[input.name] === "" || data[input.name] === false) {
              errors[input.name] =
                input.validate.required_message ?? `${fieldName} is required`;
            } else if (
              input.validate.rule &&
              !input?.validate?.rule?.test(data[input.name])
            ) {
              errors[input.name] =
                input.validate.rule_message ?? `${"invalid"} ${fieldName}`;
            }
          }
          if (input.validate?.same) {
            if (data[input.name] !== data[input.validate.same]) {
              errors[input.name] = `${fieldName} ${"does not match"}`;
            }
          }
          if (input.validate?.difference) {
            if (data[input.name] === data[input.validate.difference]) {
              const diffrenceIndex = inputs.findIndex(
                (item) => item.name === input.validate?.difference
              );
              if (diffrenceIndex !== -1)
                errors[input.name] = `${fieldName} ${"shouldnt_match_the"} ${
                  inputs[diffrenceIndex].label
                }.`;
            }
          }
        }
      });
      return errors;
    };
    return {
      initialValues: initValues,
      formValidate: validate,
    };
  }, [inputs]);

  const formik = useFormik({
    initialValues: initialValues,
    validateOnMount: true,
    validateOnChange: true,
    validate: formValidate,
    onSubmit: async (data: any) => {
      onSubmit(data, formik);
      if (resetFrom) {
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (formik && setFormik) {
      setFormik(formik);
    }
  }, [formik.values, formik, setFormik]);

  return (
    <form
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      {...restProps}
      style={{ position: "relative" }}
    >
      <Grid2
        container
        spacing={2}
        justifyContent={fromJustify}
        alignItems={fromAlignItems}
        sx={{
          justifyContent: { xs: "space-between", md: "end" },
        }}
      >
        {inputs.map(
          ({ colProps, name, hide, ...props }) =>
            !hide && (
              <Grid2 component={"div"} item={true} {...colProps} key={name}>
                <FormInput key={name} name={name} formik={formik} {...props} />
              </Grid2>
            )
        )}

        {/*  submit */}
        <Grid2 component="div" item {...actionCol}>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={status === "loading"}
            sx={{ width: "100%" }}
          >
            {submitLable}
          </LoadingButton>
        </Grid2>
      </Grid2>
    </form>
  );
};
