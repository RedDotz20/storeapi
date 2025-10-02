import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				console: "readonly",
				process: "readonly",
				Buffer: "readonly",
				__dirname: "readonly",
				__filename: "readonly",
				global: "readonly",
				window: "readonly",
				document: "readonly",
				navigator: "readonly",
				localStorage: "readonly",
				sessionStorage: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": typescript,
			react,
			"react-hooks": reactHooks,
			prettier,
		},
		rules: {
			// Basic JavaScript/TypeScript rules
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_" },
			],
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-explicit-any": "warn",

			// React specific
			"react/react-in-jsx-scope": "off", // Not needed with React 17+
			"react/prop-types": "off", // Using TypeScript for prop validation

			// React Hooks
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",

			// Prettier integration
			"prettier/prettier": "error",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	{
		ignores: [
			"node_modules/**",
			"dist/**",
			"build/**",
			"*.config.js",
			"src/routeTree.gen.ts",
			"public/**",
		],
	},
];
