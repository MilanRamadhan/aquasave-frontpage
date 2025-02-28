"use client";
import React, { useEffect } from "react";
import { Box, Avatar, Typography, TextField, Button, Container, AppBar, Toolbar, Paper } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/UseAuth";
import { PersonOutline } from "@mui/icons-material";
import API from "@/app/utils/API";

const ProfilePage = () => {
  const navigation = useRouter();
  const auth = useAuth();

  const onLogout = async () => {
    try {
      await API.post(`/auth/logout/${auth.auth.user?.id}`);
      auth.logout();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth/login");
    }
  }, [auth.auth.isAuthenticated, navigation]);

  if (!auth.auth.isAuthenticated) return null;

  const { fullName, email } = auth.auth.user || {}; // Destructuring untuk mengambil data user

  return (
    <Box sx={{ backgroundColor: "#F8FAFC", minHeight: "100vh", paddingBottom: 8 }}>
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(45deg, #1E3A8A 30%, #3B82F6 90%)",
          color: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "1.2rem", letterSpacing: "0.5px" }}>
            Profil Saya
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Paper elevation={3} sx={{ borderRadius: 4, py: 4, px: 3, mb: 3, background: "linear-gradient(to bottom, #EFF6FF, #FFFFFF)" }}>
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              sx={{
                width: 130,
                height: 130,
                bgcolor: "#BFDBFE",
                mx: "auto",
                border: "4px solid white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <PersonOutline sx={{ fontSize: 70, color: "#1E3A8A" }} />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 3, color: "#1E3A8A" }}>
              {fullName}
            </Typography>
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: "600", mb: 1, color: "#1E3A8A", display: "flex", alignItems: "center", mt: 5 }}>
            <PersonOutline sx={{ mr: 1, fontSize: 20 }} />
            Username
          </Typography>
          <Typography
            variant="body1"
            sx={{
              border: "1px solid #EDEDED",
              borderRadius: 2,
              padding: 2.5,
              bgcolor: "#F1F5F9",
              color: "black",
              mb: 3,
            }}
          >
            {fullName}
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: "600", mb: 1, color: "#1E3A8A", display: "flex", alignItems: "center" }}>
            <PersonOutline sx={{ mr: 1, fontSize: 20 }} />
            Email
          </Typography>
          <Typography
            variant="body1"
            sx={{
              border: "1px solid #EDEDED",
              borderRadius: 2,
              padding: 2.5,
              bgcolor: "#F1F5F9",
              color: "black",
            }}
          >
            {email}
          </Typography>
        </Paper>

        <Button
          variant="contained"
          color="error"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          sx={{ borderRadius: 3, py: 1.5, fontWeight: "bold", textTransform: "none", fontSize: "1rem", boxShadow: "0px 4px 8px rgba(244, 67, 54, 0.3)" }}
        >
          Keluar Akun
        </Button>
      </Container>
    </Box>
  );
};

export default ProfilePage;
