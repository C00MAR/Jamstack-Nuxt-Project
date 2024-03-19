<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TracksResponse, Track } from '~/models/track.model';

const filter = ref('');
const page = ref(1)

const { find } = useStrapi();
const { data: unfilteredData, pending, error } = await useAsyncData('tracks', async () => {
    return await find<TracksResponse>('tracks', {
        populate: '*',
    }).then(res => res.data);
});

const filteredData = computed(() => {
    if (!unfilteredData.value) return [];
    return unfilteredData.value.filter((track: Track) =>
        track.title.toLowerCase().includes(filter.value.toLowerCase()) ||
        track.artist.toLowerCase().includes(filter.value.toLowerCase()) 
    );
});

// const filter = ref<string[]>([])

// const addFilter = (filter: string) => {
//     if(!filters.value.includes(filter)){
//         filters.value.push(filter)
//     } else {
//         filters.value = filters.value.filter((f) => f !== filter)
//     }
// }

// const filteredPlayers = computed(() => {
//     if(!filters.value){
//         return tracks?.value?.data
//     }

//     return tracks?.value?.data.filter((track) => {
//         return track?.playlists?.some((playlist) => filters.value.includes(playlist.name))
//     })
// })

// const { data: tracks, pending: tracksPending, error: tracksError } = useAsyncData('tracks', () => find<{
//         data: Track[],
//         meta: Meta
//     }>('tracks', {
//         populate: '*',
//         pagination: {
//             page: page.value,
//             pageSize: pageSize.value
//         },
//         filters: {
//             playlists: {
//                 $in: filters.value
//             }
//         }
//     }), {
//         watch: [page, filters],
//     }
// );
</script>

<template>
    <div>
        <h1>TEST</h1>
        <input type="text" v-model="filter" placeholder="Filter tracks by title or artist...">

        <div v-if="pending">Loading...</div>
        <div v-else-if="error">Error: {{ error.message }}</div>
        <div v-else v-for="track in filteredData" :key="track.id">
            {{ track.title }}
            {{ track.artist }}
            {{ track.styles.map(style => style.name).join(', ') }}
            <img :src="track.cover.url" alt="Cover" style="width: 5vw;"/>
            <a :href="'/tracks/' + track.slug">Go to Track</a>
        </div>
    </div>
    <UPagination 
        v-model="page" 
        :page-count="1" 
        :total="filteredData.length" />


<!-- <template>
    <div>
        <div>
            <card v-for="track in tracks?.data" :key="track.slug" :track="track" />
        </div>

        <UPagination v-if="tracks?.meta"
            v-model="page"
            :page-count="tracks?.meta.pagination.pageCount"
            :total="tracks?.meta.pagination.total"
        />
    </div>
</template> -->
</template>

<style scoped>
</style>
