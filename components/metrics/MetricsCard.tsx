import { Box, Card, CardContent, Typography } from "@mui/material";

export default function MetricsCard({
  name,
  value,
  icon,
  color
}: {
  name: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card>
      <CardContent
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "24px" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "18px" }} color="text.secondary">
            {name}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "32px" }}>
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            fontSize: "2rem",
            backgroundColor: `oklch(from ${color} l c h / 20%)`,
            borderRadius: "12px",
            aspectRatio: 1,
            flexShrink: 0,
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}
