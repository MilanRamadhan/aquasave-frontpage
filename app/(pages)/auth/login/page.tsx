"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/UseAuth";
import { Grid, Typography } from "@mui/material";
import Logo from "@/app/components/logo/Logo";
import Google from "@/app/components/logo/Google";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect } from "react";
import Link from "next/link";
import Aos from "aos";
import { IsDesktop } from "@/app/hooks";
import API from "@/app/utils/API";
import { toast, Bounce, ToastContainer } from "react-toastify";
import Button from "@mui/material/Button"; // Memperbaiki import Button

const Login: React.FC = () => {
  const navigation = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const Auth = useAuth();
  const isDesktop = IsDesktop();

  const onLogin = async () => {
    setIsLoading(true);
    try {
      const { data } = await API.post("/auth/login", { email, password });
      const userData = {
        user: {
          id: data.data._id,
          fullName: data.data.fullName,
          phone: data.data.phone,
          email: data.data.email,
        },
        token: `Bearer ${data.data.token}`,
      };
      Auth.login(userData);
      toast.success(data.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      const errorMessage = (error as any).response?.data?.message || "Terjadi kesalahan";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (Auth.auth.isAuthenticated) {
      navigation.replace("/");
    }
  }, [Auth.auth.isAuthenticated, navigation]);

  if (Auth.auth.isAuthenticated) {
    return null;
  }

  useEffect(() => {
    console.log("showPassword berubah:", showPassword);
  }, [showPassword]);

  return !isDesktop ? (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#E6F0F8] px-6">
      <h1 className="text-3xl font-bold text-[#174D70] mb-6">Selamat Datang</h1>
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-sm">
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              color: "black", // Warna teks input
              "& fieldset": {
                borderColor: "#EDEDED", // Warna outline default
              },
              "&:hover fieldset": {
                borderColor: "#EDEDED", // Warna outline saat hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EDEDED", // Warna outline saat fokus
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Warna label default
              "&.Mui-focused": {
                color: "black", // Warna label saat fokus
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Kata Sandi"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2"
          sx={{
            mt: 3,
            width: "100%",
            "& .MuiOutlinedInput-root": {
              color: "black", // Warna teks input
              "& fieldset": {
                borderColor: "#EDEDED", // Warna outline default
              },
              "&:hover fieldset": {
                borderColor: "#EDEDED", // Warna outline saat hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EDEDED", // Warna outline saat fokus
              },
            },
            "& .MuiInputLabel-root": {
              color: "black", // Warna label default
              "&.Mui-focused": {
                color: "black", // Warna label saat fokus
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    console.log("Sebelum:", showPassword); // Lihat nilai sebelum diubah
                    setShowPassword((prev) => !prev);
                    console.log("Sesudah:", showPassword); // Lihat nilai sesudah diubah
                  }}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton fullWidth loading={isLoading} variant="contained" sx={{ bgcolor: "#174D70", mt: 2, mb: 1 }} onClick={() => onLogin()}>
          Masuk
        </LoadingButton>

        <p className="text-center text-sm text-gray-500 mt-4">
          Belum punya akun?{" "}
          <span className="text-[#174D70] cursor-pointer">
            <Link href={"/auth/register"}>Daftar</Link>
          </span>
        </p>
      </div>
    </div>
  ) : null;
};

export default Login;
