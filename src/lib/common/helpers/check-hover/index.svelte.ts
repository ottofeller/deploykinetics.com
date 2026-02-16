import {MediaQuery} from 'svelte/reactivity'
const mediaQueryHasHoverInstance = new MediaQuery('(hover: hover) and (pointer: fine)')
export const checkHover = () => mediaQueryHasHoverInstance.current
