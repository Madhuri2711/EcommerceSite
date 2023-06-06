import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";

import "./TextInputMui.styles.css";

const TextInput = (props) => {
  const {
    id,
    label,
    name,
    meta,
    type,
    autoComplete,
    variant,
    onChange,
    error,
    InputProps,
    onKeyDown,
    margin,
    input,
    classes,
    placeholder,
    disabled,
    autoFocus,
    color,
    multiline,
    defaultValue,
    SelectProps,
    minRows,
    InputLabelProps,
    labelId,
    format,
    select,
    ...other
  } = props;
  return (
    <>
      <TextField
        {...input}
        id={id}
        label={label}
        name={name}
        type={type}
        autoComplete={autoComplete}
        variant={variant || "outlined"} // default 'standard'
        onChange={onChange}
        value={props?.value || ""}
        InputProps={InputProps}
        onKeyDown={onKeyDown}
        error={error} // default false
        margin={margin}
        classes={classes}
        disabled={disabled} // default false
        placeholder={placeholder}
        autoFocus={autoFocus}
        color={color} // default primary
        fullWidth
        multiline={multiline}
        defaultValue={defaultValue}
        SelectProps={SelectProps}
        minRows={minRows}
        InputLabelProps={InputLabelProps}
        format={format}
        select={select}
        {...other}
      />
      {meta?.error && meta?.touched && (
        <span style={{ color: "red" }}>{meta.error}</span>
      )}
    </>
  );
};

export default TextInput;
