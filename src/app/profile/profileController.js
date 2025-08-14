// src/controllers/profileController.js
// import { getProfile } from "@/services/profileService";
import { getProfile } from "./profileService"; // Adjust the import path as necessary

export const fetchProfileData = async () => {
  try {
    const data = await getProfile();
    return { data };
  } catch (error) {
    return { error: "Terjadi kesalahan saat memuat data profil." };
  }
};
