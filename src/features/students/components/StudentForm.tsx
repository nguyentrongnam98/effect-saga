import { Box, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField, SelectField } from "../../../components/formFields";
import { RadioGroupField } from "../../../components/formFields/RadioGroupField";
import { student } from "../../../models";
import { useSelector } from "react-redux";
import { selectcityOption } from "../../city/citySlice";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from "@mui/material/Alert";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required(),
    age: yup
      .number()
      .positive("Please enter a positive number.")
      .integer("Please enter an interger.")
      .max(18, "Please type < 18")
      .required("Please enter age.")
      .typeError("Please enter a valid number."),
    mark: yup
      .number()
      .positive("Please enter a positive number.")
      .max(10, "Max is 10")
      .required("Please enter mark.")
      .typeError("Please enter a valid number."),
    gender: yup
      .string()
      .oneOf(["male", "female"], "Please select male or female")
      .required("Please select gender."),
    city: yup.string().required("Please select city."),
  })
  .required();

interface Props {
  initialValue?: student;
  onSubmit?: (formValue: student) => void;
}

export default function StudentForm({ initialValue, onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<student>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState("");
  const cityOptions = useSelector(selectcityOption);
  const handleFormSubmit = async (formValue: student) => {
    try {
      setError("");
      await onSubmit?.(formValue);
    } catch (error: any) {
      console.log("error", error);
      setError(error.message);
    }
  };
  return (
    <Box width={600}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField control={control} label={"Full name"} name="name" />
        <InputField
          control={control}
          label={"Age"}
          name="age"
          type={"number"}
        />
        <InputField
          control={control}
          label={"Mark"}
          name="mark"
          type={"number"}
        />
        <RadioGroupField
          control={control}
          name="gender"
          label="Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField
            control={control}
            name="city"
            label="City"
            options={cityOptions}
          />
        )}
        {error && <Alert severity="error">{error}</Alert>}
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} color="secondary" />}
            SAVE
          </Button>
        </Box>
      </form>
    </Box>
  );
}
