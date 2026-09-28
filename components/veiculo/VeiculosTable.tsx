"use client";
import { Box, Chip, colors, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import CustomTable from "../common/Table";
import { StatusVeiculo, Veiculo } from "@/types/ObjectTypes";
import changeOpacity from "@/utils/color";
import { useState } from "react";
import CustomModal from "../common/CustomModal";
import VeiculoForm from "./VeiculoForm";
import { GridDataSource } from "@mui/x-data-grid";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";

type VeiculosTableProps = {
  dataSource: GridDataSource | Veiculo[];
  afterSubmit?: () => void;
};

const VeiculosTable: React.FC<VeiculosTableProps> = ({ dataSource, afterSubmit }) => {
  const columns: readonly GridColDef<Veiculo>[] = [
    {
      flex: 0.15,
      field: "placa",
      headerName: "Placa",
      minWidth: 150
    },
    {
      flex: 0.25,
      field: "modelo",
      headerName: "Modelo",
      minWidth: 130
    },
    {
      flex: 0.15,
      field: "marca",
      headerName: "Marca",
      minWidth: 130
    },
    {
      flex: 0.15,
      field: "status",
      headerName: "Status",
      minWidth: 150,
      renderCell: ({ row }) => {
        const status = row.status;
        const colorMap = {
          //TODO: Pensar em forma melhor de mapear cores para status e padronizar as cores do sistema
          [StatusVeiculo.DISPONIVEL]: colors.green[500],
          [StatusVeiculo.EM_VIAGEM]: colors.red[500],
          [StatusVeiculo.EM_MANUTENCAO]: colors.blue[500]
        };
        return (
          <Chip label={status} sx={{ background: changeOpacity(colorMap[status], 20), color: colorMap[status] }} />
        );
      }
    },
    {
      minWidth: 100,
      field: "actions",
      headerName: "Ações",
      hideable: false,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        return <VeiculosActions row={row} afterSubmit={afterSubmit} />;
      }
    }
  ];
  return <CustomTable columns={columns} {...(dataSource instanceof Array ? { rows: dataSource } : { dataSource })} />;
};

export default VeiculosTable;

const VeiculosActions: React.FC<{ row: Veiculo; afterSubmit?: () => void }> = ({ row, afterSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", gap: 1, height: "100%", alignItems: "center" }}>
      <CustomModal open={isOpen} onClose={() => setIsOpen(false)} title="Editar Concedente">
        <VeiculoForm
          veiculo={row}
          afterSubmit={() => {
            setIsOpen(false);
            afterSubmit?.();
          }}
        />
      </CustomModal>
      <IconButton size="small" color="primary" onClick={() => setIsOpen(true)}>
        <EditOutlined />
      </IconButton>
      <IconButton size="small" color="secondary" onClick={() => console.log("Deletar", row)}>
        <DeleteOutlined />
      </IconButton>
    </Box>
  );
};
