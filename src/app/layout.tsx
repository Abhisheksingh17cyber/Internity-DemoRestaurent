import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Caveat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400"],
    style: ["normal", "italic"],
    variable: "--font-cormorant",
});

const jost = Jost({
    subsets: ["latin"],
    weight: ["300", "400", "500"],
    variable: "--font-jost",
});

const caveat = Caveat({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-caveat",
});

export const metadata: Metadata = {
    title: "Internity Restaurant",
    description: "A premium dining experience.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${cormorant.variable} ${jost.variable} ${caveat.variable}`}>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
