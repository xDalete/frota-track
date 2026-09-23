import { Avatar, Box, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const UserMenu = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const { data: session } = useSession();
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(prevOpen => !prevOpen);
  };
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <>
      {session ? (
        <>
          <Box
            component="button"
            sx={{ display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }}
            ref={anchorRef}
            onClick={handleToggle}
            type="button"
          >
            {session?.user?.image ? <Avatar src={session?.user?.image} /> : <Avatar sx={{ bgcolor: "primary.main" }} />}
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
              <Box sx={{ fontWeight: "bold" }}>{session?.user?.name}</Box>
              <Box sx={{ fontSize: "0.8rem", color: "text.secondary" }}>{session?.user?.email}</Box>
            </Box>
          </Box>
          <Popper
            open={open}
            anchorEl={anchorEl}
            role={undefined}
            sx={{ zIndex: 99999 }}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === "bottom-start" ? "left top" : "left bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      sx={{ minWidth: 250 }}
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>Perfil</MenuItem>
                      <MenuItem onClick={handleClose}>Configurações</MenuItem>
                      <MenuItem
                        onClick={e => {
                          signOut();
                          handleClose(e);
                        }}
                      >
                        Sair
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={() => router.push("/login")}>
          Ir para Login
        </Button>
      )}
    </>
  );
};

export default UserMenu;
