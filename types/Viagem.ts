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
  ano: number;
  capacidade: number;
  tipo: TipoVeiculo;
  habilitacaoNecessaria: CategoriaHabilitacao;
};

export enum CategoriaHabilitacao {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E"
}

export enum TipoVeiculo {
  CARRO = "CARRO",
  MOTO = "MOTO",
  CAMINHAO = "CAMINHAO",
  ONIBUS = "ONIBUS"
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
