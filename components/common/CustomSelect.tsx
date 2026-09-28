import { FormControl, FormHelperText, InputLabel, Select, SelectProps } from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";

export type CustomSelectProps = {
  name: string;
  onChange?: () => void;
} & SelectProps;

const CustomSelect: React.FC<CustomSelectProps> = ({ name, onChange, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error} margin="dense">
          <InputLabel shrink>{props.label}</InputLabel>
          <Select
            {...props}
            {...field}
            onChange={e => {
              field.onChange(e);
              onChange?.();
            }}
          />
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
export default CustomSelect;
