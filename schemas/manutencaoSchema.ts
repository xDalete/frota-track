import { StatusManutencao, TipoVeiculo } from "@/types/ObjectTypes";
import { z } from "zod";

export const manutencaoSchema = z
  .object({
    placa: z.string().trim().length(7, "Placa deve ter 7 caracteres"),
    tipo: z.enum(TipoVeiculo),
    descricao: z.string().trim().min(1, "Descrição é obrigatória").max(500, "Descrição muito longa"),
    dataInicio: z.iso.date("Informe uma data inicial válida"),
    dataFim: z.iso.date("Informe uma data final válida"),
    status: z.enum(StatusManutencao)
  })
  .refine(data => data.dataFim >= data.dataInicio, {
    message: "A data final deve ser igual ou posterior à data inicial",
    path: ["dataFim"]
  });

export type ManutencaoFormData = z.infer<typeof manutencaoSchema>;
