import type { Track } from '~/models/track.model'
import type {Meta} from "~/models/strapi.model";


export interface Style {
    id: number
    name: string
    tracks: Track[]
}

export interface StyleResponse {
    data: Event
    meta: Meta
}

export interface StylesResponse {
    data: Event[]
    meta: Meta
}