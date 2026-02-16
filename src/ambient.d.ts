declare module '*&code' {
  const value: {
    html: string
    language: keyof typeof import('shiki').bundledLanguages
    ranges: Array<Array<{color: string; offset: number[]; content: string}>>
    source: string
  }
  export default value
}

declare module '*&font' {
  const value: {glyphs: string; html: string; src: string}
  export default value
}
