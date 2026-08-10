import { serve } from "bun";
import index from "./routes/index.html";

const server = serve({
    routes: {
        "/": index,
        "/static/outlined-icon.svg": Bun.file("static/outlined-icon.svg"),
    },
});

console.log(`🚀 Server running at ${server.url}`);
