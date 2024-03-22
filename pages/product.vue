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
        MUSIC PAGE
        <div v-if="pending">Chargement des pistes...</div>
        <div v-else-if="error">Une erreur s'est produite : {{ error }}</div>
        <div v-else>
            <!-- <card
                v-for="track in data"
                :key="track.id"
                :title="track.title"
                :artist="track.artist"
                :coverUrl="track.cover.url"
                :slug="track.slug"
                :createDate="track.created_at"
            /> -->
        </div>
    </div>
</template>