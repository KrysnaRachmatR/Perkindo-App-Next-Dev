// src/handlers/useProfileHandler.js
"use client";

import { useEffect, useState } from "react";
import { fetchProfileData } from "./profileController"; 

export const useProfileHandler = () => {
  const [profileData, setProfileData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data, error } = await fetchProfileData();
      if (error) setError(error);
      else setProfileData(data);
      setLoading(false);
    };

    loadProfile();
  }, []);

  return { profileData, loading, error };
};
