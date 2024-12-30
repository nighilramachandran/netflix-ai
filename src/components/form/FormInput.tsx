import React, { useMemo } from "react";
import { FormikProps } from "formik";
//mui
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CustomInputFormProps } from ".";

//utility
import { Stack, styled, SvgIcon, useTheme } from "@mui/material";

//material
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

type props = CustomInputFormProps & { formik: FormikProps<any> };

export const FormInput: React.FC<props> = ({
  name,
  component,
  formName,
  label,
  type = "text",
  options,
  formik,
  inputButton,
  getOptionLabel,
  ...restInputProps
}) => {
  // const { palette } = useTheme();
  //functions
  const [initType] = React.useState<string>(type);
  const [currentType, setCurrentType] = React.useState<string>(
    type === "integer" ? "number" : type
  );
  const isFormFieldValid = (name: string) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name: string) =>
    isFormFieldValid(name) ? formik.errors[name] : "";
  const notValidNum = ["E", "e", "-", "=", "+"];

  //constants
  const handleShowPassword = () => {
    setCurrentType(currentType === "text" ? "password" : "text");
  };

  const handleLocalOnChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const value = e.target.value;

    if (
      notValidNum.includes(value) &&
      (initType === "number" || initType === "integer")
    ) {
      return;
    }

    formik.handleChange(e);
  };

  const {
    palette: { mode },
  } = useTheme();

  const textFieldInputStyle: React.CSSProperties = useMemo(
    () => ({
      padding: type === "textarea" ? "0px" : "0 9px",
      borderRadius: "10px",
      fontSize: "11px",
      height: "100%",
    }),
    [type]
  );

  //label component
  const getLabel = () => {
    if (initType === "password") {
      return (
        <Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <StyledLabel>{label}</StyledLabel>
            <SvgIcon
              aria-label="toggle-password-visibility"
              onClick={handleShowPassword}
              sx={{ color: "text.primary", fontSize: 14, cursor: "pointer" }}
            >
              {currentType === "password" ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <RemoveRedEyeOutlinedIcon />
              )}
            </SvgIcon>
          </Stack>
        </Stack>
      );
    } else {
      return <StyledLabel>{label}</StyledLabel>;
    }
  };

  //error message component
  const getError = (name: string) => (
    <Typography variant="body1" color="text.danger" textAlign={"start"}>
      {getFormErrorMessage(name) as string}
    </Typography>
  );

  //Input component
  const getCheckBox = () => (
    <FormControlLabel
      control={<Checkbox />}
      key={name}
      name={name}
      label={label}
      value={formik.values[name]}
      onChange={formik.handleChange}
    />
  );

  const getTextField = () => (
    <Stack>
      <TextField
        key={name}
        name={name}
        type={currentType}
        // onKeyDown={handleLocalOnkeyDown}
        onPaste={initType === "number" ? (e) => e.preventDefault() : undefined}
        onChange={handleLocalOnChange}
        {...restInputProps}
        // variant="outlined"
        className="outlined-gradient"
        multiline={type === "textarea"}
        value={formik.values[name]}
        error={!!getFormErrorMessage(name)}
        sx={{
          width: "100%",
          bgcolor: "background.popup",
          outline: "none",
          [`.Mui-focused`]: { border: "none" },
        }}
        InputProps={{
          ...(inputButton && {
            // Input button on the end of the input
            endAdornment: (
              <Button
                sx={{
                  position: "absolute",
                  right: "0",
                  height: 41,
                  width: 135,
                }}
                {...inputButton(formik)}
              >
                {inputButton(formik).content}
              </Button>
            ),
            sx: {
              bgcolor: "background.default",
              ".MuiInputBase-input": {
                borderTopRightRadius: "0px !important",
                borderBottomRightRadius: "0px !important",
              },
            },
          }),

          ...(restInputProps.InputProps && { ...restInputProps.InputProps }),
          inputProps: {
            style: textFieldInputStyle,
            min: 0,
            step: "any",
            //To prevent numbers changed during wheel event
            onWheel: (e) => e.currentTarget.blur(),
            ...restInputProps.InputProps?.inputProps,
          },
        }}
      />
    </Stack>
  );

  const getSelectInput = () => {
    return (
      <Autocomplete
        fullWidth
        size="small"
        value={formik.values[name]}
        onChange={(_, value) => formik.setFieldValue(name, value, true)}
        options={options ?? []}
        // getOptionLabel={(option) => option}
        getOptionLabel={getOptionLabel}
        renderInput={(input) => (
          <TextField
            variant="outlined"
            placeholder={restInputProps.placeholder}
            style={{
              boxShadow: `${
                mode === "dark" ? "rgb(16 16 16)" : "rgb(255 255 255)"
              } 0px 0px 0px 50px inset`,
            }}
            error={!!getFormErrorMessage(name)}
            {...(input as TextFieldProps)}
          />
        )}
      />
    );
  };

  return !component ? (
    <>
      {/* label */}
      {type !== "checkbox" && label && getLabel()}

      {/* input */}
      {type === "checkbox" && getCheckBox()}
      {type === "select" && getSelectInput()}
      {!["checkbox", "select"].includes(type) && getTextField()}

      {/* error */}
      {getError(name)}
    </>
  ) : (
    <>
      {label && <StyledLabel>{label}</StyledLabel>}
      <div>{component(formik)}</div>
      {getError(name)}
    </>
  );
};

const StyledLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 14,
  textAlign: "start",
  marginBottom: 4,
  fontWeight: 800,
}));
