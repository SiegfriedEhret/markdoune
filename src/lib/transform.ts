interface WrapOptions {
  before: string;
  after: string;
  selectionStart: number;
  selectionEnd: number;
}

export function wrap(origin: string, options: WrapOptions) {
  const valueAsArray = origin.split("");
  valueAsArray.splice(options.selectionEnd, 0, options.after);
  valueAsArray.splice(options.selectionStart, 0, options.before);
  return valueAsArray.join("");
}

interface WrapMultiOptions {
  before: string;
  count: boolean;
  lineStart: number;
  lineEnd: number;
  lineMax: number;
}

export function wrapMulti(origin: string, options: WrapMultiOptions) {
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
    } else if (i === lineMax) {
      while (lineCount < lineEnd) {
        lastIndex = valueAsArray.indexOf("\n", lastIndex) + 1;
        lineCount++;
      }
      valueAsArray.splice(
        lastIndex,
        0,
        count ? itemCount + 1 + before : before
      );
      itemCount++;
    } else {
      valueAsArray.splice(
        lastIndex,
        0,
        count ? itemCount + 1 + before : before
      );
      lastIndex = valueAsArray.indexOf("\n", lastIndex) + 1;
      lineCount++;
      itemCount++;
    }
  }

  return valueAsArray.join("");
}
