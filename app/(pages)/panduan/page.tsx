"use client";

import { Box, Typography, Paper, IconButton, Toolbar, AppBar } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";

const PanduanPage: React.FC = () => {
  const navigation = useRouter();

  const tips = [
    {
      title: "1. Periksa Kebocoran",
      content: "Periksa kran, pipa, dan toilet secara rutin untuk mendeteksi kebocoran. Bahkan kebocoran kecil dapat menghabiskan banyak air jika dibiarkan. Ganti seal atau bagian yang rusak untuk menghindari pemborosan air.",
    },
    {
      title: "2. Gunakan Perangkat Hemat Air",
      content:
        "• Pasang shower head bertekanan rendah atau aerator untuk mengurangi aliran air tanpa mengurangi kenyamanan.\n• Gunakan keran hemat air di wastafel dapur dan kamar mandi.\n• Gunakan toilet dual-flush yang memungkinkan Anda memilih antara flush besar atau kecil sesuai kebutuhan.",
    },
    {
      title: "3. Matikan Air Saat Tidak Digunakan",
      content: "• Matikan keran saat menyikat gigi atau mencuci tangan untuk menghemat air.\n• Matikan shower saat sabunan tubuh dan shampoo.",
    },
    {
      title: "4. Cuci Piring Dengan Efisien",
      content: "• Gunakan mesin pencuci piring hanya saat penuh, atau cuci dengan tangan menggunakan dua baskom, satu untuk air sabun dan satu untuk membilas.\n• Gunakan air bekas cucian untuk menyiram tanaman atau membersihkan.",
    },
    {
      title: "5. Penggunaan Air Di Taman Dan Tanaman",
      content: "• Gunakan sistem irigasi tetes untuk menyiram tanaman, yang lebih efisien daripada menyiram dengan selang.\n• Tanam tanaman yang tahan kekeringan untuk mengurangi kebutuhan akan penyiraman.",
    },
    {
      title: "6. Daur Ulang Air",
      content: "• Gunakan air bekas mencuci sayur untuk menyiram tanaman, atau air hujan untuk kegiatan rumah tangga yang tidak membutuhkan air bersih.",
    },
    {
      title: "7. Hemat Air Saat Mandi",
      content: "• Mandilah dengan waktu yang lebih singkat atau gunakan ember untuk mandi jika tidak ada shower bertekanan rendah. Jangan biarkan air mengalir saat Anda sedang menggunakan sabun atau sampo.",
    },
    {
      title: "8. Cuci Pakaian dengan Efisien",
      content: "• Cuci pakaian hanya jika muatan mesin penuh untuk menghindari pemborosan air.\n• Gunakan mesin cuci yang efisien dengan penggunaan air yang lebih sedikit.",
    },
    {
      title: "9. Gunakan Wadah yang Efisien",
      content: "• Gunakan ember atau wadah untuk mencuci mobil atau kendaraan, daripada menggunakan selang yang terus-menerus mengalirkan air.",
    },
    {
      title: "10. Mengurangi Penggunaan Air Panas",
      content: "• Hindari penggunaan air panas yang berlebihan karena membutuhkan lebih banyak energi dan air.",
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "100vh", bgcolor: "#F8F9FA" }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(45deg, #1E3A8A 30%, #3B82F6 90%)",
          color: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignContent: "center",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "start", alignItems: "center", gap: 2 }}>
          <IconButton onClick={navigation.back} sx={{ color: "white" }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "1.2rem", letterSpacing: "0.5px" }}>
            Panduan
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Konten */}
      <Box sx={{ p: 2, mt: 10 }}>
        {tips.map((tip, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#3B6994" }}>
              {tip.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, whiteSpace: "pre-line" }}>
              {tip.content}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default PanduanPage;
