// src/controllers/controllerProfil.js
import { getProfil, postProfil, updateProfil, deleteProfil } from "./ServiceProfil";

export const fetchProfile = async () => {
  try {
    const profile = await getProfil();
    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const createProfile = async (formData) => {
  try {
    const profile = await postProfil(formData);
    return profile;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};

export const editProfile = async (id, formData) => {
  try {
    const profile = await updateProfil(id, formData);
    return profile;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const removeProfile = async (id) => {
  try {
    const profile = await deleteProfil(id);
    return profile;
  } catch (error) {
    console.error("Error deleting profile:", error);
    throw error;
  }
};
