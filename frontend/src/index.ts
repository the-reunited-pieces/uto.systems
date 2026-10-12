import { serve } from "bun";
import index from "./routes/index.html";
import alters from "./routes/alters.html";
import projects from "./routes/projects.html";

const server = serve({
    routes: {
        "/": index,
        "/static/outlined-icon.svg": Bun.file("static/outlined-icon.svg"),
        "/alters": alters,
        "/projects": projects,
    },
});

console.log(`🚀 Server running at ${server.url}`);
