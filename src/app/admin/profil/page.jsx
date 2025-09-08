import DefaultLayout from "@/components/templates/DefaultAdminTemplate";
import ProfilePage from "@/components/organisms/Admin/Profil/Profil";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

const AdminProfilePage = () => {
    return(
        <DefaultLayout>
            <ProfilePage />
        </DefaultLayout>
    );
}

export default AdminProfilePage;
