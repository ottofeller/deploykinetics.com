const escapingChar = '\\'
const highlightingChar = '*'

const getRanges = (description: string) => {
  let skipped = 0
  let isHighlighted = false
  let start = 0
  const ranges: Array<{start: number; end: number}> = []

  for (let charIndex = 0; charIndex < description.length; charIndex++) {
    const char = description[charIndex]

    if (char === highlightingChar && (charIndex === 0 || description[charIndex - 1] !== escapingChar)) {
      const end = skipped

      if (isHighlighted) {
        ranges.push({start, end})
        isHighlighted = false
      } else {
        start = end
        isHighlighted = true
      }
    } else if (char === escapingChar && description[charIndex + 1] === highlightingChar) {
      skipped++
      charIndex++
    } else {
      skipped++
    }
  }

  return ranges
}

export const getCleanedString = (description: string) => {
  const cleanedParts: string[] = []

  for (let charIndex = 0; charIndex < description.length; charIndex++) {
    const char = description[charIndex]

    if (char === escapingChar && description[charIndex + 1] === highlightingChar) {
      cleanedParts.push(highlightingChar)
      charIndex++
    } else if (char !== highlightingChar || description[charIndex - 1] === escapingChar) {
      cleanedParts.push(char)
    }
  }

  return cleanedParts.join('')
}

export const highlight = (description: string) => (element: HTMLElement) => {
  // FUTURE: https://developer.mozilla.org/en-US/docs/Web/API/CSS/highlights_static - the `CSS.highlights` check is needed for Firefox, as it does not yet support this interface.
  if (CSS.highlights) {
    const cssHighlightId = '--highlight'

    if (!CSS.highlights.get(cssHighlightId)) {
      CSS.highlights.set(cssHighlightId, new Highlight())
    }

    const firstChildOfElement = element.firstChild

    if (!(firstChildOfElement instanceof Text)) {
      throw new Error()
    }

    const tokens = getRanges(description).map((token) => {
      const rangeInstance = new Range()
      rangeInstance.setStart(firstChildOfElement, token.start)
      rangeInstance.setEnd(firstChildOfElement, token.end)
      return {range: rangeInstance}
    })

    tokens.forEach((token) => {
      CSS.highlights.get(cssHighlightId)?.add(token.range)
    })

    return () => {
      tokens.forEach((token) => {
        const cssHighlight = CSS.highlights.get(cssHighlightId)

        if (cssHighlight?.size === 1) {
          CSS.highlights.delete(cssHighlightId)
        } else {
          cssHighlight?.delete(token.range)
        }
      })
    }
  }
}
