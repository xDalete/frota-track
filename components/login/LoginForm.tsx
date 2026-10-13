"use client";
import { Box, Button, FormControlLabel, Switch } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormInput } from "../common/CustomInput";
import { LoginFormData, loginSchema } from "@/schemas/loginSchema";

type LoginFormProps = {
  afterSubmit: (data: LoginFormData) => void;
  loading?: boolean;
};

const LoginForm: React.FC<LoginFormProps> = ({ afterSubmit, loading = false }) => {
  const formulario = useForm<LoginFormData>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
      lembrarme: true
    }
  });

  const { handleSubmit } = formulario;

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      afterSubmit(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <FormProvider {...formulario}>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <CustomFormInput name="email" label="Email" placeholder="seu@email.com" />

        <CustomFormInput name="senha" label="Senha" placeholder="Sua senha" type="password" />

        <FormControlLabel
          control={
            <Switch
              name="lembrarme"
              defaultChecked={true}
              onChange={e => {
                formulario.setValue("lembrarme", e.target.checked);
              }}
            />
          }
          label="Lembrar-me"
        />

        <Box sx={{ textAlign: "center" }}>
          <Button type="submit" variant="contained" color="primary" fullWidth loading={loading} loadingPosition="end">
            Login
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default LoginForm;
