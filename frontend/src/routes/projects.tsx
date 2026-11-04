import { Layout } from "@/components/Layout";
import { Repositories } from "@/components/repositories";
import { Widgets } from "@/components/Widgets";
import { createRoot } from "react-dom/client";
import "../global.css";

const root = document.getElementById("root")!;

function Projects() {
    return (
        <Layout>
                <Widgets widgets={[<Repositories />, ]} />
        </Layout>
    );
}

createRoot(root).render(<Projects />);
