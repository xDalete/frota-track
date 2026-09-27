import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "E-mail é obrigatório.").email("Informe um e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres.")
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function getLoginFieldError(
  values: Partial<LoginFormValues>,
  field: keyof LoginFormValues
): string | undefined {
  const parsed = loginSchema.safeParse(values);
  if (parsed.success) return undefined;

  return parsed.error.flatten().fieldErrors[field]?.[0];
}
