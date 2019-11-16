import typescript from "rollup-plugin-typescript";

export default {
	input: "./src/index.ts",
	output: {
		file: "markdoune.js",
		format: "esm"
	},
	plugins: [typescript()]
};
