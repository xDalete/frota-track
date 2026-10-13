import React from "react";
import { Modal, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, title, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Card sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", p: 2 }}>
        <CardHeader
          title={title}
          action={
            <IconButton size="small" onClick={onClose} aria-label="close">
              <Close />
            </IconButton>
          }
        />
        <CardContent>{children}</CardContent>
      </Card>
    </Modal>
  );
};

export default CustomModal;
