import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";
export interface RadioOption {
  label?: string;
  value: number | string;
}
interface RadioGroupFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: RadioOption[];
}

export const RadioGroupField = ({
  name,
  control,
  label,
  options,
  disabled,
  ...props
}: RadioGroupFieldProps) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl error={invalid} disabled={disabled}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <FormControlLabel
            value={option.value}
            control={<Radio />}
            label={option.label}
            key={option.value}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};
