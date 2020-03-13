/**
 * Gets the index of the element in the DOM list element of the direct parent.
 * @param element
 */
export function domIndex(element: HTMLElement): number {
  return Array.from(element.parentNode.children).indexOf(element);
}
