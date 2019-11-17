/**
 * markdoune - a textarea pimper
 * by Siegfried Ehret
 * Licensed under the MIT (http://opensource.org/licenses/MIT) license.
 */
import { ButtonConfig, Config, SelectionOptions } from "./types";
export * from "./lib/markdown";
export default function markdoune(selector: string, config: Config): Markdoune;
declare class Markdoune {
    textarea: HTMLTextAreaElement;
    onChange: (newValue: string, oldValue: any) => void;
    constructor(config: Config);
    button(selector: string, config: ButtonConfig): this;
    getOptions(): SelectionOptions;
}
