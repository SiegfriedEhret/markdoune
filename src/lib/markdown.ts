import { SelectionOptions } from "../types";
import { wrap, wrapMulti } from "./transform";

export const Markdown = {
  bold: wrapWrap("**", "**"),
  italic: wrapWrap("*", "*"),
  quote: wrapPrefix("> "),
  bulletedList: wrapPrefix("- "),
  numberedList: wrapPrefix(". ", { count: true }),
  link: wrapWrap("[", "]()"),
  image: wrapWrap("![", "]()"),
  code: wrapWrap("\n```\n", "\n```\n"),
  inlineCode: wrapWrap("`", "`")
};

function wrapPrefix(before: string, options = { count: false }) {
  return function(
    data: string,
    { lineEnd, lineMax, lineStart }: SelectionOptions
  ) {
    return wrapMulti(data, {
      before,
      lineEnd,
      lineMax,
      lineStart,
      count: options.count
    });
  };
}

function wrapWrap(before: string, after: string) {
  return function(
    data: string,
    { selectionStart, selectionEnd }: SelectionOptions
  ) {
    return wrap(data, {
      before,
      after,
      selectionStart,
      selectionEnd
    });
  };
}
