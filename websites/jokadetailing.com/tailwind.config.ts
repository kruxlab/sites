import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	darkMode: "selector",
	theme: {
		extend: {
			animation: {
				"caret-blink": "caret-blink 1.25s ease-out infinite",
			},
			colors: {
				red: '#ff3131',
				brown: '#303030',
				yellow: '#ffbe5a'
			},
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
			},
			keyframes: {
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
				},
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
} satisfies Config;
