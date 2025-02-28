"use client";

import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Switch, FormControlLabel, Container, Paper } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import API from "@/app/utils/API";
import Link from "next/link";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    mainNotification: false,
    sound: true,
    vibration: false,
    waterReminder: true,
  });

  const handleToggle = (name: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#3F729B" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back">
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Pengaturan Notifikasi
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container sx={{ mt: 2, mb: 8 }}>
      <Paper sx={{ p: 3, borderRadius: 3 }} elevation={3}>
        {Object.keys(settings).map((key) => (
          <FormControlLabel
            key={key}
            control={
              <Switch 
                checked={settings[key as keyof typeof settings]} 
                onChange={() => handleToggle(key as keyof typeof settings)} 
              />
            }
            label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          />
        ))}
      </Paper>
      </Container>
    </>
  );
};

export default NotificationSettings;