import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export const InputField = ({ name, control, label, ...props }: InputFieldProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  });
  return (
    <div>
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        margin="normal"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        helperText={error?.message}
        error={invalid}
        inputProps={props}
      />
    </div>
  );
};
