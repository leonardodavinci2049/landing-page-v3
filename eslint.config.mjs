import nextConfig from "eslint-config-next";

const eslintConfig = [
	...nextConfig,
	{
		ignores: [
			"node_modules/**",
			".next/**",
			"out/**",
			"build/**",
			"next-env.d.ts",
		],
	},
	{
		files: ["src/app/layout.tsx"],
		rules: {
			"react/no-danger": "off",
			"jsx-a11y/iframe-has-title": "off",
			"@eslint-react/dom/no-dangerously-set-innerhtml": "off",
			"@eslint-react/dom/no-missing-iframe-sandbox": "off",
			"@eslint-react/no-dangerously-set-innerhtml": "off",
			"@eslint-react/no-static-element-interactions": "off",
			"react/jsx-no-literals": "off",
		},
	},
];

export default eslintConfig;
