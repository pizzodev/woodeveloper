import {ScaffoldComponent} from "@/app/ScaffoldComponent";
import AdminLogin from "@/app/admin/login/components/AdminLogin";
import {AdminAddProductComponent} from "@/app/admin/add/components/AdminAddProductComponent";

export default function AdminAddProductPage() {
    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen font-sans">
            <ScaffoldComponent backgroundVideo={"videos/forest.mp4"}>
                <AdminLogin/>
            </ScaffoldComponent>
        </div>
    );
}