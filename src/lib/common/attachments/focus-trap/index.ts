import {on} from 'svelte/events'
const stack: Array<HTMLElement> = []

/**
 * Traps focus within a wrapper element.
 * @param wrapperElement - html element
 * @returns unobserve function
 */
export const focusTrap = (wrapperElement: HTMLElement) => {
  wrapperElement.tabIndex = -1
  wrapperElement.focus()
  stack.push(wrapperElement)

  const unobserve = on(document, 'keydown', (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      // FUTURE: https://github.com/w3c/csswg-drafts/issues/7269, https://github.com/whatwg/html/issues/4784, https://github.com/whatwg/html/issues/7924 - right now there is no reliable and easy way to determine if an element will be focusable. We will need to update our filtering as soon as this is possible.
      const focusableElements = [
        ...wrapperElement.querySelectorAll<HTMLElement>(':not(:disabled, a:not([href]))'),
      ].filter((element) => element.tabIndex >= 0)

      const firstFocusableElement = focusableElements.at(0) ?? wrapperElement
      const lastFocusableElement = focusableElements.at(-1) ?? wrapperElement

      if (
        document.activeElement === (event.shiftKey ? firstFocusableElement : lastFocusableElement) ||
        !stack[stack.length - 1].contains(document.activeElement) ||
        (document.activeElement instanceof HTMLElement &&
          document.activeElement.tabIndex < 0 &&
          ((document.activeElement.compareDocumentPosition(firstFocusableElement) & Node.DOCUMENT_POSITION_FOLLOWING &&
            event.shiftKey) ||
            (document.activeElement.compareDocumentPosition(lastFocusableElement) & Node.DOCUMENT_POSITION_PRECEDING &&
              !event.shiftKey)))
      ) {
        event.preventDefault()

        if (event.shiftKey) {
          lastFocusableElement.focus()
        } else {
          firstFocusableElement.focus()
        }
      }
    }
  })

  return () => {
    unobserve()
    stack.splice(stack.indexOf(wrapperElement), 1)
  }
}
