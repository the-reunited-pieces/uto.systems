import { Dexcom as DexcomComponent } from "@/components/Dexcom";
import { Layout } from "@/components/Layout";
import { createRoot } from "react-dom/client";
import "../global.css";

const root = document.getElementById("root")!;

function Dexcom() {
    return (
        <Layout>
            <DexcomComponent />
        </Layout>
    );
}

createRoot(root).render(<Dexcom />);
