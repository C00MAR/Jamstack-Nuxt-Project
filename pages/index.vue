<template>
    <div class="flex gap-4">
        <template v-if="stylesPending">
            <span>filters charge</span>
        </template>
        <template v-else>
            <div class="w-1/3 flex flex-col gap-4 py-4 mx-2">
                <h3>styles</h3>
                <button v-for="style in styles" :key="style.slug"
                    :class="filters.includes(style.name) ? 'bg-gray-900' : 'bg-white'" class="text-black"
                    @click="addFilter(style.name)">
                    {{ style.name }}
                </button>
            </div>
        </template>

        <template v-if="tracksPending">
            <span>track charge</span>
        </template>
        <template v-else>
            <div class="w-2/3 flex flex-col items-center justify-center">
                <div class="grid grid-cols-2 gap-4 w-full">
                    <p v-for="track in filteredTracks" :key="track.id">{{ track.title }}</p>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">

import type { StylesResponse } from "~/models/style.model";
import type { TracksResponse } from "~/models/track.model";

const { find } = useStrapi()
const client = useStrapiClient()

const filters = ref<String[]>([])

const { data: styles, pending: stylesPending } = await useAsyncData('styles', async () => {
    return await find<StylesResponse>('styles', {
        populate: '*',
    }).then(res => res.data);
});

const { data: tracks, pending: tracksPending } = await useAsyncData('tracks', async () => {
    return await find<TracksResponse>('tracks', {
        populate: '*',
    }).then(res => res.data)
})

const addFilter = (filter: string) => {
    if (!filters.value.includes(filter)) {
        filters.value.push(filter)
    } else {
        filters.value = filters.value.filter((f) => f !== filter)
    }
}

const filteredTracks = computed(() => {
    if (!filters.value.length) {
        return tracks?.value
    }

    return tracks?.value.filter((track) => {
        return track?.styles?.some((style) => filters.value.includes(style.name))
    })
})
</script>

<style lang="scss" scoped></style>