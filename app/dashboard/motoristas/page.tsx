"use client";

import { useEffect, useState } from "react";
import { CategoriaHabilitacao, Motorista, StatusMotorista } from "@/types/ObjectTypes";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import MotoristasTable from "@/components/motorista/MotoristasTable";

export default function Home() {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);

  useEffect(() => {
    const fetchMotoristas = async () => {
      const data: Motorista[] = [
        {
          id: 1,
          nome: "João Silva",
          documento: "123456789",
          telefone: "11999999999",
          email: "joao.silva@example.com",
          categoria: CategoriaHabilitacao.B,
          status: StatusMotorista.ATIVO
        },
        {
          id: 2,
          nome: "Maria Oliveira",
          documento: "234567890",
          telefone: "11988888888",
          email: "maria.oliveira@example.com",
          categoria: CategoriaHabilitacao.C,
          status: StatusMotorista.ATIVO
        },
        {
          id: 3,
          nome: "Carlos Santos",
          documento: "345678901",
          telefone: "11977777777",
          email: "carlos.santos@example.com",
          categoria: CategoriaHabilitacao.B,
          status: StatusMotorista.INATIVO
        },
        {
          id: 4,
          nome: "Ana Costa",
          documento: "456789012",
          telefone: "11966666666",
          email: "ana.costa@example.com",
          categoria: CategoriaHabilitacao.C,
          status: StatusMotorista.ATIVO
        }
      ];

      setMotoristas(data);
    };

    fetchMotoristas();
  }, []);

  return (
    <Box>
      <Card>
        <CardHeader title="Motoristas" />
        <CardContent>
          <MotoristasTable
            dataSource={motoristas}
            onUpdate={motorista => {
              setMotoristas(current => current.map(item => (item.id === motorista.id ? motorista : item)));
            }}
            onDelete={motoristaId => {
              setMotoristas(current => current.filter(item => item.id !== motoristaId));
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
