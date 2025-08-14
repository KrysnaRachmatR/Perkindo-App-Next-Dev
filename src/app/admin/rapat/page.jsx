import DefaultLayout from "@/components/templates/defaultAdminTemplate";
// import { Rapat } from "@/components/organisms/admin/rapat/rapat";
import Rapat from "@/components/organisms/admin/rapat/rapat";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

const AdminRapatPage = () => {
    return(
        <DefaultLayout>
            <Rapat />
        </DefaultLayout>
    );
}

export default AdminRapatPage;
