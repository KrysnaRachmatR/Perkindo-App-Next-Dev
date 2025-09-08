"use client";
import { useState } from "react";
import { fetchProfile, createProfile, editProfile, removeProfile } from "./ControllerProfil";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    section1: "",
    visi: "",
    misi: [""],
    image: null,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const response = await fetchProfile();
      if (response.success) {
        setProfile(response.data);
        setFormData({
          title: response.data.title || "",
          section1: response.data.section1 || "",
          visi: response.data.visi || "",
          misi: response.data.misi || [""],
          image: null,
        });
      }
    } catch (err) {
      console.error("Error loadProfile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("section1", formData.section1);
      form.append("visi", formData.visi);
      formData.misi.forEach((misi, i) => {
        form.append(`misi[${i}]`, misi);
      });
      if (formData.image) form.append("header_image", formData.image);

      let response;
      if (profile?.id) {
        response = await editProfile(profile.id, form);
      } else {
        response = await createProfile(form);
      }

      if (response.success) {
        setMessage("Profil berhasil disimpan!");
        setProfile(response.data);
      }
    } catch (err) {
      console.error("Error submit profil:", err);
      setMessage("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    formData,
    setFormData,
    message,
    loading,
    loadProfile,
    handleSubmit,
    removeProfile, // optional, kalau mau dipakai di view
  };
}
