export const viewport =
  ({
    onIntersect,
    root,
    rootMargin,
    threshold,
  }: {
    onIntersect: (entry: IntersectionObserverEntry) => void
    root?: IntersectionObserverInit['root']
    rootMargin?: IntersectionObserverInit['rootMargin']
    threshold?: IntersectionObserverInit['threshold']
  }) =>
  (element: HTMLElement) => {
    const intersectionObserver = new IntersectionObserver(([entry]) => onIntersect(entry), {
      root,
      rootMargin,
      threshold,
    })

    intersectionObserver.observe(element)
    return intersectionObserver.disconnect.bind(intersectionObserver)
  }
