import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { CheckCircleOutlined, ContentCopyOutlined } from "@mui/icons-material";

interface CopyToClipboardButtonProps {
  text: string;
  onCopy?: () => void;
}

export const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ text, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
      <IconButton onClick={handleCopy} size="small">
        {copied ? <CheckCircleOutlined /> : <ContentCopyOutlined />}
      </IconButton>
    </Tooltip>
  );
};
