import {on} from 'svelte/events'
import {browser} from '$app/environment'

const stack: Array<{
  callback: VoidFunction
  focusableElementAfterClosing: HTMLElement
  popupElement: HTMLElement
}> = []

let previousFocusedElement: HTMLElement

if (browser) {
  on(document, 'focusin', (event) => {
    if (event.target instanceof HTMLElement) {
      previousFocusedElement = event.target
    }
  })

  on(document, 'keydown', (event) => {
    if (event.key === 'Escape' && !document.querySelector(':is(:open, :popover-open)')) {
      const lastStackItem = stack.at(-1)

      if (lastStackItem) {
        lastStackItem.callback()
        lastStackItem.focusableElementAfterClosing.focus()
      }
    }
  })
}

export const closeByEscape = (callback: VoidFunction) => (popupElement: HTMLElement) => {
  stack.push({callback, focusableElementAfterClosing: previousFocusedElement, popupElement})

  return () => {
    const destroyedItemIndex = stack.findIndex((item) => item.popupElement === popupElement)

    if (destroyedItemIndex > -1) {
      const nextAfterDestroyedItem = stack[destroyedItemIndex + 1]

      // If the destroyed item was not the last item on the stack.
      if (nextAfterDestroyedItem) {
        nextAfterDestroyedItem.focusableElementAfterClosing = stack[destroyedItemIndex].focusableElementAfterClosing
      }
    }

    stack.splice(destroyedItemIndex, 1)
  }
}
