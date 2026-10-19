"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, MenuItem } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Manutencao, StatusManutencao, TipoVeiculo } from "@/types/ObjectTypes";
import { ManutencaoFormData, manutencaoSchema } from "@/schemas/manutencaoSchema";
import { CustomFormInput } from "../common/CustomInput";
import CustomSelect from "../common/CustomSelect";

type ManutencaoFormProps = {
  manutencao: Manutencao;
  afterSubmit: (manutencao: Manutencao) => void;
};

const ManutencaoForm: React.FC<ManutencaoFormProps> = ({ manutencao, afterSubmit }) => {
  const formulario = useForm<ManutencaoFormData>({
    mode: "onChange",
    resolver: zodResolver(manutencaoSchema),
    defaultValues: {
      placa: manutencao.placa,
      tipo: manutencao.tipo,
      descricao: manutencao.descricao,
      dataInicio: manutencao.dataInicio,
      dataFim: manutencao.dataFim,
      status: manutencao.status
    }
  });

  const handleFormSubmit = (data: ManutencaoFormData) => {
    afterSubmit({ ...data, id: manutencao.id });
  };

  return (
    <FormProvider {...formulario}>
      <Box
        component="form"
        onSubmit={formulario.handleSubmit(handleFormSubmit)}
        sx={{ display: "grid", gap: 1, minWidth: { xs: 260, sm: 400 } }}
      >
        <CustomFormInput name="placa" label="Placa" placeholder="Placa do veículo" />

        <CustomSelect name="tipo" label="Tipo de veículo">
          {Object.values(TipoVeiculo).map(tipo => (
            <MenuItem key={tipo} value={tipo}>
              {tipo}
            </MenuItem>
          ))}
        </CustomSelect>

        <CustomFormInput
          name="descricao"
          label="Descrição"
          placeholder="Descrição da manutenção"
          multiline
          minRows={2}
        />
        <CustomFormInput name="dataInicio" label="Data inicial" type="date" />
        <CustomFormInput name="dataFim" label="Data final" type="date" />

        <CustomSelect name="status" label="Status">
          {Object.values(StatusManutencao).map(status => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </CustomSelect>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            loading={formulario.formState.isSubmitting}
          >
            Salvar alterações
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default ManutencaoForm;
