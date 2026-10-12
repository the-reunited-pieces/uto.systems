import { Layout } from "@/components/Layout";
import { RecentProject } from "@/components/RecentProject";
import { Widgets } from "@/components/Widgets";
import { createRoot } from "react-dom/client";
import "../global.css";

const root = document.getElementById("root")!;

function Projects() {
    return (
        <Layout>
            <div className="side-by-side">
                <Widgets widgets={[<RecentProject />, ]} />
                <div>
                    <p>Hi, I'm Uto.</p>
                </div>
            </div>
        </Layout>
    );
}

createRoot(root).render(<Projects />);
