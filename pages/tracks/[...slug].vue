<script lang="ts" setup>
const { findOne } = useStrapi4();
const route = useRoute();

const { data: track, pending } = useAsyncData('track', 
    () => findOne<{ data: Track}>(`tracks/${route.params.slug}`,)
);  
</script>

<template>
    {{ track.data.title }}
    {{ track.data.artist }}
    {{ track.data.slug }}
</template>