"use client";

import { useState } from "react";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { Manutencao, StatusManutencao, TipoVeiculo } from "@/types/ObjectTypes";
import ManutencoesTable from "@/components/manutencao/ManutencoesTable";

const initialManutencoes: Manutencao[] = [
  {
    id: 1,
    placa: "ABC1234",
    tipo: TipoVeiculo.CARRO,
    descricao: "Manutenção detalhada realizada no veículo.",
    dataInicio: "2023-01-01",
    dataFim: "2023-01-31",
    status: StatusManutencao.CONCLUIDO
  },
  {
    id: 2,
    placa: "XYZ5678",
    tipo: TipoVeiculo.MOTO,
    descricao: "Manutenção detalhada realizada no veículo.",
    dataInicio: "2023-02-01",
    dataFim: "2023-02-28",
    status: StatusManutencao.EM_ANDAMENTO
  },
  {
    id: 3,
    placa: "LMN9012",
    tipo: TipoVeiculo.CAMINHAO,
    descricao: "Manutenção detalhada realizada no veículo.",
    dataInicio: "2023-03-01",
    dataFim: "2023-03-31",
    status: StatusManutencao.PENDENTE
  }
];

export default function ManutencoesPage() {
  const [manutencoes, setManutencoes] = useState(initialManutencoes);

  return (
    <Box>
      <Card>
        <CardHeader title="Manutenção" />
        <CardContent>
          <ManutencoesTable
            dataSource={manutencoes}
            onUpdate={manutencao => {
              setManutencoes(current => current.map(item => (item.id === manutencao.id ? manutencao : item)));
            }}
            onDelete={manutencaoId => {
              setManutencoes(current => current.filter(item => item.id !== manutencaoId));
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
