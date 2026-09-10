import { Box, Link } from "@mui/material";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type SideBarItemProps = {
  href: string;
  label: string;
  icon?: ReactNode;
  active?: boolean;
};

export default function SideBarItem({ href, label, icon }: SideBarItemProps) {
  const pathname = usePathname();
  const active = href === pathname;
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        height: 48,
        textDecoration: "none",
        borderRadius: 2,
        color: "inherit",
        "&:hover": { backgroundColor: "action.hover" },
        transition: "background-color 0.2s",
        backgroundColor: active ? "action.selected" : "transparent"
      }}
    >
      {icon && (
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", aspectRatio: "1" }}
        >
          {icon}
        </Box>
      )}
      <span>{label}</span>
    </Link>
  );
}
