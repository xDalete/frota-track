import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";

export const DefaultPaginationModel = { page: 0, pageSize: 25 };

const CustomTable: typeof DataGrid = props => {
  return (
    <DataGrid
      localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      rowSelection={false}
      initialState={{
        pagination: { paginationModel: DefaultPaginationModel, rowCount: 0 }
      }}
      pageSizeOptions={[10, 25, 50, 100]}
      {...props}
    />
  );
};

export default CustomTable;
