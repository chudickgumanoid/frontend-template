export function getCursorPosition(parent) {
  const selection = document.getSelection();
  const range = new Range();

  range.setStart(parent, 0);
  range.setEnd(selection.anchorNode, selection.anchorOffset);

  return range.toString().length;
}
