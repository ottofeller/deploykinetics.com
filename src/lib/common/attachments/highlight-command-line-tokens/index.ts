export const tokenizeCommand = (input: string) => {
  const tokens = []
  let i = 0
  let expectCommand = true
  const isSpace = (char: string) => /\s/.test(char)

  loop: while (i < input.length) {
    const start = i
    const c = input[i]

    if (isSpace(c)) {
      while (i < input.length && isSpace(input[i])) {
        i++
      }

      tokens.push({type: 'space', start, end: i})
      continue
    }

    for (const op of ['&&', '||', '|']) {
      if (input.startsWith(op, i)) {
        tokens.push({type: 'operator', start: i, end: i + op.length})
        i += op.length
        expectCommand = true
        continue loop
      }
    }

    if (c === '"' || c === "'") {
      const quote = c
      i++

      while (i < input.length && input[i] !== quote) {
        if (input[i] === '\\' && i + 1 < input.length) {
          i += 2
        } else {
          i++
        }
      }

      tokens.push({type: 'string', start, end: i + 1})
      i++
      expectCommand = false
      continue
    }

    const wordStart = i

    while (
      i < input.length &&
      !isSpace(input[i]) &&
      !['|'].includes(input[i]) &&
      !input.startsWith('&&', i) &&
      !input.startsWith('||', i)
    ) {
      i++
    }

    const word = input.slice(wordStart, i)

    if (word.startsWith('-')) {
      tokens.push({type: 'flag', start: wordStart, end: i})
    } else if (expectCommand) {
      tokens.push({type: 'command', start: wordStart, end: i})
      expectCommand = false
    } else {
      tokens.push({type: 'argument', start: wordStart, end: i})
    }
  }

  return tokens
}

const getCSSHighlightId = (id: string) => `--command-line-token-${id}`

export const highlightCommandLineTokens = (element: HTMLElement) => {
  // FUTURE: https://developer.mozilla.org/en-US/docs/Web/API/CSS/highlights_static - the `CSS.highlights` check is needed for Firefox, as it does not yet support this interface.
  if (CSS.highlights) {
    const types = ['command', 'argument', 'flag', 'operator', 'string']

    types.forEach((type) => {
      if (!CSS.highlights.get(getCSSHighlightId(type))) {
        CSS.highlights.set(getCSSHighlightId(type), new Highlight())
      }
    })

    const firstChildOfElement = element.firstChild

    if (!(firstChildOfElement instanceof Text)) {
      throw new Error()
    }

    const tokens = tokenizeCommand(firstChildOfElement.textContent).map((token) => {
      const rangeInstance = new Range()
      rangeInstance.setStart(firstChildOfElement, token.start)
      rangeInstance.setEnd(firstChildOfElement, token.end)
      return {range: rangeInstance, type: token.type}
    })

    tokens.forEach((token) => {
      CSS.highlights.get(getCSSHighlightId(token.type))?.add(token.range)
    })

    return () => {
      tokens.forEach((token) => {
        const cssHighlight = CSS.highlights.get(getCSSHighlightId(token.type))

        if (cssHighlight?.size === 1) {
          CSS.highlights.delete(getCSSHighlightId(token.type))
        } else {
          cssHighlight?.delete(token.range)
        }
      })
    }
  }
}
