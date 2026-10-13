"use client";
import { Box, Button, MenuItem } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormInput } from "../common/CustomInput";
import CustomSelect from "../common/CustomSelect";
import { toast } from "react-hot-toast";
import { CategoriaHabilitacao, StatusVeiculo, TipoVeiculo, Veiculo } from "@/types/ObjectTypes";
import { VeiculoFormData, veiculoSchema } from "@/schemas/veiculoSchema";
import { CreateVeiculo, UpdateVeiculo } from "@/app/api/veiculo/actions";

type VeiculoFormProps = {
  veiculo?: Veiculo | null;
  afterSubmit: (data: Veiculo) => void;
  loading?: boolean;
};

const VeiculoForm: React.FC<VeiculoFormProps> = ({ veiculo = null, afterSubmit, loading = false }) => {
  const isEditing = !!veiculo;

  const formulario = useForm<VeiculoFormData>({
    mode: "onChange",
    resolver: zodResolver(veiculoSchema),
    defaultValues: isEditing
      ? {
          placa: veiculo.placa,
          modelo: veiculo.modelo,
          marca: veiculo.marca,
          ano: veiculo.ano,
          capacidade: veiculo.capacidade,
          tipo: veiculo.tipo,
          habilitacaoNecessaria: veiculo.habilitacaoNecessaria,
          status: veiculo.status
        }
      : {
          placa: "",
          modelo: "",
          marca: "",
          ano: 0,
          capacidade: 0,
          tipo: TipoVeiculo.CARRO,
          habilitacaoNecessaria: CategoriaHabilitacao.A,
          status: StatusVeiculo.DISPONIVEL
        }
  });

  const { handleSubmit } = formulario;

  const handleFormSubmit = async (data: VeiculoFormData) => {
    let veiculoData: Veiculo;
    try {
      if (isEditing) {
        veiculoData = await toast
          .promise(UpdateVeiculo({ ...data, id: veiculo!.id }), {
            loading: "Atualizando veículo...",
            success: "Veículo atualizado com sucesso!",
            error: "Erro ao atualizar veículo."
          })
          .then(res => res.data);
      } else {
        veiculoData = await toast
          .promise(CreateVeiculo(data), {
            loading: "Cadastrando veículo...",
            success: "Veículo cadastrado com sucesso!",
            error: "Erro ao cadastrar veículo."
          })
          .then(res => res.data);
      }
      afterSubmit(veiculoData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <FormProvider {...formulario}>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <CustomFormInput
          name="placa"
          label="Placa"
          placeholder="ABC-1234"
          formatInput={value => value.substring(0, 7)}
        />

        <CustomFormInput name="modelo" label="Modelo" placeholder="Modelo do veículo" />
        <CustomFormInput name="marca" label="Marca" placeholder="Marca do veículo" />
        <CustomFormInput name="ano" label="Ano" placeholder="Ano do veículo" type="number" />
        <CustomFormInput name="capacidade" label="Capacidade" placeholder="Capacidade do veículo" type="number" />

        <CustomSelect name="tipo" label="Tipo de Veículo">
          {Object.values(TipoVeiculo).map(tipo => (
            <MenuItem key={tipo} value={tipo}>
              {tipo}
            </MenuItem>
          ))}
        </CustomSelect>

        <CustomSelect name="habilitacaoNecessaria" label="Habilitação Necessária">
          {Object.values(CategoriaHabilitacao).map(categoria => (
            <MenuItem key={categoria} value={categoria}>
              {categoria}
            </MenuItem>
          ))}
        </CustomSelect>

        <CustomSelect name="status" label="Status do Veículo">
          {Object.values(StatusVeiculo).map(status => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </CustomSelect>

        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            loading={loading}
            loadingPosition="end"
          >
            {isEditing ? "Salvar Alterações" : "Cadastrar Veículo"}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default VeiculoForm;

// import { Veiculo, TipoVeiculo, CategoriaHabilitacao, StatusVeiculo } from "@/types/ObjectTypes";
// import { TextField, FormControl, InputLabel, Select, MenuItem, Button, SelectChangeEvent } from "@mui/material";
// import { SubmitEventHandler, useState } from "react";

// interface VeiculoFormProps {
//   veiculo?: Veiculo;
//   onSubmit: (veiculo: Veiculo) => void;
// }

// const VeiculoForm: React.FC<VeiculoFormProps> = ({ veiculo, onSubmit }) => {
//   const [formData, setFormData] = useState<Veiculo>({
//     id: veiculo?.id || 0,
//     placa: veiculo?.placa || "",
//     modelo: veiculo?.modelo || "",
//     marca: veiculo?.marca || "",
//     ano: veiculo?.ano || 0,
//     capacidade: veiculo?.capacidade || 0,
//     tipo: veiculo?.tipo || TipoVeiculo.CARRO,
//     habilitacaoNecessaria: veiculo?.habilitacaoNecessaria || CategoriaHabilitacao.A,
//     status: veiculo?.status || StatusVeiculo.DISPONIVEL
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === "ano" || name === "capacidade" ? Number(value) : value
//     }));
//   };

//   const handleSubmit: SubmitEventHandler = e => {
//     e.preventDefault();
//     onSubmit(formData);
//     console.log("Form submitted:", formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextField label="Placa" name="placa" value={formData.placa} onChange={handleChange} fullWidth margin="normal" />
//       <TextField
//         label="Modelo"
//         name="modelo"
//         value={formData.modelo}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField label="Marca" name="marca" value={formData.marca} onChange={handleChange} fullWidth margin="normal" />
//       <TextField
//         label="Ano"
//         name="ano"
//         type="number"
//         value={formData.ano}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Capacidade"
//         name="capacidade"
//         type="number"
//         value={formData.capacidade}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Tipo</InputLabel>
//         <Select name="tipo" label="Tipo" value={formData.tipo} onChange={handleChange}>
//           {Object.values(TipoVeiculo).map(tipo => (
//             <MenuItem key={tipo} value={tipo}>
//               {tipo}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Habilitação Necessária</InputLabel>
//         <Select
//           name="habilitacaoNecessaria"
//           label="Habilitação Necessária"
//           value={formData.habilitacaoNecessaria}
//           onChange={handleChange}
//         >
//           {Object.values(CategoriaHabilitacao).map(categoria => (
//             <MenuItem key={categoria} value={categoria}>
//               {categoria}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Status</InputLabel>
//         <Select name="status" label="Status" value={formData.status} onChange={handleChange}>
//           {Object.values(StatusVeiculo).map(status => (
//             <MenuItem key={status} value={status}>
//               {status}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <Button type="submit" variant="contained" color="primary">
//         {veiculo ? "Atualizar" : "Cadastrar"}
//       </Button>
//     </form>
//   );
// };

// export default VeiculoForm;
