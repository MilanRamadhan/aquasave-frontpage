"use client";

import { useAuth } from "@/app/hooks/UseAuth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IsDesktop } from "@/app/hooks";
import API from "@/app/utils/API";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import Link from "next/link";
import { link } from "fs";

const HomePage: React.FC = () => {
  const auth = useAuth();
  const navigation = useRouter();
  const isDesktop = IsDesktop();
  const [loading, setLoading] = useState<boolean>(true);
  const [tools, setTools] = useState<any[]>([]);
  const [totalUsedWater, setTotalUsedWater] = useState<number | null>(null);

  const getTools = async () => {
    try {
      const res = await API.get(`/tool/getToolsByUserId/${auth.auth.user?.id}`);
      console.log(res.data.data);
      setTools(res.data.data);
      if (res.data.data.length > 0) {
        await getHistoryThisDay(res.data.data[0]._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getHistoryThisDay = async (toolId: string) => {
    try {
      const res = await API.get(`/history/getHistory/${auth.auth.user?.id}/${toolId}?filter=hari`);
      console.log(res.data);

      const total = res.data.data.reduce((acc: number, item: { totalUsedWater: number }) => acc + item.totalUsedWater, 0);
      setTotalUsedWater(total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth/login");
      return;
    }

    setLoading(true);
    getTools().finally(() => {
      setLoading(false);
    });
  }, [auth.auth.isAuthenticated, navigation]);

  if (!auth.auth.isAuthenticated) {
    return null;
  }

  return isDesktop ? null : (
    <Box sx={{ width: "100%", height: "100vh", bgcolor: "#F8F9FA" }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Halo
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#2D70AB" }}>
          Selamat Datang
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper
            sx={{
              p: 2,
              mt: 2,
              bgcolor: "#E3F2FD",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: 2,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                16 Jam
              </Typography>
              <Typography variant="body2">Penggunaan Hari Ini</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {totalUsedWater ?? 0} L / 1000L
              </Typography>
            </Box>
            <Link href={"/grafik"}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 1,
                }}
              >
                →
              </Box>
            </Link>
          </Paper>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 3,
            gap: 3,
          }}
        >
          {[
            { title: "Laporan Penggunaan Air", icon: "📄", link: "/laporan" },
            { title: "Panduan Penghematan Air", icon: "📘", link: "/panduan" },
            { title: "Pengaturan Sensor", icon: "📡", link: "/sensor" },
          ].map((item, index) => (
            <Link key={index} href={item.link ?? "#"} style={{ width: "100%" }}>
              <Paper
                sx={{
                  py: 3,
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  bgcolor: "#E3F2FD",
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Typography sx={{ fontSize: 40, textAlign: "center", fontWeight: 600 }}>{item.icon}</Typography>
                <Typography variant="body1" fontWeight={600} fontSize={18}>
                  {item.title}
                </Typography>
              </Paper>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
