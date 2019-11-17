import { SelectionOptions } from "../types";
export declare const Markdown: {
    bold: (data: string, { selectionStart, selectionEnd }: SelectionOptions) => string;
    italic: (data: string, { selectionStart, selectionEnd }: SelectionOptions) => string;
    quote: (data: string, { lineEnd, lineMax, lineStart }: SelectionOptions) => string;
    bulletedList: (data: string, { lineEnd, lineMax, lineStart }: SelectionOptions) => string;
    numberedList: (data: string, { lineEnd, lineMax, lineStart }: SelectionOptions) => string;
    link: (data: string, { selectionStart, selectionEnd }: SelectionOptions) => string;
    image: (data: string, { selectionStart, selectionEnd }: SelectionOptions) => string;
    code: (data: string, { selectionStart, selectionEnd }: SelectionOptions) => string;
    inlineCode: (data: string, { selectionStart, selectionEnd }: SelectionOptions) => string;
};
