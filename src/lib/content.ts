export function getSelection(element: HTMLTextAreaElement) {
  const { selectionStart, selectionEnd } = element;
  return {
    selectionStart,
    selectionEnd
  };
}

export function getLineNumbers(element: HTMLTextAreaElement) {
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
