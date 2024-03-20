<script setup lang="ts">
import type { StylesResponse } from "~/models/style.model";

const { find } = useStrapi()
const filters = ref<String[]>([])
const page = ref(1)
const pageSize = ref(3)
const searchQuery = ref('');

const { data: styles, pending: stylesPending, error: stylesError } = await useAsyncData('styles', async () => {
    return await find<StylesResponse>('styles', {
        populate: '*',
    }).then(res => res.data);
});

const { data: tracks, pending: tracksPending, error: tracksError, refresh: tracksRefresh } = useAsyncData('tracks', () => find<{
        data: Track[],
        meta: Meta
    }>('tracks', {
        populate: '*',
        pagination: { 
            page: page.value, 
            pageSize: pageSize.value 
        },
        filters: {
            styles: {
                name: {
                    $in: filters.value
                }
            }
        }
    }), {
        watch: [page, filters],
    }
)

const addFilter = (filter: string) => {
    if (!filters.value.includes(filter)) {
        filters.value.push(filter)
    } else {
        filters.value = filters.value.filter((f) => f !== filter)
    }

    tracksRefresh()
}

// const filteredTracks = computed(() => {
//     if (!filters.value.length) {
//         return tracks.value.data
//     }

//     return tracks?.value?.data.filter((track) => {
//         return track?.styles?.some((style) => filters.value.includes(style.name))
//     })
// })

const filteredTracks = computed(() => {
    let tracksFiltered = tracks.value.data;

    if (filters.value.length) {
        tracksFiltered = tracksFiltered.filter((track) => {
            return track?.styles?.some((style) => filters.value.includes(style.name));
        });
    }

    if (searchQuery.value) {
        const lowerSearchQuery = searchQuery.value.toLowerCase();
        tracksFiltered = tracksFiltered.filter((track) => {
            return (
                track.title.toLowerCase().includes(lowerSearchQuery) ||
                track.artist.toLowerCase().includes(lowerSearchQuery)
            );
        });
    }

    return tracksFiltered;
});

</script>

<template>
    <div>
        <input type="text" v-model="searchQuery" placeholder="Filter tracks by title or track...">

        <div v-if="stylesPending">Loading Styles...</div>
        <div v-else-if="stylesError">Error: {{ stylesError.message }}</div>
        <div v-else>
            <button v-for="style in styles" :key="style.slug"
                :class="filters.includes(style.name) ? 'bg-gray-900' : 'bg-white'" class="text-black"
                @click="addFilter(style.name)">
                {{ style.name }}
            </button>
        </div>

        <div v-if="tracksPending">Loading Tracks...</div>
        <div v-else-if="tracksError">Error: {{ tracksError.message }}</div>
        <div v-else>
            <div v-for="track in filteredTracks" :key="track.id">
                {{ track.title }}
                {{ track.artist }}
                <template v-if="track.styles">
                    {{ track.styles.map(style => style.name).join(', ') }}
                </template>                
                <img :src="track.cover.url" alt="Cover" style="width: 5vw;"/>
                <a :href="'/tracks/' + track.slug">Go to Track</a>
            </div>
        </div>

        <UPagination
            v-if="tracks?.meta"
            v-model="page"
            :page-count="tracks.meta.pagination.pageCount"
            :total="tracks?.meta.pagination.total"
        />
    </div>
</template>

<style lang="scss" scoped></style>