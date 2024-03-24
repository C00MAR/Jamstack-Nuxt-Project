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
        Playlist !
        <button>Create Playlist</button>
        <!-- <div v-if="pending">Chargement des pistes...</div>
        <div v-else-if="error">Une erreur s'est produite : {{ error }}</div>
        <div v-else>

        </div> -->
    </div>
</template>