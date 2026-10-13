import { CategoriaHabilitacao } from "@/types/ObjectTypes";
import { z } from "zod";

export const motoristaSchema = z.object({
  nome: z.string().trim().min(1, "Nome é obrigatório").max(120, "Nome muito longo"),
  documento: z.string().trim().min(1, "Documento é obrigatório").max(20, "Documento muito longo"),
  telefone: z.string().trim().min(1, "Telefone é obrigatório").max(20, "Telefone muito longo"),
  email: z.string().trim().min(1, "E-mail é obrigatório").email("Informe um e-mail válido."),
  categoria: z.enum(CategoriaHabilitacao)
});

export type MotoristaFormData = z.infer<typeof motoristaSchema>;
