"use client";

import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { Box, Button, Chip, colors, IconButton, Typography } from "@mui/material";
import { GridColDef, GridDataSource } from "@mui/x-data-grid";
import { Manutencao, StatusManutencao, TipoManutencao } from "@/types/ObjectTypes";
import changeOpacity from "@/utils/color";
import CustomModal from "../common/CustomModal";
import CustomTable from "../common/Table";
import ManutencaoForm from "./ManutencaoForm";

type ManutencoesTableProps = {
  dataSource: GridDataSource | Manutencao[];
  onUpdate: (manutencao: Manutencao) => void;
  onDelete: (manutencaoId: number) => void;
};

const statusColorMap = {
  [StatusManutencao.CONCLUIDO]: colors.green[500],
  [StatusManutencao.EM_ANDAMENTO]: colors.blue[500],
  [StatusManutencao.AGENDADA]: colors.grey[500]
};

const maintenanceTypeColorMap = {
  [TipoManutencao.PREVENTIVA]: colors.green[500],
  [TipoManutencao.CORRETIVA]: colors.amber[700]
};

const formatDate = (date: string) =>
  date ? new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`)) : "--";

const ManutencoesTable: React.FC<ManutencoesTableProps> = ({ dataSource, onUpdate, onDelete }) => {
  const columns: readonly GridColDef<Manutencao>[] = [
    {
      flex: 0.12,
      field: "placa",
      headerName: "Veículo (Placa)",
      minWidth: 140
    },
    {
      flex: 0.12,
      field: "tipoManutencao",
      headerName: "Tipo",
      minWidth: 120,
      renderCell: ({ row }) => {
        const color = maintenanceTypeColorMap[row.tipoManutencao];
        return <Chip size="small" label={row.tipoManutencao} sx={{ background: changeOpacity(color, 20), color }} />;
      }
    },
    {
      flex: 0.3,
      field: "descricao",
      headerName: "Descrição",
      minWidth: 220
    },
    {
      flex: 0.14,
      field: "dataInicio",
      headerName: "Data inicial",
      minWidth: 130,
      valueFormatter: value => formatDate(value)
    },
    {
      flex: 0.14,
      field: "dataFim",
      headerName: "Data final",
      minWidth: 130,
      valueFormatter: value => formatDate(value)
    },
    {
      flex: 0.14,
      field: "status",
      headerName: "Status",
      minWidth: 140,
      renderCell: ({ row }) => {
        const color = statusColorMap[row.status];
        return <Chip label={row.status} sx={{ background: changeOpacity(color, 20), color }} />;
      }
    },
    {
      minWidth: 100,
      field: "actions",
      headerName: "Ações",
      hideable: false,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => <ManutencoesActions row={row} onUpdate={onUpdate} onDelete={onDelete} />
    }
  ];

  return <CustomTable columns={columns} {...(dataSource instanceof Array ? { rows: dataSource } : { dataSource })} />;
};

export default ManutencoesTable;

const ManutencoesActions: React.FC<{
  row: Manutencao;
  onUpdate: (manutencao: Manutencao) => void;
  onDelete: (manutencaoId: number) => void;
}> = ({ row, onUpdate, onDelete }) => {
  const [modal, setModal] = useState<"edit" | "delete" | null>(null);

  return (
    <Box sx={{ display: "flex", gap: 1, height: "100%", alignItems: "center" }}>
      <CustomModal open={modal === "edit"} onClose={() => setModal(null)} title="Editar Manutenção">
        {modal === "edit" && (
          <ManutencaoForm
            manutencao={row}
            afterSubmit={manutencao => {
              onUpdate(manutencao);
              setModal(null);
            }}
          />
        )}
      </CustomModal>
      <CustomModal open={modal === "delete"} onClose={() => setModal(null)} title="Excluir Manutenção">
        <Box sx={{ display: "grid", gap: 2, minWidth: { xs: 260, sm: 400 } }}>
          <Typography>Tem certeza que deseja excluir a manutenção do veículo {row.placa}?</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button onClick={() => setModal(null)}>Cancelar</Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                onDelete(row.id);
                setModal(null);
              }}
            >
              Excluir
            </Button>
          </Box>
        </Box>
      </CustomModal>
      <IconButton
        size="small"
        color="primary"
        aria-label={`Editar manutenção ${row.placa}`}
        onClick={() => setModal("edit")}
      >
        <EditOutlined />
      </IconButton>
      <IconButton
        size="small"
        color="secondary"
        aria-label={`Excluir manutenção ${row.placa}`}
        onClick={() => setModal("delete")}
      >
        <DeleteOutlined />
      </IconButton>
    </Box>
  );
};
