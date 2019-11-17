interface WrapOptions {
    before: string;
    after: string;
    selectionStart: number;
    selectionEnd: number;
}
export declare function wrap(origin: string, options: WrapOptions): string;
interface WrapMultiOptions {
    before: string;
    count: boolean;
    lineStart: number;
    lineEnd: number;
    lineMax: number;
}
export declare function wrapMulti(origin: string, options: WrapMultiOptions): string;
export {};
