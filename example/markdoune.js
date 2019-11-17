function getSelection(element) {
    const { selectionStart, selectionEnd } = element;
    return {
        selectionStart,
        selectionEnd
    };
}
function getLineNumbers(element) {
    const { selectionStart, selectionEnd } = getSelection(element);
    const value = element.value;
    let lineStart = (value.substring(0, selectionStart).match(/\n/g) || [])
        .length;
    let lineEnd = (value.substring(0, selectionEnd).match(/\n/g) || []).length;
    const lineMax = (value.match(/\n/g) || []).length;
    if (lineEnd < lineStart) {
        const temp = lineStart;
        lineStart = lineEnd;
        lineEnd = temp;
    }
    return { lineStart, lineEnd, lineMax };
}

function wrap(origin, options) {
    const valueAsArray = origin.split("");
    valueAsArray.splice(options.selectionEnd, 0, options.after);
    valueAsArray.splice(options.selectionStart, 0, options.before);
    return valueAsArray.join("");
}
function wrapMulti(origin, options) {
    const valueAsArray = origin.split("");
    const { before, count, lineStart, lineEnd, lineMax } = options;
    let lastIndex = 0;
    let lineCount = 0;
    let itemCount = 0;
    while (lineCount < lineStart) {
        lastIndex = valueAsArray.indexOf("\n", lastIndex) + 1;
        lineCount++;
    }
    for (let i = lineStart; i <= lineEnd; i++) {
        if (i === 0) {
            valueAsArray.splice(0, 0, count ? itemCount + 1 + before : before);
            lastIndex = valueAsArray.indexOf("\n", lastIndex) + 1;
            lineCount++;
            itemCount++;
        }
        else if (i === lineMax) {
            while (lineCount < lineEnd) {
                lastIndex = valueAsArray.indexOf("\n", lastIndex) + 1;
                lineCount++;
            }
            valueAsArray.splice(lastIndex, 0, count ? itemCount + 1 + before : before);
            itemCount++;
        }
        else {
            valueAsArray.splice(lastIndex, 0, count ? itemCount + 1 + before : before);
            lastIndex = valueAsArray.indexOf("\n", lastIndex) + 1;
            lineCount++;
            itemCount++;
        }
    }
    return valueAsArray.join("");
}

const Markdown = {
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
function wrapPrefix(before, options = { count: false }) {
    return function (data, { lineEnd, lineMax, lineStart }) {
        return wrapMulti(data, {
            before,
            lineEnd,
            lineMax,
            lineStart,
            count: options.count
        });
    };
}
function wrapWrap(before, after) {
    return function (data, { selectionStart, selectionEnd }) {
        return wrap(data, {
            before,
            after,
            selectionStart,
            selectionEnd
        });
    };
}

/**
 * markdoune - a textarea pimper
 * by Siegfried Ehret
 * Licensed under the MIT (http://opensource.org/licenses/MIT) license.
 */
const noop = () => { };
function markdoune(selector, config) {
    return new Markdoune(Object.assign({ selector }, config));
}
class Markdoune {
    constructor(config) {
        this.textarea = document.querySelector(config.selector);
        this.onChange = config.onChange || noop;
        return this;
    }
    button(selector, config) {
        const { transform } = config;
        if (!transform) {
            throw new Error(`markdoune needs a transform function for element ${selector}`);
        }
        document.querySelector(selector).addEventListener("click", () => {
            const origin = this.textarea.value;
            this.textarea.value = transform(origin, this.getOptions());
            this.onChange(this.textarea.value, origin);
        });
        return this;
    }
    getOptions() {
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

export default markdoune;
export { Markdown };
