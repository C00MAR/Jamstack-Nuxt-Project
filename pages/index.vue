<script setup lang="ts">
import type { TracksResponse } from '~/models/track.model';

const { find } = useStrapi();
const { data, pending, error } = await useAsyncData('tracks', async () => {
    return await find<TracksResponse>('tracks', {
        populate: '*',
    }).then(res => res.data);
});

</script>



<template>
    <div>
        <h1>TEST</h1>
        <template>
            <div v-if="pending">Loading...</div>
            <div v-else-if="error">Error: {{ error.message }}</div>
        </template>
        <template v-if="!pending" v-for="track in data" :key="track.id">
            {{ track.title }}
            {{ track.artist }}
            {{ track.slug }}
            <img :src="track.cover.url" alt="Cover" style="width: 5vw;"/>
            <a :href="'/tracks/' + track.slug" target="_blank">Go to Track</a>
        </template>
        <template v-else-if="error">
            <div>Error: {{ error.message }}</div>
        </template>
        <template v-else>
            <div>Loading...</div>
        </template>

        <!-- <a :href="data?.tracks[0].cover.url" target="_blank">
            <img :src="data?.tracks[0].cover.url" alt="Cover" /> -->
    </div>
</template>

<style scoped>
div {
    background-color: red;
}
</style>