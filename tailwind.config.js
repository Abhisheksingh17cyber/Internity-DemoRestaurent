/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                cormorant: ["var(--font-cormorant)", "serif"],
                jost: ["var(--font-jost)", "sans-serif"],
                caveat: ["var(--font-caveat)", "cursive"],
            },
        },
    },
    plugins: [],
}
