import { CategoriaHabilitacao, StatusVeiculo, TipoVeiculo } from "@/types/ObjectTypes";
import { z } from "zod";

export const veiculoSchema = z.object({
  placa: z.string().length(7, "Placa deve ter 7 caracteres"), //.regex(/^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/, "Placa inválida"),
  modelo: z.string().min(1, "Modelo é obrigatório").max(64, "Modelo muito longo"),
  marca: z.string().min(1, "Marca é obrigatória").max(64, "Marca muito longa"),
  ano: z.number().int().positive("Ano deve ser um número positivo"),
  capacidade: z.number().int().positive("Capacidade deve ser um número positivo"),
  tipo: z.enum(TipoVeiculo),
  habilitacaoNecessaria: z.enum(CategoriaHabilitacao),
  status: z.enum(StatusVeiculo)
});

export type VeiculoFormData = z.infer<typeof veiculoSchema>;
