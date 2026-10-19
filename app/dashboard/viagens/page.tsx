"use client";
import ViagensTable from "@/components/viagens/ViagensTable";
import {
  CategoriaHabilitacao,
  StatusMotorista,
  StatusVeiculo,
  StatusViagem,
  TipoVeiculo,
  Viagem
} from "@/types/ObjectTypes";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";

export default function ViagensPage() {
  const [viagens, setViagens] = useState<Viagem[]>([]);

  useEffect(() => {
    const fetchViagens = async () => {
      const data: Viagem[] = [
        {
          id: 1,
          motorista: {
            id: 1,
            nome: "João Silva",
            documento: "123456789",
            email: "joao.silva@example.com",
            telefone: "11999999999",
            categoria: CategoriaHabilitacao.B,
            status: StatusMotorista.ATIVO
          },
          veiculo: {
            id: 1,
            placa: "ABC1234",
            modelo: "Civic",
            marca: "Honda",
            ano: 2020,
            capacidade: 5,
            tipo: TipoVeiculo.CARRO,
            habilitacaoNecessaria: CategoriaHabilitacao.A,
            status: StatusVeiculo.DISPONIVEL
          },
          dataSaida: "2026-10-25T08:00:00Z",
          previsaoChegada: "2026-10-25T14:00:00Z",
          origem: "São Paulo - SP",
          destino: "Rio de Janeiro - RJ",
          finalidade: "Reunião com clientes",
          status: StatusViagem.AGENDADA
        },
        {
          id: 2,
          motorista: {
            id: 2,
            nome: "Maria Oliveira",
            documento: "234567890",
            email: "maria.oliveira@example.com",
            telefone: "11988888888",
            categoria: CategoriaHabilitacao.C,
            status: StatusMotorista.ATIVO
          },
          veiculo: {
            id: 2,
            placa: "XYZ5678",
            modelo: "F-150",
            marca: "Ford",
            ano: 2019,
            capacidade: 3,
            tipo: TipoVeiculo.CAMINHAO,
            habilitacaoNecessaria: CategoriaHabilitacao.B,
            status: StatusVeiculo.EM_VIAGEM
          },
          dataSaida: "2026-10-24T06:30:00Z",
          previsaoChegada: "2026-10-24T12:30:00Z",
          origem: "Belo Horizonte - MG",
          destino: "Vitória - ES",
          finalidade: "Transporte de cargas",
          status: StatusViagem.EM_ANDAMENTO
        }
      ];
      setViagens(data);
    };
    fetchViagens();
  }, []);
  return (
    <Box>
      <Card>
        <CardHeader title="Viagens" />
        <CardContent>
          <ViagensTable viagens={viagens} />
        </CardContent>
      </Card>
    </Box>
  )
}