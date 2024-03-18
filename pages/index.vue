<script setup lang="ts">
import type { TracksResponse } from '~/models/track.model';

const { find } = useStrapi();
const { data, pending, error } = await useAsyncData('tracks', async () => {
    return await find<TracksResponse>('tracks', {
        populate: '*',
    })
});
</script>



<template>
    <div>
        <h1>TEST</h1>
        <pre>{{ data }}</pre>
    </div>
</template>

<style scoped>
div {
    background-color: red;
}
</style>