import { StatusManutencao, TipoManutencao, TipoVeiculo } from "@/types/ObjectTypes";
import { z } from "zod";

export const manutencaoSchema = z
  .object({
    placa: z
      .string()
      .trim()
      .regex(/^[A-Za-z0-9]{3}-?[A-Za-z0-9]{4}$/, "Informe uma placa válida (ex.: ABC-1D23)"),
    tipo: z.enum(TipoVeiculo),
    tipoManutencao: z.enum(TipoManutencao),
    descricao: z.string().trim().min(1, "Descrição é obrigatória").max(500, "Descrição muito longa"),
    dataInicio: z.iso.date("Informe uma data inicial válida"),
    dataFim: z.union([z.literal(""), z.iso.date()]),
    status: z.enum(StatusManutencao)
  })
  .refine(data => data.dataFim === "" || data.dataFim >= data.dataInicio, {
    message: "A data final deve ser igual ou posterior à data inicial",
    path: ["dataFim"]
  });

export type ManutencaoFormData = z.infer<typeof manutencaoSchema>;
