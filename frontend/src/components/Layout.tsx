import type React from "react";

export function Layout({ children }: React.PropsWithChildren) {
    return (
        <div id="layout">
            <header id="header">
                <img id="header-image" src="/static/outlined-icon.svg" />
                <h1 id="header-left" className="lg-only">
                    Uto
                </h1>
                <div id="header-spacer" className="lg-only"></div>
                <h2 id="header-right">The Missing Pieces</h2><h2 id="header-emojis">🧭🧩</h2>
            </header>
            <main>{children}</main>
            <footer id="footer">
                <a href="/">Home</a>
                <div id="footer-divider"></div>
                <a href="/alters">Alters</a>
                <div id="footer-divider"></div>
                <a href="/projects">Projects</a>
            </footer>
        </div>
    );
}
