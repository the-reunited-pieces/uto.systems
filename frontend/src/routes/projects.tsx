import { Repos as ReposComponent } from "@/components/Repositories";
import { Layout } from "@/components/Layout";
import { createRoot } from "react-dom/client";
import "../global.css";

const root = document.getElementById("root")!;

function Repos() {
    return (
        <Layout>
            <ReposComponent />
        </Layout>
    );
}

createRoot(root).render(<Repos />);
