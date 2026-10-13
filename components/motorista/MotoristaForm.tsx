"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, MenuItem } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { CategoriaHabilitacao, Motorista, StatusMotorista } from "@/types/ObjectTypes";
import { MotoristaFormData, motoristaSchema } from "@/schemas/motoristaSchema";
import { CustomFormInput } from "../common/CustomInput";
import CustomSelect from "../common/CustomSelect";

type MotoristaFormProps = {
  motorista: Motorista;
  afterSubmit: (motorista: Motorista) => void;
  loading?: boolean;
};

const MotoristaForm: React.FC<MotoristaFormProps> = ({ motorista, afterSubmit, loading = false }) => {
  // TODO: Definir como o status do motorista será determinado.
  const formulario = useForm<MotoristaFormData>({
    mode: "onChange",
    resolver: zodResolver(motoristaSchema),
    defaultValues: {
      nome: motorista.nome,
      documento: motorista.documento,
      telefone: motorista.telefone,
      email: motorista.email,
      categoria: motorista.categoria
    }
  });

  const handleFormSubmit = (data: MotoristaFormData) => {
    afterSubmit({
      ...data,
      id: motorista.id,
      status: motorista.status ?? StatusMotorista.ATIVO
    });
  };

  return (
    <FormProvider {...formulario}>
      <Box
        component="form"
        onSubmit={formulario.handleSubmit(handleFormSubmit)}
        sx={{ display: "grid", gap: 1, minWidth: { xs: 260, sm: 400 } }}
      >
        <CustomFormInput name="nome" label="Nome" placeholder="Nome do motorista" />
        <CustomFormInput name="documento" label="Documento" placeholder="Documento do motorista" />
        <CustomFormInput name="telefone" label="Telefone" placeholder="Telefone do motorista" />
        <CustomFormInput name="email" label="E-mail" placeholder="E-mail do motorista" type="email" />

        <CustomSelect name="categoria" label="Categoria da CNH">
          {Object.values(CategoriaHabilitacao).map(categoria => (
            <MenuItem key={categoria} value={categoria}>
              {categoria}
            </MenuItem>
          ))}
        </CustomSelect>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            loading={loading}
            loadingPosition="end"
          >
            Salvar alterações
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default MotoristaForm;
