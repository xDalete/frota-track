"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, MenuItem } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Manutencao, StatusManutencao, TipoManutencao, TipoVeiculo } from "@/types/ObjectTypes";
import { ManutencaoFormData, manutencaoSchema } from "@/schemas/manutencaoSchema";
import { CustomFormInput } from "../common/CustomInput";
import CustomSelect from "../common/CustomSelect";

type ManutencaoFormProps = {
  manutencao?: Manutencao;
  afterSubmit: (manutencao: Manutencao) => void;
};

const ManutencaoForm: React.FC<ManutencaoFormProps> = ({ manutencao, afterSubmit }) => {
  const hoje = new Date();
  const dataHoje = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
  const formulario = useForm<ManutencaoFormData>({
    mode: "onChange",
    resolver: zodResolver(manutencaoSchema),
    defaultValues: {
      placa: manutencao?.placa ?? "",
      tipo: manutencao?.tipo ?? TipoVeiculo.CARRO,
      tipoManutencao: manutencao?.tipoManutencao ?? TipoManutencao.PREVENTIVA,
      descricao: manutencao?.descricao ?? "",
      dataInicio: manutencao?.dataInicio ?? dataHoje,
      dataFim: manutencao?.dataFim ?? "",
      status: manutencao?.status ?? StatusManutencao.AGENDADA
    }
  });

  const handleFormSubmit = (data: ManutencaoFormData) => {
    afterSubmit({ ...data, id: manutencao?.id ?? 0 });
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

        <CustomSelect name="tipoManutencao" label="Tipo de manutenção">
          {Object.values(TipoManutencao).map(tipo => (
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
        <CustomFormInput name="dataFim" label="Data final (opcional)" type="date" />

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
            {manutencao ? "Salvar alterações" : "Registrar manutenção"}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default ManutencaoForm;
