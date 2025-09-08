import { 
    fetchSbUsActive, 
    fetchSbUsPending,
    updateSbuStatus,
    downloadSbu, 
} from "./SbusService";

export const getPendingSbus = async () => {
  try {
    const res = await fetchSbUsPending();
    return res.data.data || [];
  } catch (err) {
    throw err.response?.data?.message || "Gagal memuat data pending";
  }
};

export const getActiveSbus = async () => {
  try {
    const res = await fetchSbUsActive();
    return res.data.data || [];
  } catch (err) {
    throw err.response?.data?.message || "Gagal memuat data aktif";
  }
};

export const approveSbu = async (id) => {
  return updateSbuStatus(id, { status_diterima: "approve" });
};

export const rejectSbu = async (id, komentar) => {
  return updateSbuStatus(id, { status_diterima: "rejected", komentar });
};

export const downloadSbuFile = async (registrationId) => {
  return downloadSbu(registrationId);
};
