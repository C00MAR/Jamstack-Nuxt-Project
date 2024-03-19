<script setup lang="ts">
defineProps({
    title: String,
    artist: String,
    coverUrl: String, 
    slug: String,
    createDate: String
});
</script>

<template>
    <div>
        <h3>{{ title }}</h3>
        <p>{{ artist }}</p>
        <img :src="coverUrl" alt="Cover" style="width: 5vw;"/>
        <a :href="`/tracks/${slug}`" target="">Go to Track</a>
        <p>{{ createDate }}</p>
    </div>
</template>
