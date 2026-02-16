const stack: Array<HTMLElement> = []

/**
 * Blocks scrolling of the document.
 * @param wrapperElement - html element
 * @returns unobserve function
 */
export const scrollLock = (wrapperElement: HTMLElement) => {
  stack.push(wrapperElement)
  document.documentElement.classList.toggle('scroll-lock', Boolean(stack.length))

  return () => {
    stack.splice(stack.indexOf(wrapperElement), 1)
    document.documentElement.classList.toggle('scroll-lock', Boolean(stack.length))
  }
}
