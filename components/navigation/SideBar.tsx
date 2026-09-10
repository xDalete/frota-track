import { Box, Typography } from "@mui/material";
import Logo from "../common/Logo";
import { GridViewOutlined, LocalShippingOutlined, GroupAddOutlined, LocationOnOutlined } from "@mui/icons-material";
import SideBarItem from "./SideBarItem";

const Sidebar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 250,
        height: "100vh",
        backgroundColor: "#0F172A",
        padding: 2,
        color: "primary.contrastText"
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Logo size={40} />
        <Typography variant="h6" sx={{ marginLeft: 1 }}>
          Frota Track
        </Typography>
      </Box>
      <Box sx={{ marginTop: 2, gap: 1, display: "flex", flexDirection: "column" }}>
        <SideBarItem href="/dashboard" label="Dashboard" icon={<GridViewOutlined />} />
        <SideBarItem href="/dashboard/veiculos" label="Veículos" icon={<LocalShippingOutlined />} />
        <SideBarItem href="/dashboard/motoristas" label="Motoristas" icon={<GroupAddOutlined />} />
        <SideBarItem href="/dashboard/viagens" label="Viagens" icon={<LocationOnOutlined />} /> 
      </Box>
      <Typography variant="caption" color="textDisabled" sx={{ marginTop: "auto", textAlign: "center" }}>copyright © 2026</Typography>
    </Box>
  );
};

export default Sidebar;
