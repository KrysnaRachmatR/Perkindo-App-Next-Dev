import { loginUser, registerUser } from "./LoginService";

export const handleLogin = async ({
  signInUsername,
  signInPassword,
  setErrorSignIn,
  setIsSubmittingSignIn,
  router,
}) => {
  if (!signInUsername || !signInPassword) {
    setErrorSignIn("Email dan password harus diisi.");
    return;
  }

  setIsSubmittingSignIn(true);
  try {
    const res = await loginUser({ email: signInUsername, password: signInPassword });

    if (res.data?.token && res.data?.user) {
      localStorage.setItem("token", res.data.token);
      const role = res.data.user.username ? "admin" : "user";
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push(role === "admin" ? "/admin" : "/user");
    } else {
      setErrorSignIn("Login gagal. Silakan coba lagi.");
    }
  } catch (err) {
    setErrorSignIn(err.response?.data?.message || "Terjadi kesalahan.");
  } finally {
    setIsSubmittingSignIn(false);
  }
};

export const handleRegister = async ({
  form,
  setSuccessSignUp,
  setErrorSignUp,
  setShowPopup,
  setIsSubmittingSignUp,
  clearForm,
}) => {
  const {
    nama_perusahaan,
    nama_direktur,
    nama_penanggung_jawab,
    alamat_perusahaan,
    email,
    password,
    password_confirmation,
  } = form;

  if (
    !nama_perusahaan ||
    !nama_direktur ||
    !nama_penanggung_jawab ||
    !alamat_perusahaan ||
    !email ||
    !password ||
    !password_confirmation
  ) {
    setErrorSignUp("Semua field harus diisi.");
    return;
  }

  setIsSubmittingSignUp(true);
  try {
    const res = await registerUser({
      nama_perusahaan,
      nama_direktur,
      nama_penanggung_jawab,
      alamat_perusahaan,
      email,
      password,
      password_confirmation,
    });

    if (res.status === 201) {
      setSuccessSignUp("Pendaftaran berhasil! Silakan login.");
      setShowPopup(true);
      setErrorSignUp(null);
      clearForm();
    } else {
      setErrorSignUp("Pendaftaran gagal. Silakan coba lagi.");
    }
  } catch (err) {
    setErrorSignUp(err.response?.data?.message || "Terjadi kesalahan.");
  } finally {
    setIsSubmittingSignUp(false);
  }
};
