import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext } from "react-hook-form";

export type InputProps = {
  name: string;
} & DatePickerProps;

const CustomDatePicker: React.FC<InputProps> = ({ name, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          {...props}
          slotProps={{
            textField: {
              slotProps: { inputLabel: { shrink: true } },
              margin: "dense",
              fullWidth: true,
              error: !!error,
              helperText: error?.message
            }
          }}
        />
      )}
    />
  );
};
export default CustomDatePicker;
