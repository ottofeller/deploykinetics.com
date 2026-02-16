import {browser} from '$app/environment'
let isPageLoaded = $state(false)

if (browser) {
  ;(async () => {
    await document.fonts.ready

    // The `window.finishStartingAnimation` is located at `src/app.html`.
    if ('finishStartingAnimation' in window && typeof window.finishStartingAnimation === 'function') {
      await window.finishStartingAnimation()
    }

    isPageLoaded = true
  })()
}

export const checkPageLoaded = () => isPageLoaded
