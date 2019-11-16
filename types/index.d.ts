/**
 * markdoune - a textarea pimper
 * by Siegfried Ehret
 * Licensed under the MIT (http://opensource.org/licenses/MIT) license.
 */
interface Button {
    buttonSelector: string;
    before: string;
    after: string;
    multi: boolean;
}
interface Config {
    textareaSelector: string;
    onActionCallback: VoidFunction;
    buttons: Button[];
}
export default function markdoune(selector: string, config: Config): void;
export {};
