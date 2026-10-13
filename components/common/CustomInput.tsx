import { RemoveRedEyeOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export type InputProps = {
  password?: boolean;
  name: string;
} & TextFieldProps;

const CustomInput: React.FC<InputProps> = ({ password, slotProps, ...props }) => {
  const [showValue, setShowValue] = useState(!password);

  return (
    <TextField
      fullWidth
      type={password && showValue ? "text" : password ? "password" : undefined}
      {...props}
      slotProps={{
        inputLabel: { shrink: true },
        ...(password && {
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowValue(!showValue)} edge="end" size="small">
                  {showValue ? <RemoveRedEyeOutlined /> : <VisibilityOffOutlined />}
                </IconButton>
              </InputAdornment>
            )
          }
        }),
        ...slotProps
      }}
    />
  );
};
export default CustomInput;

const CustomFormInput: React.FC<InputProps & { formatInput?: (value: string) => string }> = ({
  name,
  formatInput,
  type,
  ...props
}) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const { onChange, onBlur, ...field } = register(name, {
    valueAsNumber: type === "number"
  });

  return (
    <CustomInput
      {...field}
      margin="dense"
      onChange={e => {
        if (formatInput) {
          e.target.value = formatInput(e.target.value);
        }
        onChange(e);
      }}
      onBlur={e => {
        e.target.value = e.target.value.trim();
        onBlur(e);
      }}
      error={!!errors[name]}
      helperText={errors[name]?.message?.toString()}
      type={type}
      {...props}
    />
  );
};
export { CustomFormInput };
