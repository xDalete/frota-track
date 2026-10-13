import { Motorista } from "@/types/ObjectTypes";
import { GridColDef, GridDataSource } from "@mui/x-data-grid";
import CustomTable from "../common/Table";

type MotoristasTableProps = {
  dataSource: GridDataSource | Motorista[];
};

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
  }
];

const MotoristasTable: React.FC<MotoristasTableProps> = ({ dataSource }) => {
  return <CustomTable columns={columns} {...(dataSource instanceof Array ? { rows: dataSource } : { dataSource })} />;
};

export default MotoristasTable;
