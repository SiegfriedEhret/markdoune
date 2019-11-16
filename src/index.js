"use strict";
/**
 * markdoune - a textarea pimper
 * by Siegfried Ehret
 * Licensed under the MIT (http://opensource.org/licenses/MIT) license.
 */
exports.__esModule = true;
function markdoune(selector, config) {
    Array.prototype.concat
        .apply([], document.querySelectorAll(selector))
        .forEach(function (container) {
        var textarea = container.querySelector(config.textareaSelector);
        if (!config.onActionCallback) {
            config.onActionCallback = function () { };
        }
        for (var i = 0; i < config.buttons.length; i++) {
            configureButton(container, textarea, config.buttons[i], config.onActionCallback);
        }
    });
}
exports["default"] = markdoune;
function getSelection(element) {
    var selectionStart = element.selectionStart, selectionEnd = element.selectionEnd;
    return {
        start: selectionStart,
        end: selectionEnd
    };
}
function getLineNumbers(element) {
    var _a = getSelection(element), start = _a.start, end = _a.end;
    var value = element.value;
    var startLine = (value.substring(0, start).match(/\n/g) || []).length;
    var endLine = (value.substring(0, end).match(/\n/g) || []).length;
    var maxLine = (value.match(/\n/g) || []).length;
    return { startLine: startLine, endLine: endLine, maxLine: maxLine };
}
function setWrap(element, before, after) {
    var _a = getSelection(element), start = _a.start, end = _a.end;
    var valueAsArray = element.value.split("");
    valueAsArray.splice(end, 0, after);
    valueAsArray.splice(start, 0, before);
    element.value = valueAsArray.join("");
}
function setMultiWrap(element, options) {
    var valueAsArray = element.value.split("");
    var _a = getLineNumbers(element), startLine = _a.startLine, endLine = _a.endLine, maxLine = _a.maxLine;
    if (endLine < startLine) {
        var temp = startLine;
        startLine = endLine;
        endLine = temp;
    }
    var lastIndex = 0;
    var lineCount = 0;
    var itemCount = 0;
    while (lineCount < startLine) {
        lastIndex = valueAsArray.indexOf("\n", lastIndex) + 1;
        lineCount++;
    }
    for (var i = startLine; i <= endLine; i++) {
        if (i === 0) {
            valueAsArray.splice(0, 0, options.count ? itemCount + 1 + options.before : options.before);
            lastIndex = valueAsArray.indexOf("\n", lastIndex) + 1;
            lineCount++;
            itemCount++;
        }
        else if (i === maxLine) {
            while (lineCount < endLine) {
                lastIndex = valueAsArray.indexOf("\n", lastIndex) + 1;
                lineCount++;
            }
            valueAsArray.splice(lastIndex, 0, options.count ? itemCount + 1 + options.before : options.before);
            itemCount++;
        }
        else {
            valueAsArray.splice(lastIndex, 0, options.count ? itemCount + 1 + options.before : options.before);
            lastIndex = valueAsArray.indexOf("\n", lastIndex) + 1;
            lineCount++;
            itemCount++;
        }
    }
    element.value = valueAsArray.join("");
}
// https://stackoverflow.com/questions/4386300/javascript-dom-how-to-remove-all-events-of-a-dom-object
function removeHandlers(element) {
    var clone = element.cloneNode();
    while (element.firstChild) {
        clone.appendChild(element.lastChild);
    }
    element.parentNode.replaceChild(clone, element);
}
function configureButton(container, textarea, config, onActionCallback) {
    var button = container.querySelector(config.buttonSelector);
    removeHandlers(button);
    // We need to get the new button
    button = container.querySelector(config.buttonSelector);
    button.addEventListener("click", function () {
        if (config.multi) {
            setMultiWrap(textarea, {
                before: config.before,
                count: config.count
            });
        }
        else {
            setWrap(textarea, config.before, config.after);
        }
        if (onActionCallback) {
            onActionCallback();
        }
    });
}
