"use client";

import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { Box, Button, Chip, colors, IconButton, Typography } from "@mui/material";
import { GridColDef, GridDataSource } from "@mui/x-data-grid";
import { Motorista, StatusMotorista } from "@/types/ObjectTypes";
import changeOpacity from "@/utils/color";
import CustomModal from "../common/CustomModal";
import CustomTable from "../common/Table";
import MotoristaForm from "./MotoristaForm";

type MotoristasTableProps = {
  dataSource: GridDataSource | Motorista[];
  onUpdate: (motorista: Motorista) => void;
  onDelete: (motoristaId: number) => void;
};

const MotoristasTable: React.FC<MotoristasTableProps> = ({ dataSource, onUpdate, onDelete }) => {
  const columns: readonly GridColDef<Motorista>[] = [
    {
      flex: 0.2,
      field: "nome",
      headerName: "Nome",
      minWidth: 150
    },
    {
      flex: 0.2,
      field: "documento",
      headerName: "Documento",
      minWidth: 150
    },
    {
      flex: 0.2,
      field: "telefone",
      headerName: "Telefone",
      minWidth: 150
    },
    {
      flex: 0.3,
      field: "email",
      headerName: "E-mail",
      minWidth: 200
    },
    {
      flex: 0.1,
      field: "categoria",
      headerName: "CNH",
      minWidth: 100
    },
    {
      flex: 0.15,
      field: "status",
      headerName: "Status",
      minWidth: 120,
      renderCell: ({ row }) => {
        const colorMap = {
          [StatusMotorista.ATIVO]: colors.green[500],
          [StatusMotorista.INATIVO]: colors.red[500]
        };
        const color = colorMap[row.status];

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
      renderCell: ({ row }) => <MotoristasActions row={row} onUpdate={onUpdate} onDelete={onDelete} />
    }
  ];

  return <CustomTable columns={columns} {...(dataSource instanceof Array ? { rows: dataSource } : { dataSource })} />;
};

export default MotoristasTable;

const MotoristasActions: React.FC<{
  row: Motorista;
  onUpdate: (motorista: Motorista) => void;
  onDelete: (motoristaId: number) => void;
}> = ({ row, onUpdate, onDelete }) => {
  const [modal, setModal] = useState<"edit" | "delete" | null>(null);

  return (
    <Box sx={{ display: "flex", gap: 1, height: "100%", alignItems: "center" }}>
      <CustomModal open={modal === "edit"} onClose={() => setModal(null)} title="Editar Motorista">
        {modal === "edit" && (
          <MotoristaForm
            motorista={row}
            afterSubmit={motorista => {
              onUpdate(motorista);
              setModal(null);
            }}
          />
        )}
      </CustomModal>
      <CustomModal open={modal === "delete"} onClose={() => setModal(null)} title="Excluir Motorista">
        <Box sx={{ display: "grid", gap: 2, minWidth: { xs: 260, sm: 400 } }}>
          <Typography>Tem certeza que deseja excluir {row.nome}?</Typography>
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
      <IconButton size="small" color="primary" aria-label={`Editar ${row.nome}`} onClick={() => setModal("edit")}>
        <EditOutlined />
      </IconButton>
      <IconButton size="small" color="secondary" aria-label={`Excluir ${row.nome}`} onClick={() => setModal("delete")}>
        <DeleteOutlined />
      </IconButton>
    </Box>
  );
};
