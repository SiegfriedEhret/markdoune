/**
 * markdoune - a textarea pimper
 * by Siegfried Ehret
 * Licensed under the MIT (http://opensource.org/licenses/MIT) license.
 */

import { ButtonConfig, Config, SelectionOptions } from "./types";
import { getLineNumbers, getSelection } from "./lib/content";

export * from "./lib/markdown";

const noop = () => {};

export default function markdoune(selector: string, config: Config) {
  return new Markdoune({ selector, ...config });
}

class Markdoune {
  textarea: HTMLTextAreaElement;
  onChange: (newValue: string, oldValue) => void;

  constructor(config: Config) {
    this.textarea = document.querySelector(config.selector);
    this.onChange = config.onChange || noop;

    return this;
  }

  button(selector: string, config: ButtonConfig) {
    const { transform } = config;

    if (!transform) {
      throw new Error(
        `markdoune needs a transform function for element ${selector}`
      );
    }

    document.querySelector(selector).addEventListener("click", () => {
      const origin = this.textarea.value;
      this.textarea.value = transform(origin, this.getOptions());
      this.onChange(this.textarea.value, origin);
    });

    return this;
  }

  getOptions(): SelectionOptions {
    const { selectionStart, selectionEnd } = getSelection(this.textarea);
    const { lineStart, lineEnd, lineMax } = getLineNumbers(this.textarea);
    return {
      selectionStart,
      selectionEnd,
      lineStart,
      lineEnd,
      lineMax
    };
  }
}
