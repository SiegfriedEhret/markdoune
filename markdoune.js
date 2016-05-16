/**
 * markdoune - a textarea pimper
 * by Siegfried Ehret
 * Licensed under the MIT (http://opensource.org/licenses/MIT) license.
 */

{
  function getSelection(element) {
    const {selectionStart, selectionEnd} = element;
    return {
      start: selectionStart,
      end: selectionEnd
    };
  }

  function getLineNumbers(element) {
    const {start, end} = getSelection(element);
    const value = element.value;
    const startLine = (value.substring(0, start).match(/\n/g) || []).length;
    const endLine = (value.substring(0, end).match(/\n/g) || []).length;
    const maxLine = (value.match(/\n/g) || []).length;
    return {startLine, endLine, maxLine};
  }

  function setWrap(element, before, after) {
    var {start, end} = getSelection(element);
    var valueAsArray = element.value.split('');
    valueAsArray.splice(end, 0, after);
    valueAsArray.splice(start, 0, before);
    element.value = valueAsArray.join('');
  }

  function setMultiWrap(element, options) {
    var valueAsArray = element.value.split('');
    var {startLine, endLine, maxLine} = getLineNumbers(element);

    if (endLine < startLine) {
      var temp = startLine;
      startLine = endLine;
      endLine = temp;
    }

    var lastIndex = 0;
    var lineCount = 0;
    var itemCount = 0;

    while (lineCount < startLine) {
      lastIndex = valueAsArray.indexOf('\n', lastIndex) + 1;
      lineCount++;
    }

    for (var i = startLine; i <= endLine; i++) {
      if (i === 0) {
        valueAsArray.splice(0, 0, options.count ? (itemCount + 1) + options.before : options.before);
        lastIndex = valueAsArray.indexOf('\n', lastIndex) + 1;
        lineCount++;
        itemCount++;
      } else if (i === maxLine) {
        while (lineCount < endLine) {
          lastIndex = valueAsArray.indexOf('\n', lastIndex) + 1;
          lineCount++;
        }
        valueAsArray.splice(lastIndex, 0, options.count ? (itemCount + 1) + options.before : options.before);
        itemCount++;
      } else {
        valueAsArray.splice(lastIndex, 0, options.count ? (itemCount + 1) + options.before : options.before);
        lastIndex = valueAsArray.indexOf('\n', lastIndex) + 1;
        lineCount++;
        itemCount++;
      }
    }

    element.value = valueAsArray.join('');
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
    let button = container.querySelector(config.buttonSelector);
    removeHandlers(button);

    // We need to get the new button
    button = container.querySelector(config.buttonSelector);

    button.addEventListener('click', function() {
      if (config.multi) {
        setMultiWrap(textarea, {
          before: config.before,
          count: config.count
        });
      } else {
        setWrap(textarea, config.before, config.after);
      }
      if (onActionCallback) {
        onActionCallback();
      }
    });
  }

  window.markdoune = function(selector, config) {
    Array.prototype.concat.apply([], document.querySelectorAll(selector)).forEach(container => {
      var textarea = container.querySelector(config.textareaSelector);

      if (!config.onActionCallback) {
        config.onActionCallback = function() {};
      }

      for (var i = 0; i < config.buttons.length; i++) {
        configureButton(container, textarea, config.buttons[i], config.onActionCallback);
      }
    });
  };
}
