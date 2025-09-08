import DefaultLayout from "@/components/templates/DefaultAdminTemplate";
import BeritaPage from "@/components/organisms/Admin/Berita/Berita";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

const AdminBeritaPage = () => {
    return(
        <DefaultLayout>
            <BeritaPage />
        </DefaultLayout>
    );
}

export default AdminBeritaPage;
