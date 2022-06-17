import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import { Control, useController } from "react-hook-form";

export interface SelectOption {
  label?: string;
  value: number | string;
}
interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
}
export const SelectField = ({
  name,
  control,
  label,
  disabled,
  options,
  ...props
}: SelectFieldProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl
      fullWidth
      variant="outlined"
      margin="normal"
      size="small"
      disabled={disabled}
      error={invalid}
    >
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={onChange} onBlur={onBlur}>
        {options.map(option => (
            <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};
