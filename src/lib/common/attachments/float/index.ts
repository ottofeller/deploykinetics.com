import * as floatingUI from '@floating-ui/dom'
const roundByDPR = (value: number) => Math.round(value * window.devicePixelRatio) / window.devicePixelRatio

export const float =
  ({
    middleware,
    placement,
    targetId,
  }: {
    middleware: Array<floatingUI.Middleware>
    placement: floatingUI.Placement
    targetId: string
  }) =>
  (floatingElement: HTMLElement) => {
    const targetElement = document.querySelector(`#${targetId}`)

    if (!targetElement) {
      throw new Error(`Target element with ID "${targetId}" not found!`)
    }

    const unobserve = floatingUI.autoUpdate(targetElement, floatingElement, async () => {
      // Calculate and update the position of the popup only if the target element is in the current document.
      if (targetElement.isConnected) {
        const {x, y} = await floatingUI.computePosition(targetElement, floatingElement, {
          placement,
          middleware,
          strategy: 'fixed',
        })

        floatingElement.style.setProperty('translate', `${roundByDPR(x)}px ${roundByDPR(y)}px`)
      }
    })

    return unobserve
  }
