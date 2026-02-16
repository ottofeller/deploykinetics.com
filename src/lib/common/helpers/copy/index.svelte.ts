export class Copy {
  #text: string
  #isCopied = $state(false)
  #timerId: null | ReturnType<typeof setTimeout> = null

  constructor(text: string) {
    this.#text = text
  }

  get message() {
    return this.#isCopied ? 'Copied' : 'Copy'
  }

  get isCopied() {
    return this.#isCopied
  }

  clearTimer = () => {
    if (this.#timerId) {
      clearTimeout(this.#timerId)
    }

    this.#isCopied = false
  }

  copy = async () => {
    this.clearTimer()
    await navigator.clipboard.writeText(this.#text)
    this.#isCopied = true
    this.#timerId = setTimeout(() => (this.#isCopied = false), 3000)
  }
}
