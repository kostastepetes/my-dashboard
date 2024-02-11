// store/index.js
import { createPinia } from 'pinia'
import { useFavoritesStore } from './favorites'
import { useNoteStore } from './notes'


export const pinia = createPinia()

export { useFavoritesStore }
export { useNoteStore }
