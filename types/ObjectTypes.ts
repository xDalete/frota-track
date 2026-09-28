export type Motorista = {
  id: number;
  nome: string;
  documento: string;
  telefone: string;
  email: string;
  categoria: CategoriaHabilitacao;
};

export type Veiculo = {
  id: number;
  placa: string;
  modelo: string;
  marca: string;
  ano: number;
  capacidade: number;
  tipo: TipoVeiculo;
  habilitacaoNecessaria: CategoriaHabilitacao;
  status: StatusVeiculo;
};

export enum StatusVeiculo {
  DISPONIVEL = "Disponível",
  EM_VIAGEM = "Em Viagem",
  EM_MANUTENCAO = "Em Manutenção"
}

export enum CategoriaHabilitacao {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E"
}

export enum TipoVeiculo {
  CARRO = "Carro",
  MOTO = "Moto",
  CAMINHAO = "Caminhão",
  ONIBUS = "Ônibus"
}

export enum StatusViagem {
  AGENDADA = "Agendada",
  EM_ANDAMENTO = "Em Andamento",
  ATRASADA = "Atrasada",
  CONCLUIDA = "Concluída",
  CANCELADA = "Cancelada"
}

export type Viagem = {
  id: number;
  motorista: Motorista;
  veiculo: Veiculo;
  dataSaida: string;
  previsaoChegada?: string;
  dataChegada?: string;
  origem: string;
  destino: string;
  finalidade: string;
  status: StatusViagem;
};

export type WithId<T> = T & { id: number };
