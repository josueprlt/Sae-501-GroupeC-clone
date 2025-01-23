import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		fontFamily: {
			agbalumo: ['var(--font-agbalumo)'],
			raleway: ['var(--font-raleway)'],
			inter: ['var(--font-inter)'],
		},
  		colors: {
  			background: 'hsl(var(--background)/<alpha-value>)',
  			foreground: 'hsl(var(--foreground)/<alpha-value>)',

  			card: {
  				DEFAULT: 'hsl(var(--card)/<alpha-value>)',
  				foreground: 'hsl(var(--card-foreground)/<alpha-value>)'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary)/<alpha-value>)',
  				foreground: 'hsl(var(--primary-foreground)/<alpha-value>)'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary)/<alpha-value>)',
  				foreground: 'hsl(var(--secondary-foreground)/<alpha-value>)'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent)/<alpha-value>)',
  				foreground: 'hsl(var(--accent-foreground)/<alpha-value>)'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive)/<alpha-value>)',
  				foreground: 'hsl(var(--destructive-foreground)/<alpha-value>)'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
			  gradients: {
				'primary': 'var(--gradient-primary)',
				'secondary': 'var(--gradient-secondary)',
			}
  		},
		fontSize: {
			'3xs': '0.5rem',
			'2xs': '0.625rem',
		},
		gridTemplateColumns: {
			'auto-1fr': 'auto 1fr',
		}
  	}
  },
  plugins: [],
};
export default config;
