import { serve } from "bun";
import index from "./routes/index.html";

const server = serve({
    routes: {
        // Serve index.html for all unmatched routes.
        "/": index,
    },
});

console.log(`🚀 Server running at ${server.url}`);
