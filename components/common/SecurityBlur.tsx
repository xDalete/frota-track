import { Box, BoxProps } from "@mui/material";
import { useState } from "react";

const SecurityBlur: React.FC<BoxProps> = ({ children, ...props }) => {
  const [isBlurred, setIsBlurred] = useState(true);

  return (
    <Box
      onClick={() => setIsBlurred(!isBlurred)}
      component="span"
      sx={{
        filter: isBlurred ? "blur(4px)" : "none",
        cursor: "pointer"
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default SecurityBlur;
