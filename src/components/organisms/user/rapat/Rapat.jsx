import React, { useState } from "react";
import { useRapatHandler } from "./rapatHandler";
import NotulensiView from "./notulenRapat";
import RapatTab0 from "./rapatTab0"
import RapatTab1 from "./rapatTab1";
import RapatTab3 from "./rapatTab3";

const UndanganMasukView = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const {
    user,
    loadingRapat,
  } = useRapatHandler();

  // 🔄 Loading
  if (loadingRapat) return <p>Memuat data...</p>;

  return (
    <div className="p-6 space-y-8">
      {/* Tabs */}
      <div className="flex mb-4 space-x-4">
      
        <button
          onClick={() => setActiveTab(0)}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 0 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
          }`}
        >
          Approval Rapat
        </button>

        <button
          onClick={() => setActiveTab(1)}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 1 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
          }`}
        >
          Draft Rapat Finalisasi
        </button>

        {Boolean(user?.is_pengurus) && user?.jabatan?.toLowerCase() === "ketua_sekretaris" && (
          <button
            onClick={() => setActiveTab(2)}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === 2 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
            }`}
          >
            Notulen Rapat
          </button>
        )}

        <button
          onClick={() => setActiveTab(3)}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 3 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
          }`}
        >
          Draft Rapat Selesai
        </button>
      </div>

      {/* Tab 0 */}
      {activeTab === 0 && (
          <RapatTab0/>
      )}

      {/* Tab 1 */}
      {activeTab === 1 && (
      <RapatTab1/>
      )}

      {/* Tab 2 */}
      {activeTab === 2 && (
      <div>
        <NotulensiView />
      </div>
      )}

      {activeTab === 3 && (
      <RapatTab3/>
      )}
      </div>
  );
};

export default UndanganMasukView;