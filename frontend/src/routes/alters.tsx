import { Alters as AltersComponent } from "@/components/Alters";
import { Layout } from "@/components/Layout";
import { createRoot } from "react-dom/client";
import "../global.css";

const root = document.getElementById("root")!;

function Alters() {
    return (
        <Layout>
            <AltersComponent />
        </Layout>
    );
}

createRoot(root).render(<Alters />);
