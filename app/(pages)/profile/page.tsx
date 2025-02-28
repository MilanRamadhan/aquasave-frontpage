"use client";
import React, { useEffect } from "react";
import { Box, Avatar, Typography, TextField, Button, Container, AppBar, Toolbar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/UseAuth";
import { PersonOutline } from "@mui/icons-material";

const ProfilePage = () => {
  const navigation = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth/login");
    }
  }, [auth.auth.isAuthenticated, navigation]);

  if (!auth.auth.isAuthenticated) return null;

  const user = auth.auth.user; // Mengambil data user dari auth

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", paddingBottom: 8 }}>
      {/* App Bar */}
      <AppBar position="static" sx={{ bgcolor: "#457B9D", color: "white" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Profil
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Profile Info */}
      <Container sx={{ textAlign: "center", mt: 3 }}>
        <Avatar sx={{ width: 120, height: 120, bgcolor: "#A8DADC", mx: "auto" }}>
          <PersonOutline sx={{ fontSize: 60, color: "#457B9D" }} />
        </Avatar>
        <Box sx={{ position: "relative", mt: 1 }}> {/* Menambahkan jarak di atas foto profil */}
        </Box>
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
          {user?.fullName}
        </Typography>
      </Container>

      {/* User Info */}
      <Container sx={{ mt: 3 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
          Username
        </Typography>
        <TextField fullWidth variant="outlined" disabled value={user?.fullName} sx={{ bgcolor: "#E9F5FF", borderRadius: 1 }} /> {/* Menampilkan username */}

        <Typography variant="body1" sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
          Email
        </Typography>
        <TextField fullWidth variant="outlined" disabled value={user?.email} sx={{ bgcolor: "#E9F5FF", borderRadius: 1 }} />
      </Container>

      {/* Logout Button */}
      <Container sx={{ mt: 3, textAlign: "center" }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={() => {
            auth.logout(); // Memanggil fungsi logout dari auth
            navigation.replace("/auth/login"); // Mengarahkan ke halaman login
          }}
          sx={{ borderRadius: 2, px: 5, py: 1.5 }}
        >
          Keluar
        </Button>
      </Container>
    </Box>
  );
};

export default ProfilePage;
