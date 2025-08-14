// src/controllers/useSignAuthController.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleLogin, handleRegister } from "./handler";

export const useSignAuthController = () => {
  const [signIn, toggle] = useState(true);
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [form, setForm] = useState({
    nama_perusahaan: "",
    nama_direktur: "",
    nama_penanggung_jawab: "",
    alamat_perusahaan: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [error, setError] = useState({
    signIn: null,
    signUp: null,
  });

  const [successSignUp, setSuccessSignUp] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      if (role === "admin") router.push("/admin");
      else router.push("/user");
    }
  }, [router]);

  const clearForm = () =>
    setForm({
      nama_perusahaan: "",
      nama_direktur: "",
      nama_penanggung_jawab: "",
      alamat_perusahaan: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

  const submitLogin = (e) => {
    e.preventDefault();
    handleLogin({
      signInUsername,
      signInPassword,
      setErrorSignIn: (msg) => setError((prev) => ({ ...prev, signIn: msg })),
      setIsSubmittingSignIn: (val) =>
        setLoading((prev) => ({ ...prev, signIn: val })),
      router,
    });
  };

  const submitRegister = (e) => {
    e.preventDefault();
    handleRegister({
      form,
      setSuccessSignUp,
      setErrorSignUp: (msg) => setError((prev) => ({ ...prev, signUp: msg })),
      setShowPopup,
      setIsSubmittingSignUp: (val) =>
        setLoading((prev) => ({ ...prev, signUp: val })),
      clearForm,
    });
  };

  return {
    signIn,
    toggle,
    signInUsername,
    signInPassword,
    setSignInUsername,
    setSignInPassword,
    form,
    setForm,
    loading,
    error,
    successSignUp,
    showPopup,
    setShowPopup,
    showPassword,
    setShowPassword,
    submitLogin,
    submitRegister,
  };
};
