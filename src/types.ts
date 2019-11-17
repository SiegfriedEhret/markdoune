export interface ButtonConfig {
	selector: string;

	before: string;
	after?: string;

	multi?: boolean;
	count?: boolean;

	transform?: (data: string, options: SelectionOptions) => string;
}

export interface Config {
	selector: string;
	onChange: VoidFunction;
}

export interface SelectionOptions {
	lineStart: number;
	lineEnd: number;
	lineMax: number;
	selectionStart: number;
	selectionEnd: number;
}
