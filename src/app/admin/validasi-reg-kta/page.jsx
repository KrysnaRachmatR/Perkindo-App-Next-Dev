import DefaultLayout from "@/components/templates/DefaultAdminTemplate";
// import ValidasiSBUS from "@/components/organisms/admin/validasi-reg-konstruksi/validasiKonstruksi";
import ValidasiKTA from "@/components/organisms/Admin/ValidasiRegKta/ValidasiKta";

const AdminValidasiKTAPage = () => {
    return(
        <DefaultLayout>
            <ValidasiKTA />
        </DefaultLayout>
    );
}

export default AdminValidasiKTAPage;
