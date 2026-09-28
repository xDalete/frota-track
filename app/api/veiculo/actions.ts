import { VeiculoFormData } from "@/schemas/veiculoSchema";
import { ResponseType } from "@/types/ApiTypes";
import { Veiculo, WithId } from "@/types/ObjectTypes";

// TODO: Implementar axios e padronizar chamadas de API

export function CreateVeiculo(data: VeiculoFormData): Promise<ResponseType<Veiculo>> {
  return Promise.resolve({
    data: {
      id: 1,
      ...data
    },
    message: "Veículo criado com sucesso",
    success: true
  });
}

export function UpdateVeiculo(data: WithId<VeiculoFormData>): Promise<ResponseType<Veiculo>> {
  return Promise.resolve({
    data,
    message: "Veículo atualizado com sucesso",
    success: true
  });
}
