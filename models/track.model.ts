import type { Playlist } from '~/models/Playlist.model';
import type { Style } from '~/models/Style.model';
import type { Image, Meta } from '~/models/Strapi.model';

export interface Track {
    id: number
    title: string
    artist: string
    slug: string
    album: string
    albumImageUrl: Image
    duration: number
    mp3Url: string
    oggUrl: string
    playlist: Array<Playlist>
    style: Style[]
}

export interface TracksResponse {
    data: Track[]
    meta: Meta
}

export interface TrackResponse {
    data: Track
    meta: Meta
}