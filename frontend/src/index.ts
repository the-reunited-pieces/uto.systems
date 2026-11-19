import { serve } from "bun";
import alters from "./routes/alters.html";
import dexcom from "./routes/dexcom.html";
import index from "./routes/index.html";
import projects from "./routes/projects.html";

const server = serve({
    routes: {
        "/": index,
        "/static/outlined-icon.svg": Bun.file("static/outlined-icon.svg"),
        "/static/outlined-icon.png": Bun.file("static/outlined-icon.png"),
        "/alters": alters,
        "/projects": projects,
        "/dexcom": dexcom,
        "/uptime": Response.redirect("https://uptime.uto.systems/status/all"),
    },
});

console.log(`🚀 Server running at ${server.url}`);
