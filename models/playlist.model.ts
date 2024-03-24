import type { Track } from "~/models/track.model";
import type { Meta } from "~/models/strapi.model";

export interface Playlist {
    id: number
    title: string
    tracks: Track[]
}

export interface PlaylistResponse {
    data: Playlist
    meta: Meta
}

export interface PlaylistsResponse {
    data: Playlist[]
    meta: Meta
}