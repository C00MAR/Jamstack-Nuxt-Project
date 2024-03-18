import type { Track } from '~/models/track.model'

export interface Playlist {
    id: number
    title: string
    tracks: Track[]
    description: string
    imageUrl: string
    userId: number
}