import { Box, CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default Loading;
