import { Chip, colors } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import CustomTable from "../common/Table";
import { Viagem } from "@/types/Viagem";
import { formatShortTime } from "@/utils/format";
import changeOpacity from "@/utils/color";

const columns: readonly GridColDef<Viagem>[] = [
  { field: "id", headerName: "ID", width: 100 },
  {
    flex: 0.25,
    field: "motorista",
    headerName: "Motorista",
    minWidth: 150,
    valueGetter: (value, row) => row.motorista.nome
  },
  {
    flex: 0.15,
    field: "veiculo",
    headerName: "Veículo",
    minWidth: 130,
    valueGetter: (value, row) => row.veiculo.placa
  },
  {
    flex: 0.15,
    field: "origem",
    headerName: "Origem",
    minWidth: 130
  },
  {
    flex: 0.25,
    field: "destino",
    headerName: "Destino",
    minWidth: 120
  },
  {
    flex: 0.15,
    field: "dataSaida",
    headerName: "Data de Saída",
    minWidth: 150,
    valueGetter: (value, row) => formatShortTime(row.dataSaida)
  },
  {
    flex: 0.15,
    field: "status",
    headerName: "Status",
    minWidth: 150,
    renderCell: ({ row }) => {
      const status = row.status;
      const colorMap = {
        Agendada: colors.grey[500],
        "Em Andamento": colors.blue[500],
        Atrasada: colors.yellow[500],
        Concluída: colors.green[500],
        Cancelada: colors.red[500]
      };
      return (
        <Chip
          label={status}
          sx={{ background: changeOpacity(colorMap[status], 20), color: colorMap[status] }}
        />
      );
    }
  }
];

type ViagensTableProps = {
  viagens: Viagem[];
};

const ViagensTable: React.FC<ViagensTableProps> = ({ viagens }) => {
  return <CustomTable columns={columns} rows={viagens} />;
};

export default ViagensTable;
