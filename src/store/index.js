// store/index.js
import { createPinia } from 'pinia'
import { useFavoritesStore } from './favorites'
import { useNoteStore } from './notes'
import { usePlaylistStore } from './playlist'


export const pinia = createPinia()

export { useFavoritesStore }
export { useNoteStore }
export { usePlaylistStore }
