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
import { toast, Bounce } from "react-toastify";

const Register: React.FC = () => {
  const navigation = useRouter();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const Auth = useAuth();
  const isDesktop = IsDesktop();

  const onRegister = async () => {
    setIsLoading(true);
    try {
      const { data } = await API.post("/auth/register", { fullName, email, password, confirmPassword });
      toast.success(data.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      navigation.replace("/auth/login");
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

  return !isDesktop ? (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#E6F0F8] px-6">
      <h1 className="text-3xl font-bold text-[#174D70] mb-6">Register</h1>
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4">
        <TextField
          fullWidth
          label="Nama Lengkap"
          variant="outlined"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mb-4"
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              color: "black",
              "& fieldset": {
                borderColor: "#EDEDED",
              },
              "&:hover fieldset": {
                borderColor: "#EDEDED",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EDEDED",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              "&.Mui-focused": {
                color: "black",
              },
            },
          }}
        />
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
              color: "black",
              "& fieldset": {
                borderColor: "#EDEDED",
              },
              "&:hover fieldset": {
                borderColor: "#EDEDED",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EDEDED",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              "&.Mui-focused": {
                color: "black",
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
            width: "100%",
            "& .MuiOutlinedInput-root": {
              color: "black",
              "& fieldset": {
                borderColor: "#EDEDED",
              },
              "&:hover fieldset": {
                borderColor: "#EDEDED",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EDEDED",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              "&.Mui-focused": {
                color: "black",
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Konfirmasi Kata Sandi"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-2"
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              color: "black",
              "& fieldset": {
                borderColor: "#EDEDED",
              },
              "&:hover fieldset": {
                borderColor: "#EDEDED",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EDEDED",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              "&.Mui-focused": {
                color: "black",
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton fullWidth loading={isLoading} variant="contained" sx={{ bgcolor: "#174D70", mt: 2, mb: 1 }} onClick={onRegister}>
          Daftar
        </LoadingButton>

        <p className="text-center text-sm text-gray-500 mt-4">
          Sudah punya akun?{" "}
          <span className="text-[#174D70] cursor-pointer">
            <Link href={"/auth/login"}>Masuk</Link>
          </span>
        </p>
      </div>
    </div>
  ) : null;
};

export default Register;
