import { Fronter } from "@/components/Fronter";
import { Github } from "@/components/Github";
import { Layout } from "@/components/Layout";
import { LifeStats } from "@/components/LifeStats";
import { RecentProject } from "@/components/RecentProject";
import { Widgets } from "@/components/Widgets";
import { createRoot } from "react-dom/client";
import "../global.css";

const root = document.getElementById("root")!;

function Index() {
    return (
        <Layout>
            <div className="side-by-side">
                <Widgets widgets={[<Fronter />, <LifeStats />, <Github />, <RecentProject />]} />
                <div>
                    <p>Hi! We're the Missing Pieces system! We also go by the collective name of Uto. We'll be updating this site with new updates, pages & more as we think of adding more to here. :)</p>
                </div>
            </div>
        </Layout>
    );
}

createRoot(root).render(<Index />);
