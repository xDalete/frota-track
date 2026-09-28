"use client";
import VeiculosTable from "@/components/veiculo/VeiculosTable";
import { CategoriaHabilitacao, StatusVeiculo, TipoVeiculo, Veiculo } from "@/types/ObjectTypes";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  useEffect(() => {
    const fetchVeiculos = async () => {
      const data: Veiculo[] = [
        {
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
        {
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
        {
          id: 3,
          placa: "LMN9012",
          modelo: "Sprinter",
          marca: "Mercedes-Benz",
          ano: 2021,
          capacidade: 12,
          tipo: TipoVeiculo.ONIBUS,
          habilitacaoNecessaria: CategoriaHabilitacao.D,
          status: StatusVeiculo.EM_MANUTENCAO
        },
        {
          id: 4,
          placa: "JKL3456",
          modelo: "Corolla",
          marca: "Toyota",
          ano: 2022,
          capacidade: 5,
          tipo: TipoVeiculo.CARRO,
          habilitacaoNecessaria: CategoriaHabilitacao.A,
          status: StatusVeiculo.DISPONIVEL
        }
      ];
      setVeiculos(data);
    };
    fetchVeiculos();
  }, []);
  return (
    <Box>
      <Card>
        <CardHeader title="Veículos" />
        <CardContent>
          <VeiculosTable dataSource={veiculos} />
        </CardContent>
      </Card>
    </Box>
  );
}
