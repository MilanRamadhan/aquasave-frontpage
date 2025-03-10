"use client";
import { useRef, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "next/link";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { IsDesktop } from "@/app/hooks";
import { useAuth } from "@/app/hooks/UseAuth";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

const Navbar = () => {
  const isDesktop = IsDesktop();
  const theme = useTheme();
  const Auth = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [navActivePosition, setNavActivePosition] = useState<string>("home");

  const mainMenu = [
    { label: "Debitor", path: "/" },
    { label: "Transaksi", path: "/transaksi" },
    { label: "Kredit Air", path: "/kredit-air" },
    { label: "Analitik", path: "/analitik" },
  ];

  useEffect(() => {
    const pathMap: { [key: string]: string } = {
      "/": "home",
      "/notifikasi": "notifikasi",
      "/lapor-kebocoran": "lapor-kebocoran",
      "/profile": "profile",
    };
    setNavActivePosition(pathMap[pathname] || "home");
  }, [pathname]);

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  }));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return isDesktop ? (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#001740", display: "flex", alignItems: "center", justifyContent: "space-between", px: 4 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={() => setOpen(true)} edge="start" sx={{ mr: 2, ...(open && { display: "none" }) }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" fontWeight={600}>
            AquaLink
          </Typography>
        </Toolbar>
        <div>
          <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
            <div className="bg-white text-black py-1 px-4 rounded-full">
              <h1 className="text-lg">{Auth.auth.user?.fullName}</h1>
            </div>
          </IconButton>
          <Menu id="menu-appbar" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} sx={{ position: "fixed", left: "92%", top: "5%" }}>
            <MenuItem sx={{ px: 3 }} onClick={() => Auth.logout()}>
              Keluar
            </MenuItem>
          </Menu>
        </div>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <DrawerHeader>
          <Typography variant="body1" fontWeight={600}>
            Menu
          </Typography>
          <IconButton onClick={() => setOpen(false)}>{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <Typography variant="body1" fontWeight={600}>
              {Auth.auth.user?.fullName}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">ID : {Auth.auth.user?.id}</Typography>
          </ListItem>
        </List>
        <Divider />
        <List>
          {mainMenu.map((menu, index) => (
            <ListItem key={index} disablePadding>
              <Link onClick={() => setOpen(false)} href={menu.path} className="w-full">
                <ListItemButton>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={menu.label} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => Auth.logout()}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Keluar" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  ) : (
    <Box sx={{ pb: 7 }} ref={useRef<HTMLDivElement>(null)}>
      <CssBaseline />
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderRadius: "16px 16px 0 0",
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
        elevation={3}
      >
        <BottomNavigation
          sx={{
            bgcolor: "#ffffff",
            display: "flex",
            justifyContent: "space-evenly",
            padding: "10px 5",
          }}
        >
          {["/", "/profile", "/notifikasi"].map((path, index) => (
            <Link key={index} href={path} passHref>
              <BottomNavigationAction
                onClick={() => setNavActivePosition(path === "/" ? "home" : path.slice(1))}
                label={path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                icon={path === "/" ? <HomeOutlinedIcon /> : path === "/profile" ? <PersonOutlineOutlinedIcon /> : <NotificationOutlinedIcon />}
                sx={{
                  color: navActivePosition === (path === "/" ? "home" : path.slice(1)) ? "#ffffff" : "#202226",
                  bgcolor: navActivePosition === (path === "/" ? "home" : path.slice(1)) ? "#202226" : "white",
                  minWidth: "80px",
                  borderRadius: "12px",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    bgcolor: "#e0e0e0",
                  },
                }}
              />
            </Link>
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Navbar;
