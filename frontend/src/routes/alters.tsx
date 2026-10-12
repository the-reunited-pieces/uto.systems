import { Fronter } from "@/components/Fronter";
import { Layout } from "@/components/Layout";
import { Widgets } from "@/components/Widgets";
import { createRoot } from "react-dom/client";
import "../global.css";

const root = document.getElementById("root")!;

function Alters() {
    return (
        <Layout>
            <div className="side-by-side">
                <Widgets widgets={[<Fronter />, ]} />
                <div>
                    <p>Alters</p>
                </div>
            </div>
        </Layout>
    );
}

createRoot(root).render(<Alters />);
