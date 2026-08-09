import type React from "react";

export function Layout({ children }: React.PropsWithChildren) {
    return (
        <>
            <div id="header">
                <h1 id="header-left" className="lg-only">
                    Uto
                </h1>
                <div id="header-spacer" className="lg-only"></div>
                <h2 id="header-right">The Missing Pieces</h2>
            </div>
            {children}
            <div id="footer">
                <a href="/alters">Alters</a>
                <div id="footer-divider"></div>
                <a href="/test">Test</a>
            </div>
        </>
    );
}
