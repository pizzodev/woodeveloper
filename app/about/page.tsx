import {ScaffoldComponent} from "@/app/ScaffoldComponent";
import {WhoIAmComponent} from "@/app/about/components/WhoIAmComponent";

export default function AboutPage() {
    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen font-sans">
            <ScaffoldComponent backgroundVideo={"/videos/forest.mp4"}>
                <WhoIAmComponent/>
            </ScaffoldComponent>
        </div>
    );
}