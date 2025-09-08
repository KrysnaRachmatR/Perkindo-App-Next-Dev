import { fetchPendingKTAs, fetchActiveKTAs } from "./KtaService";

export const getPendingKTAs = async (setKtas, setError, setLoading) => {
  setLoading(true);
  setError(null);
  try {
    const data = await fetchPendingKTAs();
    setKtas(data);
  } catch (err) {
    setError("Terjadi kesalahan saat mengambil data KTA pending.");
  } finally {
    setLoading(false);
  }
};

export const getActiveKTAs = async (setActiveKTAs, setError, setLoading) => {
  setLoading(true);
  setError(null);
  try {
    const data = await fetchActiveKTAs();
    setActiveKTAs(data);
  } catch (err) {
    setError("Terjadi kesalahan saat mengambil data KTA aktif.");
  } finally {
    setLoading(false);
  }
};
