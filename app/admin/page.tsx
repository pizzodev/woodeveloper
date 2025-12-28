import {ScaffoldComponent} from "@/app/ScaffoldComponent";
import AdminLogin from "@/app/admin/components/AdminLogin";
import {WhoIAmComponent} from "@/app/about/components/WhoIAmComponent";

export default function AdminPage() {
    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen font-sans">
            <ScaffoldComponent
                backgroundVideo={"videos/forest.mp4"}
                body={AdminLogin}
            />
        </div>
    );
}