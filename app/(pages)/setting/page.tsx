"use client";
import { useState } from "react";
import { AppBar, Box, Toolbar, Typography, List, ListItem, ListItemText, ListItemIcon, ListItemButton } from "@mui/material";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import KeyOutlined from "@mui/icons-material/KeyOutlined";
import Logout from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";

const settingsData = [
  { text: "Notifikasi", icon: <NotificationsOutlined />, path: "/notifikasi" },
  { text: "Ganti Kata Sandi", icon: <KeyOutlined />, path: "/change-password" },
  { text: "Keluar", icon: <Logout />, path: "/logout" },
];

const SettingsPage = () => {
  const [password, setPassword] = useState<{ current: string; new: string; confirm: string }>({ current: "", new: "", confirm: "" });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name as keyof typeof password]: value }));
  };

  const handleSavePassword = () => {
    if (password.new !== password.confirm) {
      alert("Konfirmasi kata sandi tidak cocok!");
      return;
    }
    console.log("Password updated:", password);
    setPassword({ current: "", new: "", confirm: "" });
  };

  return (
    <Box sx={{ bgcolor: "#f0f4f8", minHeight: "100vh", p: 2 }}>
      {/* App Bar */}
      <AppBar position="static" sx={{ bgcolor: "#457B9D", color: "white" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Profil
          </Typography>
        </Toolbar>
      </AppBar>

      <List sx={{ mt: 3, bgcolor: "white", borderRadius: 2, p: 1 }}>
        {settingsData.map((setting, index) => (
          <ListItem key={index}>
            <Link href={setting.path} style={{ width: "100%" }}>
              <ListItemButton sx={{ borderRadius: 2, mb: 1 }}>
                <ListItemIcon
                  sx={{
                    bgcolor: "#E3F2FD",
                    borderRadius: "50%",
                    minWidth: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {setting.icon}
                </ListItemIcon>
                <ListItemText primary={setting.text} sx={{ width: "90%" }} />
                <ChevronRightIcon sx={{ color: "#5C6BC0" }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SettingsPage;
